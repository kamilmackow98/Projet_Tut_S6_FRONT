import { useState } from "react";
import AutocompleteDeveloperName from "./Autocomplete/AutocompleteDeveloperName";
import AutocompleteGameName from './Autocomplete/AutocompleteGameName';
import AutocompletePublisherName from "./Autocomplete/AutocompletePublisherName";

const Search = () => {

    const [gameName, setGameName] = useState("");
    const [publisherName, setPublisherName] = useState("");
    const [developerName, setDeveloperName] = useState("");

    const handleGameNameChange = (name: string) => { setGameName(name); }
    const handlePublisherNameChange = (name: string) => { setPublisherName(name); }
    const handleDeveloperNameChange = (name: string) => { setDeveloperName(name); }

	return (
		<div>
            <AutocompleteGameName onChangeName={(name: string) => handleGameNameChange(name)} />
            <AutocompletePublisherName onChangeName={(name: string) => handlePublisherNameChange(name)} />
            <AutocompleteDeveloperName onChangeName={(name: string) => handleDeveloperNameChange(name)} />
            <p>{gameName}</p>
            <p>{publisherName}</p>
            <p>{developerName}</p>
        </div>
	);
};

export default Search;