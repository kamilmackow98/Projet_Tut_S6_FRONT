import { Grid } from "@material-ui/core";
import GameCard from "components/Game/GameCard";
import React from "react";
import { Game } from "types";


interface Props {
	games: Game[]
}

const CardsTable: React.FC<Props> = ({
    games
}) => {
	
	return (
        <Grid container spacing={3}>
                {
                    games.map((game: Game) => (
                        <Grid item xs={12} sm={3}>
                            <GameCard 
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
