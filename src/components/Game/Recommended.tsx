import React, { useState, useEffect } from "react";
import { sortByOccurrences } from "utils/ObjectUtils";
import { Container, Grid } from "@material-ui/core";
import { countOccurrences, getRandomFromArray } from "utils/ArrayUtils";
import { CompleteGameInfo } from "types";
import Loader from "components/Layout/Loader";
import GameCard from "./GameCard";

const TOP_TAGS_LENGTH = 5;
let tags: string[] = [];

function cleanArrays() {
	tags = [];
}

const Recommended = () => {
	// Here we're gonna get user's favorites games by id, and then search 10 related / recommended games
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
	const [loading, setLoading] = useState(true);

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
					data = data.filter((item) => item); // Get rid of null / undefined items
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

			// TODO : Here look for 10+ games based on random tags and set recommended
			const topTags = sortByOccurrences(countOccurrences(tags)).slice(0, TOP_TAGS_LENGTH);
			const randomTag = getRandomFromArray(topTags);
			console.log(randomTag);

			setTimeout(() => {
				setLoading(false);
			}, 1000);
		}

		return () => {
			cleanArrays();
		};
	}, [favoritesData]);

	useEffect(() => {
		return () => {
			cleanArrays();
		};
	}, []);

	if (loading) return <Loader />;

	return (
		<Container fixed disableGutters>
			<Grid container spacing={3} justify={"center"}>
				{favoritesData.map((card) => (
					<Grid item key={card.id} xs={12} sm={10} md={6} lg={4}>
						<GameCard {...card} />
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default Recommended;
