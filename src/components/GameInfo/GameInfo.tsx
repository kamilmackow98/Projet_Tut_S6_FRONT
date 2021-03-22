import React, {useState, useEffect, Component} from "react"
import {Grid, Paper, List, Divider, Chip} from '@material-ui/core';
import Carousel from 'react-material-ui-carousel'


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
                /*gameData:
                    {
                        "id": "380",
                        "name": "Half-Life 2: Episode One",
                        "release_date": "2006-06-01",
                        "english": true,
                        "developer": [
                            "Valve"
                        ],
                        "publisher": [
                            "Valve"
                        ],
                        "platforms": [
                            "windows",
                            "mac",
                            "linux"
                        ],
                        "required_age": "0",
                        "categories": [
                            "Single-player",
                            "Steam Achievements",
                            "Captions available",
                            "Partial Controller Support",
                            "Steam Cloud",
                            "Stats",
                            "Includes Source SDK",
                            "Commentary available"
                        ],
                        "genres": [
                            "Action"
                        ],
                        "steamspy_tags": [
                            "FPS",
                            "Action",
                            "Sci-fi"
                        ],
                        "achievements": "13",
                        "positive_ratings": "7908",
                        "negative_ratings": "517",
                        "average_playtime": "281",
                        "median_playtime": "184",
                        "owners": "5000000-10000000",
                        "price": "5.79",
                        "detailed_description": "Half-Life 2 has sold over 4 million copies worldwide, and earned over 35 Game of the Year Awards. Episode One is the first in a series of games that reveal the aftermath of Half-Life 2 and launch a journey beyond City 17. Also features two multiplayer games. Half-Life 2 not required.",
                        "about_the_game": "Half-Life 2 has sold over 4 million copies worldwide, and earned over 35 Game of the Year Awards. Episode One is the first in a series of games that reveal the aftermath of Half-Life 2 and launch a journey beyond City 17. Also features two multiplayer games. Half-Life 2 not required.",
                        "short_description": "Half-Life 2 has sold over 4 million copies worldwide, and earned over 35 Game of the Year Awards. Episode One is the first in a series of games that reveal the aftermath of Half-Life 2 and launch a journey beyond City 17. Also features two multiplayer games. Half-Life 2 not required.",
                        "header_image": "https://steamcdn-a.akamaihd.net/steam/apps/380/header.jpg?t=1530046506",
                        "screenshots": [
                            {
                                "id": 0,
                                "path_thumbnail": "https://steamcdn-a.akamaihd.net/steam/apps/380/0000000308.600x338.jpg?t=1530046506",
                                "path_full": "https://steamcdn-a.akamaihd.net/steam/apps/380/0000000308.1920x1080.jpg?t=1530046506"
                            },
                            {
                                "id": 1,
                                "path_thumbnail": "https://steamcdn-a.akamaihd.net/steam/apps/380/0000000309.600x338.jpg?t=1530046506",
                                "path_full": "https://steamcdn-a.akamaihd.net/steam/apps/380/0000000309.1920x1080.jpg?t=1530046506"
                            },
                            {
                                "id": 2,
                                "path_thumbnail": "https://steamcdn-a.akamaihd.net/steam/apps/380/0000000310.600x338.jpg?t=1530046506",
                                "path_full": "https://steamcdn-a.akamaihd.net/steam/apps/380/0000000310.1920x1080.jpg?t=1530046506"
                            },
                            {
                                "id": 3,
                                "path_thumbnail": "https://steamcdn-a.akamaihd.net/steam/apps/380/0000000311.600x338.jpg?t=1530046506",
                                "path_full": "https://steamcdn-a.akamaihd.net/steam/apps/380/0000000311.1920x1080.jpg?t=1530046506"
                            },
                            {
                                "id": 4,
                                "path_thumbnail": "https://steamcdn-a.akamaihd.net/steam/apps/380/0000000407.600x338.jpg?t=1530046506",
                                "path_full": "https://steamcdn-a.akamaihd.net/steam/apps/380/0000000407.1920x1080.jpg?t=1530046506"
                            }
                        ],
                        "background": "https://steamcdn-a.akamaihd.net/steam/apps/380/page_bg_generated_v6b.jpg?t=1530046506",
                        "movies": "[{'id': 915, 'name': 'HL2:EP1 Launch Teaser 4', 'thumbnail': 'https://steamcdn-a.akamaihd.net/steam/apps/915/movie.jpg?t=1512411168', 'webm': {'480': 'http://steamcdn-a.akamaihd.net/steam/apps/915/movie480.webm?t=1512411168', 'max': 'http://steamcdn-a.akamaihd.net/steam/apps/915/movie_max.webm?t=1512411168'}, 'highlight': False}, {'id': 914, 'name': 'HL2:EP1 Launch Teaser 3', 'thumbnail': 'https://steamcdn-a.akamaihd.net/steam/apps/914/movie.jpg?t=1512411159', 'webm': {'480': 'http://steamcdn-a.akamaihd.net/steam/apps/914/movie480.webm?t=1512411159', 'max': 'http://steamcdn-a.akamaihd.net/steam/apps/914/movie_max.webm?t=1512411159'}, 'highlight': False}, {'id': 912, 'name': 'HL2:EP1 Launch Teaser 1', 'thumbnail': 'https://steamcdn-a.akamaihd.net/steam/apps/912/movie.jpg?t=1512411140', 'webm': {'480': 'http://steamcdn-a.akamaihd.net/steam/apps/912/movie480.webm?t=1512411140', 'max': 'http://steamcdn-a.akamaihd.net/steam/apps/912/movie_max.webm?t=1512411140'}, 'highlight': False}, {'id': 913, 'name': 'HL2:EP1 Launch Teaser 2', 'thumbnail': 'https://steamcdn-a.akamaihd.net/steam/apps/913/movie.jpg?t=1512411149', 'webm': {'480': 'http://steamcdn-a.akamaihd.net/steam/apps/913/movie480.webm?t=1512411149', 'max': 'http://steamcdn-a.akamaihd.net/steam/apps/913/movie_max.webm?t=1512411149'}, 'highlight': False}]",
                        "pc_requirements": {
                        "minimum": "\\r\\n\\t\\t\\t<p><strong>Minimum: </strong>1.7 GHz Processor, 512MB RAM, DirectX&reg; 8.1 level Graphics Card (Requires support for SSE), Windows&reg; 7 (32/64-bit)/Vista/XP, Mouse, Keyboard, Internet Connection</p>\\r\\n\\t\\t\\t<p><strong>Recommended: </strong>Pentium 4 processor (3.0GHz, or better), 1GB RAM, DirectX&reg; 9 level Graphics Card, Windows&reg; 7 (32/64-bit)/Vista/XP, Mouse, Keyboard, Internet Connection</p>\\r\\n\\t\\t\\t"
                        },
                        "mac_requirements": {
                        "minimum": "<strong>Minimum: </strong>OS X version Leopard 10.5.8, Snow Leopard 10.6.3, 1GB RAM, NVIDIA GeForce 8 or higher, ATI X1600 or higher, or Intel HD 3000 or higher Mouse, Keyboard, Internet Connection"
                        },
                        "linux_requirements": [
                            {}
                        ],
                        "minimum": "1.7 GHz Processor, 512MB RAM, DirectX&reg; 8.1 level Graphics Card (Requires support for SSE), Windows&reg; 7 (32/64-bit)/Vista/XP, Mouse, Keyboard, Internet Connection Recommended: Pentium 4 processor (3.0GHz, or better), 1GB RAM, DirectX&reg; 9 level Graphics Card, Windows&reg; 7 (32/64-bit)/Vista/XP, Mouse, Keyboard, Internet Connection",
                        "recommended": ""
                    }*/

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
        // reformatting of the date
        const options: any = { year: 'numeric', month: 'short', day: 'numeric'};
        let releaseDate = (new Date(gameData.release_date)).toLocaleDateString('fr-FR', options)

        // array of platform elements
        let platforms: JSX.Element[] = [];
        for (let i = 0; i < gameData.platforms.length; i++) {
            platforms.push(
                <Grid item>
                    <Chip color="primary" label={gameData.platforms[i]} />
                </Grid>
            )
        }

        // array of tag elements
        let tags: JSX.Element[] = [];
        for (let i = 0; i < gameData.steamspy_tags.length; i++) {
            tags.push(
                <Grid item>
                    <Chip label={gameData.steamspy_tags[i]} />
                </Grid>
            )
        }

        // array of carousel items (screenshots)
        const carouselItems: JSX.Element[] = []
        for(let i = 0; i < gameData.screenshots.length; i++) {
            carouselItems.push(
                <CarouselItem
                    key={i}
                    id={i + 1}
                    src={gameData.screenshots[i].path_thumbnail}
                />
            )
        }

        return (
            <div>
                {/* HEADING */}
                <Grid container>
                    <Grid item xs={12} md={3}>
                        <img src={gameData.header_image} style={{width: '95%'}} alt={"header_image"}/>
                    </Grid>
                    <Grid item container direction="column" xs={12} md={7} spacing={0}>
                        <Grid item>
                            <h1>{gameData.name}</h1>
                        </Grid>
                        <Grid item container spacing={1} style={{marginBottom: "15px"}} >
                            {platforms}
                        </Grid>
                    </Grid>
                </Grid>
                {/* END HEADING */}

                {/* SECTION 1 */}
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Carousel>
                            {carouselItems}
                        </Carousel>
                    </Grid>
                    <Grid item container direction="column" xs={12} md={5}>
                        <Grid item>
                            <p>{gameData.detailed_description}</p>
                            <Divider />
                            <p>Release date: {releaseDate}</p>
                            <Divider />
                            <p>Developer: {gameData.developer}</p>
                            <Divider />
                            <p>Publisher: {gameData.publisher}</p>
                        </Grid>
                        <Divider />
                        <Grid item container spacing={1} style={{marginTop: "12px"}}>
                            {tags}
                        </Grid>
                    </Grid>
                </Grid>
                {/* END SECTION 1 */}

            </div>
        )
    }

}

function CarouselItem(props: any)
{
    return (
        <div>
            <img src={props.src} alt={"Screenshot n°" + props.id} style={{width: '100%'}}/>
        </div>
    )
}

export default GameInfo
