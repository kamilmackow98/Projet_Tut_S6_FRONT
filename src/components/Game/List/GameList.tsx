import Grid, { GridProps } from "@material-ui/core/Grid";
import GameListItem from "./GameListItem";
import { Game } from "types";
import React from "react";

interface Props extends GridProps {
	data: Game[];
}

const GameList: React.FC<Props> = (props) => {
	const { data } = props;

	const games = data.map((game) => (
		<Grid item key={game.id} xs={12}>
			<GameListItem {...game} />
		</Grid>
	));

	return (
		<Grid {...props} container>
			{games}
		</Grid>
	);
};

export default GameList;
