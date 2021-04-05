import { Select, Chip, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Genre } from "types";
import { useStyles } from "../Search.styles";

interface Props {
	onChangeGenres: Function
}


const SelectGenreName: React.FC<Props> = ({ onChangeGenres }) => {

	const [genreNames, setGenreNames] = useState<Genre[]>([]);
	const [genreNamePagination, setGenreNamePagination] = useState(1);
	const [genreNamesChosen, setGenreNamesChosen] = useState<Genre[]>([]);

	const genreNamesRef = React.useRef(genreNames);
	const classes = useStyles();

	useEffect(() => {
		genreNamesRef.current = genreNames;
	});

	useEffect(() => {
		fetch(`/api/genres?page=${genreNamePagination}`)
		.then((res) => res.json())
		.then((genres: Genre[]) => {
			const extendedGenres: Genre[] = genreNamesRef.current.concat(genres);
			setGenreNames(extendedGenres);
		})
		.catch((e) => console.error(e));
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