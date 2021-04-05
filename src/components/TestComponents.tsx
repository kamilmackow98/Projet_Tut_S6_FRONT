import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { GameSearchResult, Game } from "types";
import GameCard from "./Game/Card/GameCard";
import GameList from "./Game/List/GameList";
import Loader from "./Layout/Loader/Loader";
import Table from "./Layout/Table/Table";
import React from "react";

const TestComponents: React.FC = () => {
	const [games, setGames] = React.useState<Game[]>([]);

	React.useEffect(() => {
		fetch("/api/games", { method: "POST" })
			.then((res) => res.json())
			.then((resJson: GameSearchResult) => {
				const games: Game[] = resJson.games.slice(1);
				setGames(games);
			})
			.catch((e) => console.error(e));
	}, []);

	return (
		<Container fixed disableGutters>
			<Box pb={5}>
				<Typography paragraph variant="button">
					List view for game list
				</Typography>

				<GameList data={games} spacing={2} />
			</Box>

			<Box pb={5}>
				<Typography paragraph variant="button">
					Loader (add "fixed" property to center and remove from page flow)
				</Typography>

				<Grid container>
					<Grid item>
						<Loader />
					</Grid>
				</Grid>
			</Box>

			<Box pb={5}>
				<Typography paragraph variant="button">
					Game card (with name / without name / without animations)
				</Typography>

				<Grid container spacing={2} justify="center">
					{games.map((props) => (
						<Grid key={props.id} item xs={12} sm={10} md={6} lg={4}>
							<GameCard {...props} />
						</Grid>
					))}
				</Grid>
			</Box>

			<Box pb={5}>
				<Typography paragraph variant="button">
					Table view for game list
				</Typography>

				<Grid container>
					<Grid item xs={12}>
						<Table data={games} />
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
};

export default TestComponents;
