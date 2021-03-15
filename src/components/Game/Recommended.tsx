import React, { useState, useEffect } from "react";
import GameCard from "./GameCard";
import { CompleteGameInfo } from "../../types";
import { Container, Grid } from "@material-ui/core";

const Recommended = () => {
	// Here we're gonna get user's favorites games by id, and then search related 10 recommended games
	const [favorites, setFavorites] = useState<number[]>([501500, 205950, 44360, 500, 206410, 1510, 65600]);
	const [recommended, setRecommended] = useState<CompleteGameInfo[]>([]);

	useEffect(() => {
		if (favorites.length > 0) {
			favorites.forEach((favorite) => {
				fetch(`/api/game/${favorite}`)
					.then((res) => res.json())
					.then((data: CompleteGameInfo) => {
						if (data.id) {
							setRecommended((recommended) => [...recommended, data]);
						}
					})
					.catch((e) => console.error(e));
			});
		}
	}, [favorites]);

	useEffect(() => {
		if (recommended.length > 0) {
		}
	}, [recommended]);

	useEffect(() => {
		return () => {
			setRecommended([]);
		};
	}, []);

	return (
		<React.Fragment>
			<Container fixed disableGutters>
				<Grid container spacing={3} justify={"center"}>
					{recommended.map((card) => (
						<Grid item key={card.id} xs={12} sm={10} md={6} lg={4}>
							<GameCard {...card} />
						</Grid>
					))}
				</Grid>
			</Container>
		</React.Fragment>
	);
};

export default Recommended;
