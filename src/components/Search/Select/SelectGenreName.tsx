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

	const classes = useStyles();
   
	useEffect(() => {
		fetch(`/api/genres`)
		.then((res) => res.json())
		.then((genres: Genre[]) => {
			console.log(genres);
			setGenreNames(genres);
		})
		.catch((e) => console.error(e));
	}, []);

	useEffect(() => {
		fetch(`/api/genres?page=${genreNamePagination}`)
		.then((res) => res.json())
		.then((genres: Genre[]) => {
			const extendedGenres: Genre[] = genreNames.concat(genres);
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
				value={genreNamesChosen}
				multiple
				onChange={(event) => { 
					onChangeGenres(event.target.value);
					setGenreNamesChosen((event.target.value as Genre[]));
				}}
				renderValue={(selected) => (
					<div className={classes.chips}>
						{(selected as any).map((value: any) => (
							<Chip label={value} className={classes.chip} />
						))}
					</div>
				)}
			>
				{genreNames.map((genre: Genre) => (
					<MenuItem value={genre.name}>
					{genre.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default SelectGenreName;