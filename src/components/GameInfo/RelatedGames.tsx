import React from "react";
import { Box, Divider, Paper, Typography } from "@material-ui/core";
import GameCard from "../Game/GameCard";
import Carousel from 'react-elastic-carousel'
import { Game } from "types";

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 350, itemsToShow: 2 },
    { width: 550, itemsToShow: 3 }
];

interface Props {
    games: Game[]
};

const RelatedGames: React.FC<Props> = ({ games }) => {

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
                    {games.map((game: Game) => (
                        <GameCard 
                            key={game.id}
                            name = {game.name}
                            header_image = {game.header_image}
                            disableAnimation = {true}
                        />
                    ))}
                </Carousel>
            </Box>
        </Paper>
    )
}

export default RelatedGames;
