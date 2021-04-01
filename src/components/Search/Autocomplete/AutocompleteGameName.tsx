import { TextField } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from "react";
import { Game, GameSearchResult } from "types";
import { debounce } from "lodash";

interface Props {
	onChangeName: Function
}

const AutocompleteGameName: React.FC<Props> = ({ onChangeName }) => {

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
		.then((resJson: GameSearchResult) => {
            resJson.games.forEach((game: Game) => { game.release_date = new Date(game.release_date)})
            setGameNames(resJson.games);
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
	}, [gameNamePagination]);
	
	const handleChange = debounce(function(value: string) { 
		setInputGameNameSearch(value);
		onChangeName(value);
	}, 500);

	return (
		<Autocomplete
			size="small" 
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
			filterOptions={(options, state) => options}
			onChange={(event: React.ChangeEvent<{}>, newValue: string | Game | null) => { if (newValue) onChangeName((newValue as Game).name) }}
			getOptionLabel={(option: Game) => option.name}
			renderInput={(params) => <TextField {...params} label="Game's name" variant="outlined" onChange={event => handleChange(event.target.value)}/>}
		/>
	);
};

export default AutocompleteGameName;
