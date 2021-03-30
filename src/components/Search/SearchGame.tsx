import { TextField } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useEffect, useState, useCallback } from "react";
import { Game } from "types";

const SearchGame = () => {

	const [gameNames, setGameNames] = useState<Game[]>([]);
	const [inputGameNameSearch, setInputGameNameSearch] = useState("");
	const [gameNamePagination, setGameNamePagination] = useState(0);

	useEffect(() => {
		fetch(`/api/games`)
		.then((res) => res.json())
		.then((games: Game[]) => {
			console.log(games);
			setGameNames(games);
		})
		.catch((e) => console.error(e));
	}, []);

	useEffect(() => {
		setGameNamePagination(0);
		setGameNames([]);
		fetch(`/api/games?name=${inputGameNameSearch}`)
		.then((res) => res.json())
		.then((games: Game[]) => {
			console.log(games);
			setGameNames(games);
		})
		.catch((e) => console.error(e));
	}, [inputGameNameSearch]);

	useEffect(() => {
		fetch(`/api/games?name=${inputGameNameSearch}&page=${gameNamePagination}`)
		.then((res) => res.json())
		.then((games: Game[]) => {
			const extendedGames: Game[] = gameNames.concat(games);
			setGameNames(extendedGames);
		})
		.catch((e) => console.error(e));
	}, [gameNamePagination])
	
	const handleChange = (value: string) => {
		setInputGameNameSearch(value)
	}

	return (
		<Autocomplete
			ListboxProps={{
				style: { maxHeight: 200, overflow: 'auto' },
				onScroll: (event: React.SyntheticEvent) => {
					const listboxNode = event.currentTarget;
					if (listboxNode.scrollTop + listboxNode.clientHeight === listboxNode.scrollHeight) {
						setGameNamePagination(gameNamePagination + 1);
					}
				}
			}}
			freeSolo
			id="combo-box-game-name"
			options={gameNames}
			getOptionLabel={(option: Game) => option.name}
			style={{ width: 300 }}
			renderInput={(params) => <TextField {...params} label="Game's name" variant="outlined" onChange={event => handleChange(event.target.value)}/>}
		/>
	);
};

export default SearchGame;
