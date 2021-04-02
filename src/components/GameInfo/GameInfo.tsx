import React, {useState, useEffect} from "react"
import {Divider, Grid} from '@material-ui/core';
import Heading from "./Heading";
import Carousel from "./Carousel";
import BasicInfo from "./BasicInfo";
import PegiRating from "./PegiRating";
import ReviewRatingBlock from "./ReviewRatingBlock";
import Requirements from "./Requirements";
import RelatedGames from "./RelatedGames";
import Loader from "../Layout/Loader/Loader";

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
                document.title = data.name + " | Video Games Encyclopedia"
            })
    }, [props.match.params.id])

    // if the gameData is not available: show "LOADING" + animation else show the data
    if (isLoading) {
        return (
            <Loader fixed={true}/>
        )
    }
    else {

        const dummyData: any = [
            {
                "id": "10",
                "name": "Counter-strike",
                "header_image":"https://steamcdn-a.akamaihd.net/steam/apps/10/header.jpg?t=1528733245"
            },
            {
                "id": "380",
                "name": "Half-Life 2: Episode One",
                "header_image":"https://steamcdn-a.akamaihd.net/steam/apps/380/header.jpg?t=1530046506"
            },
            {
                "id": "8870",
                "name": "BioShock Infinite",
                "header_image":"https://steamcdn-a.akamaihd.net/steam/apps/8870/header.jpg?t=1545232935"
            },
            {
                "id": "10",
                "name": "Counter-strike",
                "header_image":"https://steamcdn-a.akamaihd.net/steam/apps/10/header.jpg?t=1528733245"
            },
            {
                "id": "380",
                "name": "Half-Life 2: Episode One",
                "header_image":"https://steamcdn-a.akamaihd.net/steam/apps/380/header.jpg?t=1530046506"
            },
            {
                "id": "8870",
                "name": "BioShock Infinite",
                "header_image":"https://steamcdn-a.akamaihd.net/steam/apps/8870/header.jpg?t=1545232935"
            },
            {
                "id": "10",
                "name": "Counter-strike",
                "header_image":"https://steamcdn-a.akamaihd.net/steam/apps/10/header.jpg?t=1528733245"
            },
            {
                "id": "380",
                "name": "Half-Life 2: Episode One",
                "header_image":"https://steamcdn-a.akamaihd.net/steam/apps/380/header.jpg?t=1530046506"
            },
            {
                "id": "8870",
                "name": "BioShock Infinite",
                "header_image":"https://steamcdn-a.akamaihd.net/steam/apps/8870/header.jpg?t=1545232935"
            },
            {
                "id": "10",
                "name": "Counter-strike",
                "header_image":"https://steamcdn-a.akamaihd.net/steam/apps/10/header.jpg?t=1528733245"
            }
        ]


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
                {/* TODO: remplacer les <br/> par du css */}
                <br/>
                <Divider style={{width:"92%"}} />
                <br/>

                {/* SECTION 2 */}
                <Grid container spacing={3} direction="row-reverse">
                    <Grid item md={1}> {/* Offset for alignement */} </Grid>
                    {/* sidebar (right) */}
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
                    <Grid item md={7} xs={12}>
                        <div dangerouslySetInnerHTML={{__html:gameData.detailed_description}}/>
                        <Requirements
                            pcRequirements = {gameData.pc_requirements}
                            macRequirements = {gameData.mac_requirements}
                            linuxRequirements = {gameData.linux_requirements}
                        />
                        {/* TODO: remplacer les <br/> par du css */}
                        <br/>
                        <RelatedGames games={dummyData} />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default GameInfo
