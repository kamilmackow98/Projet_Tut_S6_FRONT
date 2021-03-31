import { Select, Chip, MenuItem, makeStyles, FormControl, InputLabel } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Platform } from "types";

interface Props {
	onChangePlatforms: Function
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

const SelectPlatformName: React.FC<Props> = ({ onChangePlatforms }) => {

	const [categoryNames, setPlatformNames] = useState<Platform[]>([]);
	const [categoryNamePagination, setPlatformNamePagination] = useState(0);
	const [categoryNamesChosen, setPlatformNamesChosen] = useState<Platform[]>([]);

	const classes = useStyles();
   
	useEffect(() => {
		fetch(`/api/platforms`)
		.then((res) => res.json())
		.then((platforms: Platform[]) => {
			console.log(platforms);
			setPlatformNames(platforms);
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
		fetch(`/api/platforms?page=${categoryNamePagination}`)
		.then((res) => res.json())
		.then((platforms: Platform[]) => {
			const extendedPlatforms: Platform[] = categoryNames.concat(platforms);
			setPlatformNames(extendedPlatforms);
		})
		.catch((e) => console.error(e));
	}, [categoryNamePagination]);
	
	return (
		<FormControl variant="outlined">
        	<InputLabel id="demo-simple-select-outlined-label">Platforms</InputLabel>
			<Select
				MenuProps={{	
						PaperProps: {
							onScroll: (event: any) => {
								if ((event.target.scrollTop + event.target.clientHeight) === event.target.scrollHeight) {
									setPlatformNamePagination(categoryNamePagination + 1);
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
					onChangePlatforms(event.target.value);
					setPlatformNamesChosen((event.target.value as Platform[]));
				}}
				renderValue={(selected) => (
					<div className={classes.chips}>
						{(selected as any).map((value: any) => (
							<Chip label={value} className={classes.chip} />
						))}
					</div>
				)}
			>
				{categoryNames.map((category: Platform) => (
					<MenuItem value={category.name}>
					{category.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default SelectPlatformName;
