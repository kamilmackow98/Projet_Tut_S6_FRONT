import { useState } from "react";
import AutocompleteGameName from './Autocomplete/AutocompleteGameName';
import AutocompletePublisherName from "./Autocomplete/AutocompletePublisherName";

const Search = () => {

    const [gameName, setGameName] = useState("");
    const [publisherName, setPublisherName] = useState("");

    const handleGameNameChange = (name: string) => {
        setGameName(name);
    }

    const handlePublisherNameChange = (name: string) => {
        setPublisherName(name);
    }

	return (
		<div>
            <AutocompleteGameName onChangeName={(name: string) => handleGameNameChange(name)} />
            <AutocompletePublisherName onChangeName={(name: string) => handlePublisherNameChange(name)} />
            <p>{gameName}</p>
            <p>{publisherName}</p>
        </div>
	);
};

export default Search;