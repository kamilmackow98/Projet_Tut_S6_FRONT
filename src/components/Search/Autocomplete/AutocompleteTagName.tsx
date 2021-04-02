import { TextField } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from "react";
import { Tag } from "types";
import { debounce } from "lodash";

interface Props {
	onChangeTags: Function
}

const AutocompleteTagName: React.FC<Props> = ({ onChangeTags }) => {

	const [tagNames, setTagNames] = useState<Tag[]>([]);
    const [inputTagNameSearch, setInputTagNameSearch] = useState("");
	const [tagNamePagination, setTagNamePagination] = useState(1);
	const [firstLaunch, setFirstLaunch] = useState<boolean>(true);

	const tagNamesRef = React.useRef(tagNames);
	const inputTagNameSearchRef = React.useRef(inputTagNameSearch);
	const firstLaunchRef = React.useRef(firstLaunch);
   
	useEffect(() => {
		fetch(`/api/tags`)
		.then((res) => res.json())
		.then((tags: Tag[]) => {
			setTagNames(tags);
		})
		.catch((e) => console.error(e));

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
			.then((res) => res.json())
			.then((tags: Tag[]) => {
				setTagNames(tags);
			})
			.catch((e) => console.error(e));
		}
	}, [inputTagNameSearch]);

	useEffect(() => {
		if (!firstLaunchRef.current && tagNamePagination !== 1) {
			fetch(`/api/tags?name=${inputTagNameSearchRef.current}&page=${tagNamePagination}`)
			.then((res) => res.json())
			.then((tags: Tag[]) => {
				const extendedTags: Tag[] = tagNamesRef.current.concat(tags);
				setTagNames(extendedTags);
			})
			.catch((e) => console.error(e));
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
						console.log(tagNamePagination);
						setTagNamePagination(tagNamePagination + 1);
					}
				}
            }}
            multiple
			freeSolo
			id="combo-box-tag-name"
			options={tagNames}
			filterOptions={(options, state) => options}
			onChange={(event: React.ChangeEvent<{}>, newValues: (string | Tag)[]) => { 
                onChangeTags((newValues as Tag[]).map((tag: Tag) => tag.name)); }
            }
			getOptionLabel={(option: Tag) => option.name}
			renderInput={(params) => <TextField {...params} label="Tag(s)" variant="outlined" onChange={event => handleChange(event.target.value)}/>}
		/>
	);
};

export default AutocompleteTagName;