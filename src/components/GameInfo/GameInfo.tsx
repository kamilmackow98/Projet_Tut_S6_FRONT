import React, {Component} from "react"


class GameInfo extends Component<{ match: any }, { loading: boolean, gameData: any }> {
    constructor(props: any) {
        super(props)
        this.state = {
            loading: false,
            gameData: {},
        }
    }

    componentDidMount() {
        this.setState({loading: true})
        const id = this.props.match.params.id
        fetch(`/api/game/${id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    loading: false,
                    gameData: data,
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
            })
    }

    render() {
        const text = this.state.loading ? "loading..." : this.state.gameData.name
        return (
            <div>
                <p>{text}</p>
            </div>
        )
    }
}

export default GameInfo
