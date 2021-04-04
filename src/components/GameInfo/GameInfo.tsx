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
import { FullTag, Game } from "types";
import Header from "./Header";
import { useStyles } from "./GameInfo.styles";
import GameNotFound from "./GameNotFound";

interface Props {
    id: number   
}

const GameInfo: React.FC<Props> = ({ id }) => {

    const classes = useStyles();
    const [gameData, setGameData] = useState<Game>();
    const [noGameFound, setNoGameFound] = useState<boolean>(false);
    const [tagsFiltered, setTagsFiltered] = useState<any[]>([]);

    const extractAndSortTags = React.useCallback(async (game: Game) => {
        const tags: any[] = Object.entries(game)
                                .filter(([key, val]) => key.includes('tag_') && val && val > 0)
                                .sort(([keyA, valA]: any[], [keyB, valB]: any[]) => valB - valA)
                                .slice(0, 6);

        const formattedTags: any[] = [];

        for (const tag of tags) {
            const response = await fetch(`/api/tags?value=${tag[0]}`);
            const tagFetched: FullTag = await response.json();
            const tagCloudItem = { value: tagFetched.name, count: tag[1] };
            formattedTags.push(tagCloudItem);
        }
        setTagsFiltered(formattedTags);
    }, []);

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
                    <Grid item xs={12} sm={7}>
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
                        {/* <RelatedGames games={dummyData} /> */}
                        
                    </Grid>
                    <Grid item>
                        <PegiRating requiredAge={gameData.required_age} />
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default GameInfo
