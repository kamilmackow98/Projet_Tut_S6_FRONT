import { TextField } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from "react";
import { APIErrorMessage, Publisher } from "types";
import { debounce } from "lodash";

interface Props {
	onChangePublishers: Function,
	mustClear: boolean
}

const AutocompletePublisherName: React.FC<Props> = ({ onChangePublishers, mustClear }) => {

	const [publisherNames, setPublisherNames] = useState<Publisher[]>([]);
    const [inputPublisherNameSearch, setInputPublisherNameSearch] = useState("");
	const [publisherNamePagination, setPublisherNamePagination] = useState(1);
	const [firstLaunch, setFirstLaunch] = useState<boolean>(true);
	const [value, setValue] = useState<(string | Publisher)[] | undefined>([]);

	const publisherNamesRef = React.useRef(publisherNames);
	const inputPublisherNameSearchRef = React.useRef(inputPublisherNameSearch);
	const firstLaunchRef = React.useRef(firstLaunch);

	useEffect(() => {
		if (mustClear) {
			setValue([]);
			setInputPublisherNameSearch("");
			onChangePublishers(undefined);
		}
	}, [mustClear, onChangePublishers]);
   
	useEffect(() => {
		fetch(`/api/publishers`)
		.then(r =>  r.json().then(data => ({status: r.status, body: data})))
		.then((obj) => {
			if (obj.status === 200) {
				const publishers: Publisher[] = obj.body as Publisher[];
				setPublisherNames(publishers);
			} else {
				throw new Error((obj.body as APIErrorMessage).message);
			}
		})
		.catch((e) => {});

		setFirstLaunch(false);
	}, []);

	useEffect(() => {
		publisherNamesRef.current = publisherNames;
		inputPublisherNameSearchRef.current = inputPublisherNameSearch;
		firstLaunchRef.current = firstLaunch;
	});

	useEffect(() => {
		if (!firstLaunchRef.current) {
			setPublisherNamePagination(1);
			setPublisherNames([]);
			fetch(`/api/publishers?name=${inputPublisherNameSearch}`)
			.then(r =>  r.json().then(data => ({status: r.status, body: data})))
			.then((obj) => {
				if (obj.status === 200) {
					const publishers: Publisher[] = obj.body as Publisher[];
					setPublisherNames(publishers);
				} else {
					throw new Error((obj.body as APIErrorMessage).message);
				}
			})
			.catch((e) => {});
		}
	}, [inputPublisherNameSearch]);

	useEffect(() => {
		if (!firstLaunchRef.current && publisherNamePagination !== 1) {
			fetch(`/api/publishers?name=${inputPublisherNameSearchRef.current}&page=${publisherNamePagination}`)
			.then(r =>  r.json().then(data => ({status: r.status, body: data})))
			.then((obj) => {
				if (obj.status === 200) {
					const publishers: Publisher[] = obj.body as Publisher[];
					const extendedPublishers: Publisher[] = publisherNamesRef.current.concat(publishers);
					setPublisherNames(extendedPublishers);
				} else {
					throw new Error((obj.body as APIErrorMessage).message);
				}
			})
			.catch((e) => {});
		}
	}, [publisherNamePagination]);
	
	const handleChange = debounce(function(value: string) { 
        setInputPublisherNameSearch(value);
	}, 500);

	return (
		<Autocomplete
			size="small" 
			ListboxProps={{
				style: { maxHeight: 200, overflow: 'auto' },
				onScroll: (event: React.SyntheticEvent) => {
					const listboxNode = event.currentTarget;
					if (listboxNode.scrollTop + listboxNode.clientHeight === listboxNode.scrollHeight) {
						setPublisherNamePagination(publisherNamePagination + 1);
					}
				}
            }}
            multiple
			freeSolo
			value={value}
			id="combo-box-publisher-name"
			options={publisherNames}
			filterOptions={(options, state) => options}
			onChange={(event: React.ChangeEvent<{}>, newValues: (string | Publisher)[]) => { 
				onChangePublishers((newValues as Publisher[]).map((publisher: Publisher) => publisher.name));
				setValue(newValues);
			}}
			getOptionLabel={(option: Publisher) => option.name}
			renderInput={(params) => <TextField {...params} label="Publisher(s)" variant="outlined" onChange={event => handleChange(event.target.value)}/>}
		/>
	);
};

export default AutocompletePublisherName;
