import { Box, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import { CompleteGameInfo } from "types";
import GameCard from "./Game/GameCard";
import GameListItem from "./GameList/GameListItem";
import Loader from "./Layout/Loader/Loader";
import Table from "./Layout/Table/Table";

const TestComponents: React.FC = () => {
	const [games, setGames] = React.useState<CompleteGameInfo[]>([]);

	React.useEffect(() => {
		fetch("/api/games", { method: "POST" })
			.then((res) => res.json())
			.then((data) => {
				data = data.slice(1);
				setGames(data);
			})
			.catch((e) => console.error(e));
	}, []);

	return (
		<Container fixed disableGutters>
			<Box pb={5}>
				<Typography paragraph variant="button">
					List view for game list
				</Typography>

				<Grid container spacing={2}>
					{games.map((item) => (
						<Grid key={item.id} item xs={12}>
							<GameListItem {...item} />
						</Grid>
					))}
				</Grid>
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
