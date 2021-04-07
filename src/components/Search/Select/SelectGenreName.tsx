import { Select, Chip, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { APIErrorMessage, Genre } from "types";
import { useStyles } from "../Search.styles";

interface Props {
	onChangeGenres: Function,
	mustClear: boolean
};

const SelectGenreName: React.FC<Props> = ({ onChangeGenres, mustClear }) => {

	const [genreNames, setGenreNames] = useState<Genre[]>([]);
	const [genreNamePagination, setGenreNamePagination] = useState(1);
	const [genreNamesChosen, setGenreNamesChosen] = useState<Genre[]>([]);

	const genreNamesRef = React.useRef(genreNames);
	const classes = useStyles();

	useEffect(() => {
		genreNamesRef.current = genreNames;
	});

	useEffect(() => {
		if (mustClear) {
			setGenreNamesChosen([]);
			onChangeGenres(undefined);
		}
	}, [mustClear, onChangeGenres]);

	useEffect(() => {
		fetch(`/api/genres?page=${genreNamePagination}`)
		.then(r =>  r.json().then(data => ({status: r.status, body: data})))
		.then((obj) => {
			if (obj.status === 200) {
				const extendedGenres: Genre[] = genreNamesRef.current.concat(obj.body as Genre[]);
				setGenreNames(extendedGenres);
			} else {
				throw new Error((obj.body as APIErrorMessage).message);
			}
		})
		.catch((e) => {});
	}, [genreNamePagination]);
	
	return (
		<FormControl size="small"  variant="outlined" className={classes.selectForm}>
        	<InputLabel id="demo-simple-select-outlined-label">Genres</InputLabel>
			<Select
				MenuProps={{	
						PaperProps: {
							onScroll: (event: any) => {
								if ((event.target.scrollTop + event.target.clientHeight) === event.target.scrollHeight) {
									setGenreNamePagination(genreNamePagination + 1);
								}
							}
						},
						style: { maxHeight: 300 },
						id: "id-menu",
						anchorOrigin: {
							vertical: "bottom",
							horizontal: "left"
						},
						getContentAnchorEl: null
				}}
				label="Genres"
				value={genreNamesChosen}
				multiple
				onChange={(event) => { 
					onChangeGenres(event.target.value);
					setGenreNamesChosen((event.target.value as Genre[]));
				}}
				renderValue={(selected) => (
					<div className={classes.chips}>
						{React.Children.toArray(
							(selected as any).map((value: any) => (
								<Chip label={value} className={classes.chip} />
							))
						)}
					</div>
				)}
			>
				{genreNames.map((genre: Genre) => (
					<MenuItem value={genre.name} key={genre.name}>
						{genre.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default SelectGenreName;