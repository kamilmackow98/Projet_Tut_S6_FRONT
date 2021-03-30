import { useState } from "react";
import AutocompleteGameName from './Autocomplete/AutocompleteGameName';

const Search = () => {

    const [gameName, setGameName] = useState("");

    const handleGameNameChange = (name: string) => {
        setGameName(name);
    }

	return (
		<div>
            <AutocompleteGameName onChangeName={(name: string) => handleGameNameChange(name)} />
            <p>{gameName}</p>
        </div>
	);
};

export default Search;