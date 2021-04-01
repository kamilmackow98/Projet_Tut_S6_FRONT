import React, {useState, useEffect} from "react"
import {Divider, Grid} from '@material-ui/core';
import Heading from "./Heading";
import Carousel from "./Carousel";
import BasicInfo from "./BasicInfo";
import PegiRating from "./PegiRating";
import ReviewRatingBlock from "./ReviewRatingBlock";
import Requirements from "./Requirements";

function GameInfo(props: any) {

    // "isLoading" state to know if the data is ready or not
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [gameData, setGameData] = useState<any>({})

    // fetches the gameData with the API when the component mounts
    useEffect(() => {
        setIsLoading(true)
        // retrieves the game id from the URL
        const id = props.match.params.id
        fetch(`/api/game/${id}`)
            .then(response => response.json())
            .then(data => {
                // stores the gameData into the state
                setGameData(data)
                setIsLoading(false)
                })
    }, [props.match.params.id])

    // if the gameData is not available: show "loading..." else show the data
    if (isLoading) {
        return (
            <div>
                <p>loading...</p>
            </div>
        )
    }
    else {

        return (
            <div>
                {/* HEADING */}
                <Heading
                    name = {gameData.name}
                    headerImage = {gameData.header_image}
                    platforms = {gameData.platforms}
                />

                {/* SECTION 1 */}
                <Grid container spacing={3}>
                    <Carousel
                        screenshots = {gameData.screenshots}
                    />
                    <BasicInfo
                        description = {gameData.short_description}
                        releaseDate = {gameData.release_date}
                        developer = {gameData.developer}
                        publisher = {gameData.publisher}
                        tags = {gameData.steamspy_tags}
                    />
                </Grid>
                <br/>
                <Divider style={{width:"92%"}} />
                <br/>

                {/* SECTION 2 */}
                <Grid container spacing={3} direction="row-reverse">
                    {/* sidebar (right) */}
                    <Grid item md={1}> {/* Offset for alignement */} </Grid>
                    <Grid item container direction="column" md={4} spacing={2}>
                        <ReviewRatingBlock
                            positiveRatings = {gameData.positive_ratings}
                            negativeRatings = {gameData.negative_ratings}
                            categories = {gameData.categories}
                            genres = {gameData.genres}
                        />
                        <PegiRating requiredAge = {gameData.required_age} />
                    </Grid>

                    {/* main content (left) */}
                    <Grid item md={7}>
                        <div dangerouslySetInnerHTML={{__html:gameData.detailed_description}}/>
                        <Requirements
                            pcRequirements = {gameData.pc_requirements}
                            macRequirements = {gameData.mac_requirements}
                            linuxRequirements = {gameData.linux_requirements}
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default GameInfo
