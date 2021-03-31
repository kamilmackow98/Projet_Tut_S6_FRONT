import { useState } from "react";
import { TextField, Grid } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import AutocompleteDeveloperName from "./Autocomplete/AutocompleteDeveloperName";
import AutocompleteGameName from './Autocomplete/AutocompleteGameName';
import AutocompletePublisherName from "./Autocomplete/AutocompletePublisherName";
import AutocompleteTagName from "./Autocomplete/AutocompleteTagName";
import SelectPlaftormName from "./Select/SelectPlatformName";
import SelectCategoryName from "./Select/SelectCategoryName";
import SelectGenreName from "./Select/SelectGenreName";
import DateFnsUtils from '@date-io/date-fns';
import './Search.css';

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
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container spacing={3} className="grid-container">
                <Grid item xs={12} sm={12}>
                    <AutocompleteGameName onChangeName={(name: string) => handleGameNameChange(name)} />
                </Grid>
                <Grid item xs={12} sm={10}>
                    <AutocompletePublisherName onChangePublishers={(names: string[]) => handlePublishersNameChange(names)} />
                </Grid>
                <Grid item xs={12} sm={10}>
                    <AutocompleteDeveloperName onChangeDevelopers={(names: string[]) => handleDevelopersNameChange(names)} />
                </Grid>
                <Grid item xs={12} sm={10}>
                    <AutocompleteTagName onChangeTags={(names: string[]) => handleTagNamesChange(names)} />
                </Grid>
                <Grid item xs={12} sm={10}>
                    <SelectCategoryName onChangeCategories={(names: string[]) => handleCategoryNamesChange(names)} />
                </Grid>
                <Grid item xs={12} sm={10}>
                    <SelectPlaftormName onChangePlatforms={(names: string[]) => handlePlatformNamesChange(names)} />
                </Grid>
                <Grid item xs={12} sm={10}>
                    <SelectGenreName onChangeGenres={(names: string[]) => handleGenreNamesChange(names)} />
                </Grid>
                <Grid item xs={12} sm={10}>
                    <TextField
                        className="textfield-input"
                        label="Minimum of positive reviews (%)"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} sm={10}>
                    <TextField
                        className="textfield-input"
                        label="Minimum age"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <KeyboardDatePicker
                        className="datepicker-input"
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
                </Grid>
                <Grid item xs={12} sm={5}>
                    <KeyboardDatePicker
                        className="datepicker-input"
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
                </Grid>
                <Grid item xs={12}>
                    <p>{gameName}</p>
                    {publishersName?.map((publisher: string) => ( <p>{publisher}</p> ))}
                    {tagsName?.map((tag: string) => ( <p>{tag}</p> ))}
                    {developersName?.map((developer: string) => ( <p>{developer}</p> ))}
                    {categoriesName?.map((category: string) => ( <p>{category}</p> ))}
                    {platformsName?.map((platform: string) => ( <p>{platform}</p> ))}
                    {genresName?.map((genre: string) => ( <p>{genre}</p> ))}
                </Grid>
            </Grid>
        </MuiPickersUtilsProvider>
	);
};

export default Search;