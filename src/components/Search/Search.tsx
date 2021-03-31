import { useState } from "react";
import AutocompleteDeveloperName from "./Autocomplete/AutocompleteDeveloperName";
import AutocompleteGameName from './Autocomplete/AutocompleteGameName';
import AutocompletePublisherName from "./Autocomplete/AutocompletePublisherName";
import AutocompleteTagName from "./Autocomplete/AutocompleteTagName";
import SelectPlaftormName from "./Select/SelectPlatformName";
import SelectCategoryName from "./Select/SelectCategoryName";
import SelectGenreName from "./Select/SelectGenreName";

const Search = () => {

    const [gameName, setGameName] = useState("");
    const [publishersName, setPublishersName] = useState<string[]>([]);
    const [developersName, setDevelopersName] = useState<string[]>([]);
    const [tagsName, setTagsName] = useState<string[]>([]);
    const [categoriesName, setCategoriesName] = useState<string[]>([]);
    const [platformsName, setPlatformsName] = useState<string[]>([]);
    const [genresName, setGenresName] = useState<string[]>([]);

    const handleGameNameChange = (name: string) => { setGameName(name); }
    const handlePublishersNameChange = (names: string[]) => { setPublishersName(names); }
    const handleDevelopersNameChange = (names: string[]) => { setDevelopersName(names); }
    const handleTagNamesChange = (names: string[]) => { setTagsName(names); }
    const handleCategoryNamesChange = (names: string[]) => { setCategoriesName(names); }
    const handlePlatformNamesChange = (names: string[]) => { setPlatformsName(names); }
    const handleGenreNamesChange = (names: string[]) => { setGenresName(names); }

	return (
		<div>
            <AutocompleteGameName onChangeName={(name: string) => handleGameNameChange(name)} />
            <AutocompletePublisherName onChangePublishers={(names: string[]) => handlePublishersNameChange(names)} />
            <AutocompleteDeveloperName onChangeDevelopers={(names: string[]) => handleDevelopersNameChange(names)} />
            <AutocompleteTagName onChangeTags={(names: string[]) => handleTagNamesChange(names)} />
            <SelectCategoryName onChangeCategories={(names: string[]) => handleCategoryNamesChange(names)} />
            <SelectPlaftormName onChangePlatforms={(names: string[]) => handlePlatformNamesChange(names)} />
            <SelectGenreName onChangeGenres={(names: string[]) => handleGenreNamesChange(names)} />
            <p>{gameName}</p>
            {publishersName?.map((publisher: string) => ( <p>{publisher}</p> ))}
            {tagsName?.map((tag: string) => ( <p>{tag}</p> ))}
            {developersName?.map((developer: string) => ( <p>{developer}</p> ))}
            {categoriesName?.map((category: string) => ( <p>{category}</p> ))}
            {platformsName?.map((platform: string) => ( <p>{platform}</p> ))}
            {genresName?.map((genre: string) => ( <p>{genre}</p> ))}
        </div>
	);
};

export default Search;