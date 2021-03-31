import { useState } from "react";
import { TextField, Grid, Button } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import AutocompleteDeveloperName from "./Autocomplete/AutocompleteDeveloperName";
import AutocompleteGameName from './Autocomplete/AutocompleteGameName';
import AutocompletePublisherName from "./Autocomplete/AutocompletePublisherName";
import AutocompleteTagName from "./Autocomplete/AutocompleteTagName";
import SelectPlaftormName from "./Select/SelectPlatformName";
import SelectCategoryName from "./Select/SelectCategoryName";
import SelectGenreName from "./Select/SelectGenreName";
import DateFnsUtils from '@date-io/date-fns';
import { Game, Filters } from "types";
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

    const [gamesFound, setGamesFound] = useState<Game[]>([]);

    const handleGameNameChange = (name: string) => { setGameName(name); }
    const handlePublishersNameChange = (names: string[]) => { setPublishersName(names); }
    const handleDevelopersNameChange = (names: string[]) => { setDevelopersName(names); }
    const handleTagNamesChange = (names: string[]) => { setTagsName(names); }
    const handleCategoryNamesChange = (names: string[]) => { setCategoriesName(names); }
    const handlePlatformNamesChange = (names: string[]) => { setPlatformsName(names); }
    const handleGenreNamesChange = (names: string[]) => { setGenresName(names); }

    const handleReleaseDateBegChange = (date: Date) => { setReleaseDateBeg(date); }
    const handleReleaseDateEndChange = (date: Date) => { setReleaseDateEnd(date); }

    const handleSearch = () => {
        const filters: Filters = {
            name: gameName ? gameName : undefined,
            release_date: undefined,
            developer: developersName && developersName.length > 0 ? developersName : undefined,
            publisher: publishersName && publishersName.length > 0 ? publishersName : undefined,
            platforms: platformsName && platformsName.length > 0 ? platformsName : undefined,
            categories: categoriesName && categoriesName.length > 0 ? categoriesName : undefined,
            genres: genresName && genresName.length > 0 ? genresName : undefined,
            steamspy_tags: tagsName && tagsName.length > 0 ? tagsName : undefined,
            required_age: undefined,
            positive_rating_percent: undefined
        }
        fetch(`/api/games`, {
            method: "POST",
            body: JSON.stringify(filters),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((res) => res.json())
        .then((games: Game[]) => {
            setGamesFound(games);
            console.log(games);
        })
        .catch((e) => console.error(e));
    }

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
                <Grid item xs={12} className="button-container">
                    <Button variant="contained" color="primary" onClick={handleSearch}>Search</Button>
                </Grid>
                {/* <Grid item xs={12}>
                    <p>{gameName}</p>
                    {publishersName?.map((publisher: string) => ( <p>{publisher}</p> ))}
                    {tagsName?.map((tag: string) => ( <p>{tag}</p> ))}
                    {developersName?.map((developer: string) => ( <p>{developer}</p> ))}
                    {categoriesName?.map((category: string) => ( <p>{category}</p> ))}
                    {platformsName?.map((platform: string) => ( <p>{platform}</p> ))}
                    {genresName?.map((genre: string) => ( <p>{genre}</p> ))}
                </Grid> */}
            </Grid>
        </MuiPickersUtilsProvider>
	);
};

export default Search;