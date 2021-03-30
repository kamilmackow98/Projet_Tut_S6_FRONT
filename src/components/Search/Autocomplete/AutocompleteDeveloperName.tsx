import { TextField } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from "react";
import { Developer } from "types";
import { debounce } from "lodash";

interface Props {
	onChangeName: Function
}

const AutocompleteDeveloperName: React.FC<Props> = ({ onChangeName }) => {

	const [developerNames, setDeveloperNames] = useState<Developer[]>([]);
	const [inputDeveloperNameSearch, setInputDeveloperNameSearch] = useState("");
	const [developerNamePagination, setDeveloperNamePagination] = useState(0);

	useEffect(() => {
		fetch(`/api/developers`)
		.then((res) => res.json())
		.then((developers: Developer[]) => {
			console.log(developers);
			setDeveloperNames(developers);
		})
		.catch((e) => console.error(e));
	}, []);

	useEffect(() => {
		setDeveloperNamePagination(0);
		setDeveloperNames([]);
		fetch(`/api/developers?name=${inputDeveloperNameSearch}`)
		.then((res) => res.json())
		.then((developers: Developer[]) => {
			console.log(developers);
			setDeveloperNames(developers);
		})
		.catch((e) => console.error(e));
	}, [inputDeveloperNameSearch]);

	useEffect(() => {
		fetch(`/api/developers?name=${inputDeveloperNameSearch}&page=${developerNamePagination}`)
		.then((res) => res.json())
		.then((developers: Developer[]) => {
			const extendedDevelopers: Developer[] = developerNames.concat(developers);
			setDeveloperNames(extendedDevelopers);
		})
		.catch((e) => console.error(e));
	}, [developerNamePagination]);
	
	const handleChange = debounce(function(value: string) { 
		setInputDeveloperNameSearch(value);
		onChangeName(value);
	}, 500);

	return (
		<Autocomplete
			ListboxProps={{
				style: { maxHeight: 200, overflow: 'auto' },
				onScroll: (event: React.SyntheticEvent) => {
					const listboxNode = event.currentTarget;
					if (listboxNode.scrollTop + listboxNode.clientHeight === listboxNode.scrollHeight) {
						setDeveloperNamePagination(developerNamePagination + 1);
					}
				}
			}}
			freeSolo
			id="combo-box-developer-name"
			options={developerNames}
			onChange={(event: React.ChangeEvent<{}>, newValue: string | Developer | null) => { if (newValue) onChangeName((newValue as Developer).name) }}
			getOptionLabel={(option: Developer) => option.name}
			style={{ width: 300 }}
			renderInput={(params) => <TextField {...params} label="Developer's name" variant="outlined" onChange={event => handleChange(event.target.value)}/>}
		/>
	);
};

export default AutocompleteDeveloperName;
