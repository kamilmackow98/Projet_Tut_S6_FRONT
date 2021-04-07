import { TextField } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from "react";
import { APIErrorMessage, Tag } from "types";
import { debounce } from "lodash";

interface Props {
	onChangeTags: Function,
	mustClear: boolean
}

const AutocompleteTagName: React.FC<Props> = ({ onChangeTags, mustClear }) => {

	const [tagNames, setTagNames] = useState<Tag[]>([]);
    const [inputTagNameSearch, setInputTagNameSearch] = useState("");
	const [tagNamePagination, setTagNamePagination] = useState(1);
	const [firstLaunch, setFirstLaunch] = useState<boolean>(true);
	const [value, setValue] = useState<(string | Tag)[] | undefined>([]);

	const tagNamesRef = React.useRef(tagNames);
	const inputTagNameSearchRef = React.useRef(inputTagNameSearch);
	const firstLaunchRef = React.useRef(firstLaunch);

	useEffect(() => {
		if (mustClear) {
			setValue([]);
			setInputTagNameSearch("");
			onChangeTags(undefined);
		}
	}, [mustClear, onChangeTags]);
   
	useEffect(() => {
		fetch(`/api/tags`)
		.then(r =>  r.json().then(data => ({status: r.status, body: data})))
		.then((obj) => {
			if (obj.status === 200) {
				const tags: Tag[] = obj.body as Tag[];
				setTagNames(tags);
			} else {
				throw new Error((obj.body as APIErrorMessage).message);
			}
		})
		.catch((e) => {});

		setFirstLaunch(false);
	}, []);

	useEffect(() => {
		tagNamesRef.current = tagNames;
		inputTagNameSearchRef.current = inputTagNameSearch;
		firstLaunchRef.current = firstLaunch;
	});

	useEffect(() => {
		if (!firstLaunchRef.current) {
			setTagNamePagination(1);
			setTagNames([]);
			fetch(`/api/tags?name=${inputTagNameSearch}`)
			.then(r =>  r.json().then(data => ({status: r.status, body: data})))
			.then((obj) => {
				if (obj.status === 200) {
					const tags: Tag[] = obj.body as Tag[];
					setTagNames(tags);
				} else {
					throw new Error((obj.body as APIErrorMessage).message);
				}
			})
			.catch((e) => {});
		}
	}, [inputTagNameSearch]);

	useEffect(() => {
		if (!firstLaunchRef.current && tagNamePagination !== 1) {
			fetch(`/api/tags?name=${inputTagNameSearchRef.current}&page=${tagNamePagination}`)
			.then(r =>  r.json().then(data => ({status: r.status, body: data})))
			.then((obj) => {
				if (obj.status === 200) {
					const tags: Tag[] = obj.body as Tag[];
					const extendedTags: Tag[] = tagNamesRef.current.concat(tags);
					setTagNames(extendedTags);
				} else {
					throw new Error((obj.body as APIErrorMessage).message);
				}
			})
			.catch((e) => {});
		}
	}, [tagNamePagination]);
	
	const handleChange = debounce(function(value: string) { 
        setInputTagNameSearch(value);
	}, 500);

	return (
		<Autocomplete
			size="small" 
			ListboxProps={{
				style: { maxHeight: 200, overflow: 'auto' },
				onScroll: (event: React.SyntheticEvent) => {
					const listboxNode = event.currentTarget;
					if (listboxNode.scrollTop + listboxNode.clientHeight === listboxNode.scrollHeight) {
						setTagNamePagination(tagNamePagination + 1);
					}
				}
            }}
            multiple
			freeSolo
			value={value}
			id="combo-box-tag-name"
			options={tagNames}
			filterOptions={(options, state) => options}
			onChange={(event: React.ChangeEvent<{}>, newValues: (string | Tag)[]) => { 
				onChangeTags((newValues as Tag[]).map((tag: Tag) => tag.name));
				setValue(newValues);
			}}
			getOptionLabel={(option: Tag) => option.name}
			renderInput={(params) => <TextField {...params} label="Tag(s)" variant="outlined" onChange={event => handleChange(event.target.value)}/>}
		/>
	);
};

export default AutocompleteTagName;