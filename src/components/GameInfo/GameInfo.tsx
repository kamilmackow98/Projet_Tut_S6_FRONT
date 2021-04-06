import React, { useState, useEffect } from "react"
import { Grid } from '@material-ui/core';
import CarouselWrapper from "./Carousel/CarouselWrapper";
import BasicInfo from "./BasicInfo";
import PegiRating from "./ReviewRatingBlock/PegiRating";
import ReviewRatingBlock from "./ReviewRatingBlock/ReviewRatingBlock";
import RequirementsCard from "./Requirements/RequirementsCard";
import RelatedGames from "./RelatedGames";
import DOMPurify from 'dompurify';
import Loader from "../Layout/Loader/Loader";
import { FullTag, Game, TagCloud, TagFilter } from "types";
import Header from "./Header";
import { useStyles } from "./GameInfo.styles";
import GameNotFound from "./GameNotFound";
import Cookies from "js-cookie";
import UserContext from "context/user/UserContext";

interface Props {
    id: number   
}

const GameInfo: React.FC<Props> = ({ id }) => {

    const { user, setUser } = React.useContext(UserContext);
    const classes = useStyles();
    const [gameData, setGameData] = useState<Game>();
    const [noGameFound, setNoGameFound] = useState<boolean>(false);
    const [relatedGames, setRelatedGames] = useState<Game[] | []>([]);
    const [tagsFiltered, setTagsFiltered] = useState<any[]>([]);
    const [isInLibrary, setIsInLibrary] = useState<boolean>(false);

    const getRelatedGames = (formattedTags : any[], id: number) => {
        const tags = formattedTags.map((tag: TagCloud) => tag.value);
        const tagFilter: TagFilter = { tags: tags };

        fetch(`/api/games/related/${id}`,
        {
            method: 'POST',
            body: JSON.stringify(tagFilter),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then((games: Game[]) => {
                setRelatedGames(games);
            }).catch((error) => {
                console.error(error);
            });
    };

    const handleAddToLibrary = () => {
        const token: string | undefined = Cookies.get('token');
        fetch(`/api/user/library/add`,
        {
            method: 'POST',
            body: JSON.stringify({ gameId: id }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": token ? token : ""
            }
        })
            .then(response => response.json())
            .then(() => {
                setIsInLibrary(true);
            }).catch((error) => {
                console.error(error);
            });
    };

    const handleRemoveFromLibrary = () => {
        const token: string | undefined = Cookies.get('token');
        fetch(`/api/user/library/remove`,
        {
            method: 'POST',
            body: JSON.stringify({ gameId: id }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": token ? token : ""
            }
        })
            .then(response => response.json())
            .then(() => {
                setIsInLibrary(false);
            }).catch((error) => {
                console.error(error);
            });
    }

    const extractAndSortTags = React.useCallback(async (game: Game) => {
        const tags: any[] = Object.entries(game)
                                .filter(([key, val]) => key.includes('tag_') && val && val > 0)
                                .sort(([keyA, valA]: any[], [keyB, valB]: any[]) => valB - valA)
                                .slice(0, 6);

        const formattedTags: TagCloud[] = [];

        for (const tag of tags) {
            const response = await fetch(`/api/tags?value=${tag[0]}`);
            const tagFetched: FullTag = await response.json();
            const tagCloudItem = { value: tagFetched.name, count: tag[1] };
            formattedTags.push(tagCloudItem);
        }

        setTagsFiltered(formattedTags);
        getRelatedGames(formattedTags.slice(0,3), game.id);
    }, []);

    useEffect(() => {
        if (user.authenticated) {
            const token: string | undefined = Cookies.get('token');
            fetch(`/api/user/library/${id}`, {
                method: 'GET',
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": token ? token : ""
                }
            })
                .then(response => response.json())
                .then((response) => {
                    setIsInLibrary(response.isInLibrary);
                }).catch((error) => {
                    setIsInLibrary(false);
                });
        }
    }, [id, user.authenticated]);

    useEffect(() => {
        fetch(`/api/game/${id}`)
            .then(response => response.json())
            .then((game: Game) => {
                setGameData(game);
                document.title = game.name + " | Video Games Encyclopedia";
                extractAndSortTags(game);
            }).catch((error) => {
                console.error(error);
                setNoGameFound(true);
            });
    }, [extractAndSortTags, id]);

    if (noGameFound) {
        return (
            <GameNotFound />
        )
    } else if (!gameData) {
        return (
            <Loader fixed={true}/>
        )
    } else {
        return (
            <Grid container>
                <Grid item xs={12} sm={12}>
                    <Header
                        name={gameData.name}
                        headerImage={gameData.header_image}
                        platforms={gameData.platforms}
                        releaseDate={gameData.release_date}
                        isInLibrary={isInLibrary}
                        isAuthenticated={user.authenticated}
                        onAddToLibrary={handleAddToLibrary}
                        onRemoveFromLibrary={handleRemoveFromLibrary}
                    />
                </Grid>
                
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={7}>
                        <CarouselWrapper screenshots={gameData.screenshots} movies={gameData.movies} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                        <BasicInfo
                            description={gameData.short_description}
                            developer={gameData.developer}
                            publisher={gameData.publisher}
                            tags={tagsFiltered}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={7}>
                        <div 
                            className={classes.detailedDescription}
                            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(gameData.detailed_description) }}
                        ></div>
                    </Grid>
                </Grid> 

                <Grid container className={classes.bottomContainer} direction="row-reverse" spacing={3}>
                    <Grid item xs={12} sm={12} md={5}>
                        <ReviewRatingBlock
                            positiveRatings={gameData.positive_ratings}
                            negativeRatings={gameData.negative_ratings}
                            categories={gameData.categories}
                            genres={gameData.genres}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={7}>
                        <RequirementsCard
                            pcRequirements={gameData.pc_requirements}
                            macRequirements={gameData.mac_requirements}
                            linuxRequirements={gameData.linux_requirements}
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.bottomContainer} spacing={3}>
                    <Grid item md={7} />
                    <Grid item xs={12} sm={12} md={5}>
                        <RelatedGames games={relatedGames} />
                    </Grid>
                </Grid>
                <Grid container className={classes.bottomContainer} spacing={3}>
                    <Grid item md={7} />
                    <Grid item xs={12} sm={12} md={5}>
                        <PegiRating requiredAge={gameData.required_age} />
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default GameInfo
