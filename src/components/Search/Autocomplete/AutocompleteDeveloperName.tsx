import { TextField } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from "react";
import { APIErrorMessage, Developer } from "types";
import { debounce } from "lodash";

interface Props {
	onChangeDevelopers: Function,
	mustClear: boolean
}

const AutocompleteDeveloperName: React.FC<Props> = ({ onChangeDevelopers, mustClear }) => {

	const [developerNames, setDeveloperNames] = useState<Developer[]>([]);
    const [inputDeveloperNameSearch, setInputDeveloperNameSearch] = useState("");
	const [developerNamePagination, setDeveloperNamePagination] = useState(1);
	const [firstLaunch, setFirstLaunch] = useState<boolean>(true);
	const [value, setValue] = useState<(string | Developer)[] | undefined>([]);

	const developerNamesRef = React.useRef(developerNames);
	const inputDeveloperNameSearchRef = React.useRef(inputDeveloperNameSearch);
	const firstLaunchRef = React.useRef(firstLaunch);
	const myRef = React.useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (mustClear) {
			setValue([]);
			setInputDeveloperNameSearch("");
		}
	}, [mustClear]);
   
	useEffect(() => {
		fetch(`/api/developers`)
		.then(r =>  r.json().then(data => ({status: r.status, body: data})))
		.then((obj) => {
			if (obj.status === 200) {
				const developers: Developer[] = obj.body as Developer[];
				setDeveloperNames(developers);
			} else {
				throw new Error((obj.body as APIErrorMessage).message);
			}
		})
		.catch((e) => {});

		setFirstLaunch(false);
	}, []);

	useEffect(() => {
		developerNamesRef.current = developerNames;
		inputDeveloperNameSearchRef.current = inputDeveloperNameSearch;
		firstLaunchRef.current = firstLaunch;
	});

	useEffect(() => {
		if (!firstLaunchRef.current) {
			setDeveloperNamePagination(1);
			setDeveloperNames([]);
			fetch(`/api/developers?name=${inputDeveloperNameSearch}`)
			.then(r =>  r.json().then(data => ({status: r.status, body: data})))
			.then((obj) => {
				if (obj.status === 200) {
					const developers: Developer[] = obj.body as Developer[];
					setDeveloperNames(developers);
				} else {
					throw new Error((obj.body as APIErrorMessage).message);
				}
			})
			.catch((e) => {});
		}
	}, [inputDeveloperNameSearch]);

	useEffect(() => {
		if (!firstLaunchRef.current && developerNamePagination !== 1) {
			fetch(`/api/developers?name=${inputDeveloperNameSearchRef.current}&page=${developerNamePagination}`)
			.then(r =>  r.json().then(data => ({status: r.status, body: data})))
			.then((obj) => {
				if (obj.status === 200) {
					const developers: Developer[] = obj.body as Developer[];
					const extendedDevelopers: Developer[] = developerNamesRef.current.concat(developers);
					setDeveloperNames(extendedDevelopers);
				} else {
					throw new Error((obj.body as APIErrorMessage).message);
				}
			})
			.catch((e) => {});
		}
	}, [developerNamePagination]);
	
	const handleChange = debounce(function(value: string) { 
        setInputDeveloperNameSearch(value);
	}, 500);

	return (
		<Autocomplete
			size="small" 
			ListboxProps={{
				style: { maxHeight: 200, overflow: 'auto' },
				onScroll: (event: React.SyntheticEvent) => {
					const listboxNode = event.currentTarget;
					if (listboxNode.scrollTop + listboxNode.clientHeight === listboxNode.scrollHeight) {
						setDeveloperNamePagination(developerNamePagination + 1);
					}
				}
            }}
            multiple
			freeSolo
			value={value}
			id="combo-box-developer-name"
			options={developerNames}
			filterOptions={(options, state) => options}
			onChange={(event: React.ChangeEvent<{}>, newValues: (string | Developer)[]) => { 
				onChangeDevelopers((newValues as Developer[]).map((developer: Developer) => developer.name));
				setValue(newValues);
			}}
			getOptionLabel={(option: Developer) => option.name}
			renderInput={(params) => <TextField {...params}  inputRef={myRef} label="Developer(s)" variant="outlined" onChange={event => handleChange(event.target.value)}/>}
		/>
	);
};

export default AutocompleteDeveloperName;

