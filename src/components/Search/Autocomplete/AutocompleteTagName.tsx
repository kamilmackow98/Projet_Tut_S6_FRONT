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