import { useState } from "react";
import { TextField } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import AutocompleteDeveloperName from "./Autocomplete/AutocompleteDeveloperName";
import AutocompleteGameName from './Autocomplete/AutocompleteGameName';
import AutocompletePublisherName from "./Autocomplete/AutocompletePublisherName";
import AutocompleteTagName from "./Autocomplete/AutocompleteTagName";
import SelectPlaftormName from "./Select/SelectPlatformName";
import SelectCategoryName from "./Select/SelectCategoryName";
import SelectGenreName from "./Select/SelectGenreName";
import DateFnsUtils from '@date-io/date-fns';

const Search = () => {

    const [gameName, setGameName] = useState("");
    const [publishersName, setPublishersName] = useState<string[]>([]);
    const [developersName, setDevelopersName] = useState<string[]>([]);
    const [tagsName, setTagsName] = useState<string[]>([]);
    const [categoriesName, setCategoriesName] = useState<string[]>([]);
    const [platformsName, setPlatformsName] = useState<string[]>([]);
    const [genresName, setGenresName] = useState<string[]>([]);

    const [releaseDateBeg, setReleaseDateBeg] = useState<Date>(new Date());
    const [releaseDateEnd, setReleaseDateEnd] = useState<Date>(new Date());

    const handleGameNameChange = (name: string) => { setGameName(name); }
    const handlePublishersNameChange = (names: string[]) => { setPublishersName(names); }
    const handleDevelopersNameChange = (names: string[]) => { setDevelopersName(names); }
    const handleTagNamesChange = (names: string[]) => { setTagsName(names); }
    const handleCategoryNamesChange = (names: string[]) => { setCategoriesName(names); }
    const handlePlatformNamesChange = (names: string[]) => { setPlatformsName(names); }
    const handleGenreNamesChange = (names: string[]) => { setGenresName(names); }

    const handleReleaseDateBegChange = (date: Date) => { setReleaseDateBeg(date); }
    const handleReleaseDateEndChange = (date: Date) => { setReleaseDateEnd(date); }

	return (
		<div>
            <AutocompleteGameName onChangeName={(name: string) => handleGameNameChange(name)} />
            <AutocompletePublisherName onChangePublishers={(names: string[]) => handlePublishersNameChange(names)} />
            <AutocompleteDeveloperName onChangeDevelopers={(names: string[]) => handleDevelopersNameChange(names)} />
            <AutocompleteTagName onChangeTags={(names: string[]) => handleTagNamesChange(names)} />

            <SelectCategoryName onChangeCategories={(names: string[]) => handleCategoryNamesChange(names)} />
            <SelectPlaftormName onChangePlatforms={(names: string[]) => handlePlatformNamesChange(names)} />
            <SelectGenreName onChangeGenres={(names: string[]) => handleGenreNamesChange(names)} />

            <TextField
                label="Minimum of positive reviews (%)"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
            />
            <TextField
                label="Minimum age"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
            />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                margin="normal"
                inputVariant="outlined"
                label="Release date from"
                format="MM/dd/yyyy"
                value={releaseDateBeg}
                onChange={(date) => handleReleaseDateBegChange(date as Date)}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
            <KeyboardDatePicker
                margin="normal"
                inputVariant="outlined"
                label="Release date to"
                format="MM/dd/yyyy"
                value={releaseDateEnd}
                onChange={(date) => handleReleaseDateEndChange(date as Date)}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </MuiPickersUtilsProvider>

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