import { Select, Chip, MenuItem, makeStyles, FormControl, InputLabel } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Genre } from "types";

interface Props {
	onChangeGenres: Function
}

const useStyles = makeStyles((theme) => ({
	chips: {
	  display: 'flex',
	  flexWrap: 'wrap',
	},
	chip: {
	  margin: 2,
	}
}));

const SelectGenreName: React.FC<Props> = ({ onChangeGenres }) => {

	const [categoryNames, setGenreNames] = useState<Genre[]>([]);
	const [categoryNamePagination, setGenreNamePagination] = useState(0);
	const [categoryNamesChosen, setGenreNamesChosen] = useState<Genre[]>([]);

	const classes = useStyles();
   
	useEffect(() => {
		fetch(`/api/genres`)
		.then((res) => res.json())
		.then((genres: Genre[]) => {
			console.log(genres);
			setGenreNames(genres);
		})
		.catch((e) => console.error(e));

		const menu = document.getElementById('select-multiple-native');
		console.log(menu);
		menu?.addEventListener('scroll', (event) => {
			console.log(event);
			console.log('AYO');
		});
	}, []);

	useEffect(() => {
		fetch(`/api/genres?page=${categoryNamePagination}`)
		.then((res) => res.json())
		.then((genres: Genre[]) => {
			const extendedGenres: Genre[] = categoryNames.concat(genres);
			setGenreNames(extendedGenres);
		})
		.catch((e) => console.error(e));
	}, [categoryNamePagination]);
	
	return (
		<FormControl variant="outlined">
        	<InputLabel id="demo-simple-select-outlined-label">Genres</InputLabel>
			<Select
				MenuProps={{	
						PaperProps: {
							onScroll: (event: any) => {
								if ((event.target.scrollTop + event.target.clientHeight) === event.target.scrollHeight) {
									setGenreNamePagination(categoryNamePagination + 1);
									console.log('yooo');
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
				value={categoryNamesChosen}
				multiple
				style={{ width: 300 }}
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
				{categoryNames.map((category: Genre) => (
					<MenuItem value={category.name}>
					{category.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default SelectGenreName;