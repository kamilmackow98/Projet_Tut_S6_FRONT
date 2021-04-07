import { Select, Chip, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Age, APIErrorMessage } from "types";
import { useStyles } from "../Search.styles";

interface Props {
	onChangeAges: Function,
	mustClear: boolean
};

const SelectAge: React.FC<Props> = ({ onChangeAges, mustClear }) => {

	const [age, setAge] = useState<Age[]>([]);
	const [agePagination, setAgePagination] = useState(1);
	const [ageChosen, setAgeChosen] = useState<Age[]>([]);

	const ageRef = React.useRef(age);
	const classes = useStyles();

	useEffect(() => {
		ageRef.current = age;
	});

	useEffect(() => {
		if (mustClear) {
			setAgeChosen([]);
			onChangeAges(undefined);
		}
	}, [mustClear, onChangeAges]);
   
	useEffect(() => {
		fetch(`/api/ages?page=${agePagination}`)
		.then(r =>  r.json().then(data => ({status: r.status, body: data})))
		.then((obj) => {
			if (obj.status === 200) {
				const extendedAges: Age[] = ageRef.current.concat(obj.body as Age[]);
				setAge(extendedAges);
			} else {
				throw new Error((obj.body as APIErrorMessage).message);
			}
		})
		.catch((e) => {});
	}, [agePagination]);
	
	return (
		<FormControl size="small" variant="outlined" className={classes.selectForm}>
        	<InputLabel id="demo-simple-select-outlined-label">Ages</InputLabel>
			<Select
				label="Ages"
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
				value={ageChosen}
				multiple
				onChange={(event) => { 
					onChangeAges(event.target.value); 
					setAgeChosen((event.target.value as Age[]));
				}}
				renderValue={(selected) => (
					<div className={classes.chips}>
						{React.Children.toArray(
							(selected as any).map((value: any) => (
								<Chip key={value} label={value} className={classes.chip} />
							))
						)}
					</div>
				)}
			>
				{age.map((age: Age) => (
					<MenuItem value={age.value} key={age.value}>
						{age.value}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default SelectAge;
