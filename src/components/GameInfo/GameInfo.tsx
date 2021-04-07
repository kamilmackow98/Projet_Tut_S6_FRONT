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
import { APIErrorMessage, FullTag, Game, TagCloud, TagFilter } from "types";
import Header from "./Header";
import { useStyles } from "./GameInfo.styles";
import GameNotFound from "./GameNotFound";
import Cookies from "js-cookie";
import UserContext from "context/user/UserContext";

interface Props {
    id: number   
}

const GameInfo: React.FC<Props> = ({ id }) => {

    const { user } = React.useContext(UserContext);
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
            .then(r =>  r.json().then(data => ({status: r.status, body: data})))
            .then((obj) => {
                if (obj.status === 200) {
                    setRelatedGames(obj.body as Game[]);
                } else {
                    throw new Error((obj.body as APIErrorMessage).message);
                }
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
            .then(r =>  r.json().then(data => ({status: r.status, body: data})))
            .then((obj) => {
                if (obj.status === 200) {
                    setIsInLibrary(true);
                } else {
                    throw new Error((obj.body as APIErrorMessage).message);
                }
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
            .then(r =>  r.json().then(data => ({status: r.status, body: data})))
            .then((obj) => {
                if (obj.status === 200) {
                    setIsInLibrary(false);
                } else {
                    throw new Error((obj.body as APIErrorMessage).message);
                }
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
        if (user.isAuthenticated) {
            const token: string | undefined = Cookies.get('token');
            fetch(`/api/user/library/${id}`, {
                method: 'GET',
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": token ? token : ""
                }
            })
                .then(r =>  r.json().then(data => ({status: r.status, body: data})))
                .then((obj) => {
                    if (obj.status === 200) {
                        setIsInLibrary(obj.body.isInLibrary);
                    } else {
                        throw new Error((obj.body as APIErrorMessage).message);
                    }
                }).catch((error) => {
                    setIsInLibrary(false);
                });
        }
    }, [id, user.isAuthenticated]);

    useEffect(() => {
        fetch(`/api/game/${id}`)
            .then(r =>  r.json().then(data => ({status: r.status, body: data})))
            .then((obj) => {
                if (obj.status === 200) {
                    setGameData(obj.body as Game);
                    extractAndSortTags(obj.body as Game);
                } else {
                    throw new Error((obj.body as APIErrorMessage).message);
                }
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
                        isAuthenticated={user.isAuthenticated}
                        onAddToLibrary={handleAddToLibrary}
                        onRemoveFromLibrary={handleRemoveFromLibrary}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={7} >
                            <CarouselWrapper screenshots={gameData.screenshots} movies={gameData.movies} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={5} className={classes.basicInfo}>
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
                            <Grid container className={classes.bottomContainer}>
                                <Grid item xs={12}>
                                    <RequirementsCard
                                        pcRequirements={gameData.pc_requirements}
                                        macRequirements={gameData.mac_requirements}
                                        linuxRequirements={gameData.linux_requirements}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={5}>
                            <Grid container className={classes.stickyContainer} spacing={2}>
                                <Grid item xs={12}>
                                    <ReviewRatingBlock
                                        positiveRatings={gameData.positive_ratings}
                                        negativeRatings={gameData.negative_ratings}
                                        categories={gameData.categories}
                                        genres={gameData.genres}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <RelatedGames games={relatedGames} />
                                </Grid>
                                <PegiRating requiredAge={gameData.required_age} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid> 
            </Grid>
        )
    }
}

export default GameInfo
