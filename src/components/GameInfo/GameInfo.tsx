import React, { useState, useEffect } from "react"
import { Divider, Grid } from '@material-ui/core';
import CarouselWrapper from "./Carousel/CarouselWrapper";
import BasicInfo from "./BasicInfo";
import PegiRating from "./ReviewRatingBlock/PegiRating";
import ReviewRatingBlock from "./ReviewRatingBlock/ReviewRatingBlock";
import RequirementsCard from "./Requirements/RequirementsCard";
import RelatedGames from "./RelatedGames";
import DOMPurify from 'dompurify';
import Loader from "../Layout/Loader/Loader";
import { Game } from "types";
import Header from "./Header";
import { useStyles } from "./GameInfo.styles";

interface Props {
    id: number   
}

const GameInfo: React.FC<Props> = ({ id }) => {

    const classes = useStyles();
    const [gameData, setGameData] = useState<Game>();
    const [tagsFiltered, setTagsFiltered] = useState<any[]>([]);

    useEffect(() => {
        fetch(`/api/game/${id}`)
            .then(response => response.json())
            .then((game: Game) => {
                setGameData(game);
                document.title = game.name + " | Video Games Encyclopedia";
                extractAndSortTags(game);
                
            }).catch((error) => {
                console.error(error);
            });
    }, [id]);

    const extractAndSortTags = (game: Game) => {
        const tags: any[] = Object.entries(game)
                                .filter(([key, val]) => key.includes('tag_') && val && val > 0)
                                .sort(([keyA, valA]: any[], [keyB, valB]: any[]) => valB - valA);

        const formattedTags = tags.map((tag: any[]) => ({ 
            value: capitalizeFirstLetter(tag[0].replace('tag_', '').replace('_', ' ')), 
            count: tag[1] 
        }));
        setTagsFiltered(formattedTags);
    }

    const capitalizeFirstLetter = (string: string): string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    if (!gameData) {
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
                        />
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
