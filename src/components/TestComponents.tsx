import { Box, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import { BodyTableData } from "types";
import GameCard from "./Game/GameCard";
import Loader from "./Layout/Loader/Loader";
import Table from "./Layout/Table/Table";

const TestComponents: React.FC = () => {
	const dummyData: BodyTableData[] = [
		{
			id: 10,
			name: "Counter-strike",
			releaseDate: "01-01-2011",
			score: 90,
		},
		{
			id: 20,
			name: "Counter-strike2",
			releaseDate: "01-01-2012",
			score: 89,
		},
		{
			id: 30,
			name: "Counter-strike3",
			releaseDate: "01-01-2013",
			score: 88,
		},
		{
			id: 40,
			name: "Counter-strike4",
			releaseDate: "01-01-2014",
			score: 87,
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
							name="Counter-Strike"
							header_image="https://steamcdn-a.akamaihd.net/steam/apps/10/header.jpg"
						/>
					</Grid>
					<Grid item xs={12} sm={10} md={6} lg={4}>
						<GameCard header_image="https://steamcdn-a.akamaihd.net/steam/apps/10/header.jpg" />
					</Grid>
					<Grid item xs={12} sm={10} md={6} lg={4}>
						<GameCard
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
