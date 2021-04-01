import { Box, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import GameCard from "./Game/GameCard";
import Loader from "./Layout/Loader/Loader";
import Table from "./Layout/Table/Table";

const TestComponents: React.FC = () => {
	// TODO : In production change "any" type to the correct response data (CompleteGameInfo by default)
	const dummyData: any[] = [
		{
			id: 10,
			name: "Counter-strike",
			release_date: new Date(),
			positive_ratings: 255,
			negative_ratings: 40,
		},
		{
			id: 20,
			name: "Counter-strike2",
			release_date: new Date(),
			positive_ratings: 225,
			negative_ratings: 40,
		},
		{
			id: 30,
			name: "Counter-strike3",
			release_date: new Date(),
			positive_ratings: 155,
			negative_ratings: 70,
		},
		{
			id: 40,
			name: "Counter-strike4",
			release_date: new Date(),
			positive_ratings: 355,
			negative_ratings: 10,
		},
	];

	return (
		<Container fixed disableGutters>
			<Box pb={5}>
				<Typography paragraph variant="button">
					Game card (with name / without name / without animations)
				</Typography>

				<Grid container spacing={1}>
					<Grid item xs={12} sm={10} md={6} lg={4}>
						<GameCard
							id={10}
							name="Counter-Strike"
							header_image="https://steamcdn-a.akamaihd.net/steam/apps/10/header.jpg"
						/>
					</Grid>
					<Grid item xs={12} sm={10} md={6} lg={4}>
						<GameCard
							id={20}
							header_image="https://steamcdn-a.akamaihd.net/steam/apps/10/header.jpg"
						/>
					</Grid>
					<Grid item xs={12} sm={10} md={6} lg={4}>
						<GameCard
							id={30}
							disableAnimation
							header_image="https://steamcdn-a.akamaihd.net/steam/apps/10/header.jpg"
						/>
					</Grid>
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
					Table view for game list
				</Typography>

				<Grid container>
					<Grid item xs={12}>
						<Table data={dummyData} />
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
};

export default TestComponents;
