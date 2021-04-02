import React from "react";
import {Box, Divider, Paper, Typography} from "@material-ui/core";
import GameCard from "../Game/GameCard";
import Carousel from 'react-elastic-carousel'

function RelatedGames(props: any) {

    // TODO: améliorer le rendu visuel des cards dans le carousel (taille identique etc...)
    // TODO: styles

    let gameCards: JSX.Element[] = [];
    for (let i = 0; i < props.games.length; i++) {
        gameCards.push(
            <GameCard key={i}
                // id = {props.games[i].id}
                name = {props.games[i].name}
                header_image = {props.games[i].header_image}
                disableAnimation = {true}
            />
        )
    }

    let breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 350, itemsToShow: 2},
        { width: 550, itemsToShow: 3 }
    ]

    return (
        <Paper variant="outlined">
            <Box p={1}>
                <Typography variant="h6">More like this</Typography>
                <Divider style={{marginTop: "10px", marginBottom:"10px"}} />
                <Carousel
                    isRTL={false}
                    breakPoints={breakPoints}
                    itemPadding={[10, 10, 10]}
                >
                    {gameCards}
                </Carousel>
            </Box>
        </Paper>
    )
}

export default RelatedGames
