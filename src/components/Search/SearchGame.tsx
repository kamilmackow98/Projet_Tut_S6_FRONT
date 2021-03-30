import { TextField } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useEffect, useState } from "react";
import { Game } from "types";

const SearchGame = () => {

	const [gameNames, setGameNames] = useState<Game[]>([]);

	useEffect(() => {
		fetch(`/api/games`)
		.then((res) => res.json())
		.then((games: Game[]) => {
			console.log(games);
			setGameNames(games);
		})
		.catch((e) => console.error(e));
	}, []);

	return (
		<Autocomplete
			id="combo-box-demo"
			options={gameNames}
			getOptionLabel={(option: Game) => option.name}
			style={{ width: 300 }}
			renderInput={(params) => <TextField {...params} label="Game's name" variant="outlined" />}
		/>
	);
};

export default SearchGame;
