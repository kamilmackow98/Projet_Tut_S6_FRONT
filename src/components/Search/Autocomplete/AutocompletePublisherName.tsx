import { TextField } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from "react";
import { Publisher } from "types";
import { debounce } from "lodash";

interface Props {
	onChangePublishers: Function
}

const AutocompletePublisherName: React.FC<Props> = ({ onChangePublishers }) => {

	const [publisherNames, setPublisherNames] = useState<Publisher[]>([]);
    const [inputPublisherNameSearch, setInputPublisherNameSearch] = useState("");
	const [publisherNamePagination, setPublisherNamePagination] = useState(1);
	const [firstLaunch, setFirstLaunch] = useState<boolean>(true);

	const publisherNamesRef = React.useRef(publisherNames);
	const inputPublisherNameSearchRef = React.useRef(inputPublisherNameSearch);
	const firstLaunchRef = React.useRef(firstLaunch);
   
	useEffect(() => {
		fetch(`/api/publishers`)
		.then((res) => res.json())
		.then((publishers: Publisher[]) => {
			setPublisherNames(publishers);
		})
		.catch((e) => console.error(e));

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
			.then((res) => res.json())
			.then((publishers: Publisher[]) => {
				setPublisherNames(publishers);
			})
			.catch((e) => console.error(e));
		}
	}, [inputPublisherNameSearch]);

	useEffect(() => {
		if (!firstLaunchRef.current && publisherNamePagination !== 1) {
			fetch(`/api/publishers?name=${inputPublisherNameSearchRef.current}&page=${publisherNamePagination}`)
			.then((res) => res.json())
			.then((publishers: Publisher[]) => {
				const extendedPublishers: Publisher[] = publisherNamesRef.current.concat(publishers);
				setPublisherNames(extendedPublishers);
			})
			.catch((e) => console.error(e));
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
			id="combo-box-publisher-name"
			options={publisherNames}
			filterOptions={(options, state) => options}
			onChange={(event: React.ChangeEvent<{}>, newValues: (string | Publisher)[]) => { 
                onChangePublishers((newValues as Publisher[]).map((publisher: Publisher) => publisher.name)); }
            }
			getOptionLabel={(option: Publisher) => option.name}
			renderInput={(params) => <TextField {...params} label="Publisher(s)" variant="outlined" onChange={event => handleChange(event.target.value)}/>}
		/>
	);
};

export default AutocompletePublisherName;
