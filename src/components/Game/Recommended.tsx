import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { sortByOccurrences } from "utils/ObjectUtils";
import { countOccurrences } from "utils/ArrayUtils";
import { CompleteGameInfo } from "types";
import Loader from "components/Layout/Loader";
import GameCard from "./GameCard";
import React, { useState, useEffect } from "react";

const TOP_TAGS_LENGTH = 5;
let tags: string[] = [];

function clearArrays() {
	tags = [];
}

const Recommended: React.FC = () => {
	// Here we're gettting user's favorites games for now (mock the data)
	const [favorites] = useState<number[]>([
		501500,
		822110,
		205950,
		44360,
		801490,
		809700,
		500,
		206410,
		1510,
		691680,
		65600,
		970510,
		979100,
		701760,
		620590,
		1052850,
		777850,
		1000790,
		973060,
		1001910,
		1026560,
		751400,
		340840,
		807000,
	]);
	const [favoritesData, setFavoritesData] = useState<CompleteGameInfo[]>([]);
	const [recommendedGames, setRecommendedGames] = useState<CompleteGameInfo[]>(
		[]
	);
	const [loading, setLoading] = useState(true);
	const [topTags, setTags] = useState<string[]>([]);

	useEffect(() => {
		if (favorites.length > 0) {
			Promise.all(
				favorites.map((favorite) =>
					fetch(`/api/game/${favorite}`)
						.then((res) => res.json())
						.catch((e) => console.error(e))
				)
			)
				.then((data) => {
					// Get rid of null / undefined items
					data = data.filter((item) => item);
					setFavoritesData(data);
				})
				.catch((e) => console.error(e));
		}
	}, [favorites]);

	useEffect(() => {
		if (favoritesData.length > 0) {
			favoritesData.forEach((entry) => {
				tags = tags.concat(entry.steamspy_tags.map((tag) => tag));
			});

			const sortedTags = sortByOccurrences(countOccurrences(tags)).slice(
				0,
				TOP_TAGS_LENGTH
			);

			setTags(sortedTags);

			fetch("/api/games", {
				method: "POST",
				body: JSON.stringify({ steamspy_tags: sortedTags }),
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			})
				.then((res) => res.json())
				.then((data) => {
					setRecommendedGames(data);
					setTimeout(() => {
						setLoading(false);
					}, 250);
				})
				.catch((e) => console.error(e));
		}

		return () => {
			clearArrays();
		};
	}, [favoritesData]);

	useEffect(() => {
		return () => {
			clearArrays();
		};
	}, []);

	const gamesMap = recommendedGames.map((card) => (
		<Grid item key={card.id} xs={12} sm={10} md={6} lg={4}>
			<GameCard {...card} />
		</Grid>
	));

	const tagsMap = React.Children.toArray(
		topTags.map((tag) => (
			<Grid item>
				<Chip color="primary" label={tag} />
			</Grid>
		))
	);

	if (loading) return <Loader />;

	return (
		<Container fixed disableGutters>
			<Grid container justify={"center"}>
				<Grid item xs={12} sm={10} md={12}>
					<Typography paragraph variant="h6">
						RECOMMENDED FOR YOU
					</Typography>
					<Box mb={2}>
						<Grid
							justify="flex-start"
							alignItems="center"
							spacing={1}
							container
						>
							<Grid item>
								<Typography variant="body2">
									Because you like games with tags
								</Typography>
							</Grid>
							<Grid item>
								<Grid container spacing={1}>
									{tagsMap}
								</Grid>
							</Grid>
						</Grid>
					</Box>
				</Grid>
			</Grid>
			<Grid container spacing={3} justify={"center"}>
				{gamesMap}
			</Grid>
		</Container>
	);
};

export default Recommended;
