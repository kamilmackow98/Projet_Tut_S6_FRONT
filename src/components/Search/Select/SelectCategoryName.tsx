import { Select, Chip, MenuItem, makeStyles, FormControl, InputLabel } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Category } from "types";

interface Props {
	onChangeCategories: Function
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

const SelectCategoryName: React.FC<Props> = ({ onChangeCategories }) => {

	const [categoryNames, setCategoryNames] = useState<Category[]>([]);
	const [categoryNamePagination, setCategoryNamePagination] = useState(0);
	const [categoryNamesChosen, setCategoryNamesChosen] = useState<Category[]>([]);

	const classes = useStyles();
   
	useEffect(() => {
		fetch(`/api/categories`)
		.then((res) => res.json())
		.then((categories: Category[]) => {
			console.log(categories);
			setCategoryNames(categories);
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
		fetch(`/api/categories?page=${categoryNamePagination}`)
		.then((res) => res.json())
		.then((categories: Category[]) => {
			const extendedCategories: Category[] = categoryNames.concat(categories);
			setCategoryNames(extendedCategories);
		})
		.catch((e) => console.error(e));
	}, [categoryNamePagination]);
	
	return (
		<FormControl variant="outlined">
        	<InputLabel id="demo-simple-select-outlined-label">Categories</InputLabel>
			<Select
				MenuProps={{	
						PaperProps: {
							onScroll: (event: any) => {
								if ((event.target.scrollTop + event.target.clientHeight) === event.target.scrollHeight) {
									setCategoryNamePagination(categoryNamePagination + 1);
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
					onChangeCategories(event.target.value); 
					setCategoryNamesChosen((event.target.value as Category[]));
				}}
				renderValue={(selected) => (
					<div className={classes.chips}>
						{(selected as any).map((value: any) => (
							<Chip label={value} className={classes.chip} />
						))}
					</div>
				)}
			>
				{categoryNames.map((category: Category) => (
					<MenuItem value={category.name}>
					{category.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default SelectCategoryName;
