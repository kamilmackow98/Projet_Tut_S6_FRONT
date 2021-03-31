import { useState } from "react";
import AutocompleteDeveloperName from "./Autocomplete/AutocompleteDeveloperName";
import AutocompleteGameName from './Autocomplete/AutocompleteGameName';
import AutocompletePublisherName from "./Autocomplete/AutocompletePublisherName";
import AutocompleteTagName from "./Autocomplete/AutocompleteTagName";
import AutocompletePlaftormName from "./Autocomplete/AutocompletePlatformName";
import AutocompleteCategoryName from "./Autocomplete/AutocompleteCategoryName";

const Search = () => {

    const [gameName, setGameName] = useState("");
    const [publishersName, setPublishersName] = useState<string[]>([]);
    const [developersName, setDevelopersName] = useState<string[]>([]);
    const [tagsName, setTagsName] = useState<string[]>([]);
    const [categoriesName, setCategoriesName] = useState<string[]>([]);
    const [platformsName, setPlatformsName] = useState<string[]>([]);

    const handleGameNameChange = (name: string) => { setGameName(name); }
    const handlePublishersNameChange = (names: string[]) => { setPublishersName(names); }
    const handleDevelopersNameChange = (names: string[]) => { setDevelopersName(names); }
    const handleTagNamesChange = (names: string[]) => { setTagsName(names); }
    const handleCategoryNamesChange = (names: string[]) => { setCategoriesName(names); }
    const handlePlatformNamesChange = (names: string[]) => { setPlatformsName(names); console.log(names); }

	return (
		<div>
            <AutocompleteGameName onChangeName={(name: string) => handleGameNameChange(name)} />
            <AutocompletePublisherName onChangePublishers={(names: string[]) => handlePublishersNameChange(names)} />
            <AutocompleteDeveloperName onChangeDevelopers={(names: string[]) => handleDevelopersNameChange(names)} />
            <AutocompleteTagName onChangeTags={(names: string[]) => handleTagNamesChange(names)} />
            <AutocompleteCategoryName onChangeCategories={(names: string[]) => handleCategoryNamesChange(names)} />
            <AutocompletePlaftormName onChangePlatforms={(names: string[]) => handlePlatformNamesChange(names)} />
            <p>{gameName}</p>
            {publishersName?.map((publisher: string) => ( <p>{publisher}</p> ))}
            {tagsName?.map((tag: string) => ( <p>{tag}</p> ))}
            {developersName?.map((developer: string) => ( <p>{developer}</p> ))}
            {categoriesName?.map((category: string) => ( <p>{category}</p> ))}
            {platformsName?.map((platform: string) => ( <p>{platform}</p> ))}
        </div>
	);
};

export default Search;