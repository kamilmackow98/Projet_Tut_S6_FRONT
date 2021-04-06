import React, { useState } from "react";
import { Box, Grid, Paper, Typography } from "@material-ui/core";
import GameCard from "../Game/Card/GameCard";
import AliceCarousel from 'react-alice-carousel';
import Carousel from 'react-elastic-carousel'
import { Game } from "types";
import { useStyles } from "./GameInfo.styles";

import '../../../node_modules/react-alice-carousel/lib/alice-carousel.css';

interface Props {
    games: Game[]
};

const RelatedGames: React.FC<Props> = ({ games }) => {

    const classes = useStyles();
    const [Carousel, setCarousel] = useState<any>();

    const responsive: any = {
        0: { items: 2 },
        568: { items: 2 },
        1024: { items: 2 },
    };

    const gamesJSX: JSX.Element[] = games.map((game: Game) => (
        <Grid item className={classes.relatedGameCard}>
            <GameCard 
                key={game.id}
                id={game.id}
                name = {game.name}
                header_image = {game.header_image}
                disableAnimation = {true}
            /> 
        </Grid>
    ));
    
    return (
        <Paper variant="outlined" className={classes.card}>
            <Box p={1}>
                <Typography variant="h6" className={classes.cardTitle}>More like this</Typography>
                <AliceCarousel 
                    mouseTracking
                    responsive={responsive}
                    disableDotsControls={true}
                    items={gamesJSX}
                    ref={(el) => { setCarousel(el) }}
                />
            </Box>
        </Paper>
    )
}

export default RelatedGames;
