import { TextField } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from "react";
import { APIErrorMessage, Game, GameSearchResult } from "types";
import { debounce } from "lodash";

interface Props {
	onChangeName: Function,
	mustClear: boolean
};

const AutocompleteGameName: React.FC<Props> = ({ onChangeName, mustClear }) => {

	const [gameNames, setGameNames] = useState<Game[]>([]);
	const [inputGameNameSearch, setInputGameNameSearch] = useState("");
	const [gameNamePagination, setGameNamePagination] = useState(1);
	const [firstLaunch, setFirstLaunch] = useState<boolean>(true);
	const [value, setValue] = useState<string | Game | null | undefined>(null);
	const [key, setKey] = useState<number>(1);

	const gameNamesRef = React.useRef(gameNames);
	const inputGameNameSearchRef = React.useRef(inputGameNameSearch);
	const firstLaunchRef = React.useRef(firstLaunch);
	const keyRef = React.useRef(key);

	useEffect(() => {
		if (mustClear) {
			setValue(null);
			setInputGameNameSearch("");
			onChangeName(null);
			setKey(keyRef.current === 1 ? 2 : 1);
		}
	}, [mustClear, onChangeName]);

	useEffect(() => {
		gameNamesRef.current = gameNames;
		inputGameNameSearchRef.current = inputGameNameSearch;
		firstLaunchRef.current = firstLaunch;
		keyRef.current = key;
	});

	useEffect(() => {
		fetch(`/api/games`)
		.then(r =>  r.json().then(data => ({status: r.status, body: data})))
		.then((obj) => {
			if (obj.status === 200) {
				setGameNames((obj.body as GameSearchResult).games);
			} else {
				throw new Error((obj.body as APIErrorMessage).message);
			}
		})
		.catch((e) => {});

		setFirstLaunch(false);
	}, []);

	useEffect(() => {
		if (!firstLaunchRef.current) {
			setGameNamePagination(1);
			setGameNames([]);
			fetch(`/api/games?name=${inputGameNameSearch}`)
			.then(r =>  r.json().then(data => ({status: r.status, body: data})))
			.then((obj) => {
				if (obj.status === 200) {
					(obj.body as GameSearchResult).games.forEach((game: Game) => { game.release_date = new Date(game.release_date)})
					setGameNames((obj.body as GameSearchResult).games);
				} else {
					throw new Error((obj.body as APIErrorMessage).message);
				}
			})
			.catch((e) => {});
		}
	}, [inputGameNameSearch]);

	useEffect(() => {
		if (!firstLaunchRef.current && gameNamePagination !== 1) {
			fetch(`/api/games?name=${inputGameNameSearchRef.current}&page=${gameNamePagination}`)
			.then(r =>  r.json().then(data => ({status: r.status, body: data})))
			.then((obj) => {
				if (obj.status === 200) {
					const extendedGames: Game[] = gameNamesRef.current.concat((obj.body as GameSearchResult).games);
					setGameNames(extendedGames);
				} else {
					throw new Error((obj.body as APIErrorMessage).message);
				}
			})
			.catch((e) => console.error(e));
		}
	}, [gameNamePagination]);
	
	const handleChange = debounce((value: string) => { 
		setInputGameNameSearch(value);
		onChangeName(value);
	}, 500);

	return (
		<Autocomplete
			key={key}
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
			value={value}
			id="combo-box-game-name"
			options={gameNames}
			onInputChange={(event) => { if (event.type !== "change") onChangeName(null) }}
			filterOptions={(options, state) => options}
			onChange={(event: React.ChangeEvent<{}>, newValue: string | Game | null) => { newValue !== null ? onChangeName((newValue as Game).name) : onChangeName(null) }}
			getOptionLabel={(option: Game) => option.name}
			renderInput={(params) => <TextField {...params} label="Game's name" variant="outlined" onChange={event => handleChange(event.target.value)}/>}
		/>
	);
};

export default AutocompleteGameName;
