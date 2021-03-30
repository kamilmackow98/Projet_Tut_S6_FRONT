import { useState } from "react";
import { Tag } from "types";
import AutocompleteDeveloperName from "./Autocomplete/AutocompleteDeveloperName";
import AutocompleteGameName from './Autocomplete/AutocompleteGameName';
import AutocompletePublisherName from "./Autocomplete/AutocompletePublisherName";
import AutocompleteTagName from "./Autocomplete/AutocompleteTagName";

const Search = () => {

    const [gameName, setGameName] = useState("");
    const [publishersName, setPublishersName] = useState<string[]>([]);
    const [developerName, setDeveloperName] = useState("");
    const [tagsName, setTagsName] = useState<string[]>();

    const handleGameNameChange = (name: string) => { setGameName(name); }
    const handlePublisherNameChange = (names: string[]) => { setPublishersName(names); }
    const handleDeveloperNameChange = (name: string) => { setDeveloperName(name); }
    const handleTagNamesChange = (names: string[]) => { setTagsName(names); console.log(names); }

	return (
		<div>
            <AutocompleteGameName onChangeName={(name: string) => handleGameNameChange(name)} />
            <AutocompletePublisherName onChangePublishers={(names: string[]) => handlePublisherNameChange(names)} />
            <AutocompleteDeveloperName onChangeName={(name: string) => handleDeveloperNameChange(name)} />
            <AutocompleteTagName onChangeTags={(names: string[]) => handleTagNamesChange(names)} />
            <p>{gameName}</p>
            {publishersName?.map((publisher: string) => ( <p>{publisher}</p> ))}
            {tagsName?.map((tag: string) => ( <p>{tag}</p> ))}
            <p>{developerName}</p>
            
        </div>
	);
};

export default Search;