import { useState } from "react";
import { Tag } from "types";
import AutocompleteDeveloperName from "./Autocomplete/AutocompleteDeveloperName";
import AutocompleteGameName from './Autocomplete/AutocompleteGameName';
import AutocompletePublisherName from "./Autocomplete/AutocompletePublisherName";
import AutocompleteTagName from "./Autocomplete/AutocompleteTagName";

const Search = () => {

    const [gameName, setGameName] = useState("");
    const [publisherName, setPublisherName] = useState("");
    const [developerName, setDeveloperName] = useState("");
    const [tagsName, setTagsName] = useState<string[]>();

    const handleGameNameChange = (name: string) => { setGameName(name); }
    const handlePublisherNameChange = (name: string) => { setPublisherName(name); }
    const handleDeveloperNameChange = (name: string) => { setDeveloperName(name); }
    const handleTagNamesChange = (names: string[]) => { setTagsName(names); console.log(names); }

	return (
		<div>
            <AutocompleteGameName onChangeName={(name: string) => handleGameNameChange(name)} />
            <AutocompletePublisherName onChangeName={(name: string) => handlePublisherNameChange(name)} />
            <AutocompleteDeveloperName onChangeName={(name: string) => handleDeveloperNameChange(name)} />
            <AutocompleteTagName onChangeTags={(names: string[]) => handleTagNamesChange(names)} />
            <p>{gameName}</p>
            <p>{publisherName}</p>
            <p>{developerName}</p>
            
        </div>
	);
};

export default Search;