import { useState } from "react";
import { TextField, Grid, Button, Accordion, AccordionSummary, AccordionDetails, IconButton } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import AutocompleteDeveloperName from "./Autocomplete/AutocompleteDeveloperName";
import AutocompleteGameName from './Autocomplete/AutocompleteGameName';
import AutocompletePublisherName from "./Autocomplete/AutocompletePublisherName";
import AutocompleteTagName from "./Autocomplete/AutocompleteTagName";
import SelectPlaftormName from "./Select/SelectPlatformName";
import SelectCategoryName from "./Select/SelectCategoryName";
import SelectGenreName from "./Select/SelectGenreName";
import DateFnsUtils from '@date-io/date-fns';
import { Game, Filters, DateFilter, RatingFilter } from "types";
import { useStyles } from "./Search.styles";
import CustomTable from "components/Layout/Table/Table";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';

const Search = () => {
    const classes = useStyles();

    const [gameName, setGameName] = useState("");
    const [publishersName, setPublishersName] = useState<string[]>([]);
    const [developersName, setDevelopersName] = useState<string[]>([]);
    const [tagsName, setTagsName] = useState<string[]>([]);
    const [categoriesName, setCategoriesName] = useState<string[]>([]);
    const [platformsName, setPlatformsName] = useState<string[]>([]);
    const [genresName, setGenresName] = useState<string[]>([]);

    const [releaseDateBeg, setReleaseDateBeg] = useState<Date | undefined>(undefined);
    const [releaseDateEnd, setReleaseDateEnd] = useState<Date | undefined>(undefined);
    const [requiredAge, setRequiredAge] = useState<number | undefined>(undefined);
    const [minimumPositiveReviews, setMinimumPositiveReviews] = useState<number | undefined>(undefined);

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
        const releaseDateFilter: DateFilter | undefined = releaseDateBeg || releaseDateEnd ? {
            gte: releaseDateBeg ? releaseDateBeg : undefined,
            lt: releaseDateEnd ? releaseDateEnd : undefined
        } : undefined;

        const ratingFilter: RatingFilter | undefined = minimumPositiveReviews ? {
            gte: minimumPositiveReviews
        } : undefined;

        const filters: Filters = {
            name: gameName ? gameName : undefined,
            release_date: releaseDateFilter,
            developer: developersName && developersName.length > 0 ? developersName : undefined,
            publisher: publishersName && publishersName.length > 0 ? publishersName : undefined,
            platforms: platformsName && platformsName.length > 0 ? platformsName : undefined,
            categories: categoriesName && categoriesName.length > 0 ? categoriesName : undefined,
            genres: genresName && genresName.length > 0 ? genresName : undefined,
            steamspy_tags: tagsName && tagsName.length > 0 ? tagsName : undefined,
            required_age: requiredAge ? [requiredAge] : undefined, // TO DO : allow to select mutliple specific requiredAges
            positive_rating_percent: ratingFilter
        };

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
        })
        .catch((e) => { 
            console.error(e); 
            setGamesFound([]);
        });
    }

	return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon  />}>
                            <Grid 
                                item 
                                xs={10}
                                sm={10}
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()} 
                            >
                                <AutocompleteGameName onChangeName={(name: string) => handleGameNameChange(name)} />
                            </Grid>
                            <Grid 
                                item 
                                className={classes.buttonContainer}
                                xs={1}
                                sm={2}
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()} 
                            >
                                <Button onClick={handleSearch} variant="contained" color="secondary">
                                    <SearchIcon />
                                </Button>
                            </Grid>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <AutocompletePublisherName onChangePublishers={(names: string[]) => handlePublishersNameChange(names)} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <AutocompleteDeveloperName onChangeDevelopers={(names: string[]) => handleDevelopersNameChange(names)} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <AutocompleteTagName onChangeTags={(names: string[]) => handleTagNamesChange(names)} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <SelectCategoryName onChangeCategories={(names: string[]) => handleCategoryNamesChange(names)} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <SelectPlaftormName onChangePlatforms={(names: string[]) => handlePlatformNamesChange(names)} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <SelectGenreName onChangeGenres={(names: string[]) => handleGenreNamesChange(names)} />
                                </Grid>
                                <Grid item xs={12} sm={12} className={classes.removeBottomSpace}>
                                    <hr style={{ color: 'lightGrey' }} className={classes.removeBottomSpace} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <KeyboardDatePicker
                                        className={`${classes.removeBottomSpace} ${classes.datepickerInput}`}
                                        margin="normal"
                                        size="small" 
                                        inputVariant="outlined"
                                        value={releaseDateBeg}
                                        label="Release date from"
                                        format="MM/dd/yyyy"
                                        onChange={(date) => handleReleaseDateBegChange(date as Date)}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <KeyboardDatePicker
                                        size="small" 
                                        className={`${classes.removeBottomSpace} ${classes.datepickerInput}`}
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
                                <Grid item xs={12} sm={4} />
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        size="small" 
                                        className={`${classes.textfieldInput} ${classes.datepickerInput}`}
                                        label="Required minimum age"
                                        type="number"
                                        onChange={(event) => { setRequiredAge(Number(event.target.value)) }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        size="small" 
                                        className={classes.textfieldInput}
                                        label="Minimum positive reviews"
                                        type="number"
                                        onChange={(event) => { setMinimumPositiveReviews(Number(event.target.value)) }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} />
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                
                <Grid item xs={12} sm={12}>
                    { gamesFound && gamesFound.length > 0 
                        ? <CustomTable data={gamesFound} />
                        : <p>Aucun jeu n'a été trouvé.</p>
                    }
                </Grid>
            </Grid>
        </MuiPickersUtilsProvider>
	);
};

export default Search;