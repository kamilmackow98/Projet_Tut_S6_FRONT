import { Select, Chip, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Age } from "types";
import { useStyles } from "../Search.styles";

interface Props {
	onChangeAges: Function
}

const SelectAge: React.FC<Props> = ({ onChangeAges }) => {

	const [age, setAge] = useState<Age[]>([]);
	const [agePagination, setAgePagination] = useState(1);
	const [ageChosen, setAgeChosen] = useState<Age[]>([]);

	const ageRef = React.useRef(age);
	const classes = useStyles();

	useEffect(() => {
		ageRef.current = age;
	});
   
	useEffect(() => {
		fetch(`/api/ages?page=${agePagination}`)
		.then((res) => res.json())
		.then((ages: Age[]) => {
			const extendedAges: Age[] = ageRef.current.concat(ages);
			setAge(extendedAges);
		})
		.catch((e) => console.error(e));
	}, [agePagination]);
	
	return (
		<FormControl size="small" variant="outlined" className={classes.selectForm}>
        	<InputLabel id="demo-simple-select-outlined-label">Ages</InputLabel>
			<Select
				MenuProps={{	
						PaperProps: {
							onScroll: (event: any) => {
								if ((event.target.scrollTop + event.target.clientHeight) === event.target.scrollHeight) {
									setAgePagination(agePagination + 1);
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
				label="Ages"
				value={ageChosen}
				multiple
				onChange={(event) => { 
					onChangeAges(event.target.value); 
					setAgeChosen((event.target.value as Age[]));
				}}
				renderValue={(selected) => (
					<div className={classes.chips}>
						{(selected as any).map((value: any) => (
							<Chip label={value} className={classes.chip} />
						))}
					</div>
				)}
			>
				{age.map((age: Age) => (
					<MenuItem value={age.age} key={age.age}>
						{age.age}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default SelectAge;
