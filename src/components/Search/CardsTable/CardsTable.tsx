import { Grid } from "@material-ui/core";
import GameCard from "components/Game/Card/GameCard";
import React from "react";
import { Game } from "types";

interface Props {
	games: Game[]
}

const CardsTable: React.FC<Props> = ({
    games
}) => {
	
	return (
        <Grid container spacing={3} justify="center">
                {
                    games.map((game: Game) => (
                        <Grid key={game.id} item xs={12} sm={6} md={4}>
                            <GameCard 
                                id={game.id}
                                header_image={game.header_image} 
                                name={game.name} 
                            />
                        </Grid>
                    ))
                }
        </Grid>
	);
};

export default CardsTable;
