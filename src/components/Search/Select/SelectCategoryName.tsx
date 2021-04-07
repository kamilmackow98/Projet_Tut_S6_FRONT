import { Select, Chip, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Category } from "types";
import { useStyles } from "../Search.styles";

interface Props {
	onChangeCategories: Function,
	mustClear: boolean
}

const SelectCategoryName: React.FC<Props> = ({ onChangeCategories, mustClear }) => {

	const [categoryNames, setCategoryNames] = useState<Category[]>([]);
	const [categoryNamePagination, setCategoryNamePagination] = useState(1);
	const [categoryNamesChosen, setCategoryNamesChosen] = useState<Category[]>([]);

	const categoryNamesRef = React.useRef(categoryNames);
	const classes = useStyles();

	useEffect(() => {
		if (mustClear) {
			setCategoryNamesChosen([]);
			onChangeCategories(undefined);
		}
	}, [mustClear, onChangeCategories]);
   
	useEffect(() => {
		categoryNamesRef.current = categoryNames;
	});
   
	useEffect(() => {
		fetch(`/api/categories?page=${categoryNamePagination}`)
		.then((res) => res.json())
		.then((categories: Category[]) => {
			const extendedCategories: Category[] = categoryNamesRef.current.concat(categories);
			setCategoryNames(extendedCategories);
		})
		.catch((e) => console.error(e));
	}, [categoryNamePagination]);
	
	return (
		<FormControl size="small"  variant="outlined" className={classes.selectForm}>
        	<InputLabel id="demo-simple-select-outlined-label">Categories</InputLabel>
			<Select
				MenuProps={{	
						PaperProps: {
							onScroll: (event: any) => {
								if ((event.target.scrollTop + event.target.clientHeight) === event.target.scrollHeight) {
									setCategoryNamePagination(categoryNamePagination + 1);
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
				label="Categories"
				value={categoryNamesChosen}
				multiple
				onChange={(event) => { 
					onChangeCategories(event.target.value); 
					setCategoryNamesChosen((event.target.value as Category[]));
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
				{categoryNames.map((category: Category) => (
					<MenuItem value={category.name} key={category.name}>
						{category.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default SelectCategoryName;
