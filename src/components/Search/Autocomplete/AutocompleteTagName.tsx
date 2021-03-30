import { TextField } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from "react";
import { Tag } from "types";
import { debounce } from "lodash";

interface Props {
	onChangeName: Function
}

const AutocompleteTagName: React.FC<Props> = ({ onChangeName }) => {

	const [tagNames, setTagNames] = useState<Tag[]>([]);
	const [inputTagNameSearch, setInputTagNameSearch] = useState("");
	const [tagNamePagination, setTagNamePagination] = useState(0);

	useEffect(() => {
		fetch(`/api/tags`)
		.then((res) => res.json())
		.then((tags: Tag[]) => {
			console.log(tags);
			setTagNames(tags);
		})
		.catch((e) => console.error(e));
	}, []);

	useEffect(() => {
		setTagNamePagination(0);
		setTagNames([]);
		fetch(`/api/tags?name=${inputTagNameSearch}`)
		.then((res) => res.json())
		.then((tags: Tag[]) => {
			console.log(tags);
			setTagNames(tags);
		})
		.catch((e) => console.error(e));
	}, [inputTagNameSearch]);

	useEffect(() => {
		fetch(`/api/tags?name=${inputTagNameSearch}&page=${tagNamePagination}`)
		.then((res) => res.json())
		.then((tags: Tag[]) => {
			const extendedTags: Tag[] = tagNames.concat(tags);
			setTagNames(extendedTags);
		})
		.catch((e) => console.error(e));
	}, [tagNamePagination]);
	
	const handleChange = debounce(function(value: string) { 
		setInputTagNameSearch(value);
		onChangeName(value);
	}, 500);

	return (
		<Autocomplete
			ListboxProps={{
				style: { maxHeight: 200, overflow: 'auto' },
				onScroll: (event: React.SyntheticEvent) => {
					const listboxNode = event.currentTarget;
					if (listboxNode.scrollTop + listboxNode.clientHeight === listboxNode.scrollHeight) {
						setTagNamePagination(tagNamePagination + 1);
					}
				}
			}}
			freeSolo
			id="combo-box-tag-name"
			options={tagNames}
			onChange={(event: React.ChangeEvent<{}>, newValue: string | Tag | null) => { if (newValue) onChangeName((newValue as Tag).name) }}
			getOptionLabel={(option: Tag) => option.name}
			style={{ width: 300 }}
			renderInput={(params) => <TextField {...params} label="Tag(s)" variant="outlined" onChange={event => handleChange(event.target.value)}/>}
		/>
	);
};

export default AutocompleteTagName;