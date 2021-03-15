import React, { useState, useEffect } from "react";
import GameCard from "./GameCard";
import { CompleteGameInfo } from "../../types";
import { Container, Grid } from "@material-ui/core";

let categories: string[] = [];
let genres: string[] = [];
let tags: string[] = [];

function cleanArrays() {
	categories = [];
	genres = [];
	tags = [];
}

function countOccurrences(array: string[]) {
	return array.reduce(function (acc: any, curr) {
		acc[curr] ? acc[curr]++ : (acc[curr] = 1);

		return acc;
	}, {});
}

function sortByOccurrences(obj: any) {
	const keysSorted = Object.keys(obj)
		.sort(function (a, b) {
			return obj[a] - obj[b];
		})
		.reverse();

	return keysSorted;
}

const Recommended = () => {
	// Here we're gonna get user's favorites games by id, and then search related 10 recommended games
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
	const [recommended, setRecommended] = useState<CompleteGameInfo[]>([]);

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
					setRecommended(data);
				})
				.catch((e) => console.error(e));
		}
	}, [favorites]);

	useEffect(() => {
		if (recommended.length > 0) {
			recommended.forEach((entry) => {
				// Check if there's no undefined values
				if (entry.id) {
					categories = categories.concat(entry.categories.map((cat) => cat));
					genres = genres.concat(entry.genres.map((genre) => genre));
					tags = tags.concat(entry.steamspy_tags.map((tag) => tag));
				}
			});

			// Genres
			console.log("Genres", sortByOccurrences(countOccurrences(genres)));
			
			// Categories
			console.log("Categories", sortByOccurrences(countOccurrences(categories)));
			
			// Tags
			console.log("Tags", sortByOccurrences(countOccurrences(tags)));
		}

		return () => {
			cleanArrays();
		};
	}, [recommended]);

	useEffect(() => {
		return () => {
			cleanArrays();
		};
	}, []);

	if (!(recommended.length > 0)) return <div>Loading...</div>; // TODO : loading component

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
