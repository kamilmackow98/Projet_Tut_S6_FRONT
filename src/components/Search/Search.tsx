import { useEffect, useState } from "react";
import { TextField, Grid, Button, Accordion, AccordionSummary, AccordionDetails, IconButton, Switch, FormControlLabel, Checkbox } from "@material-ui/core";
import AutocompleteDeveloperName from "./Autocomplete/AutocompleteDeveloperName";
import AutocompleteGameName from './Autocomplete/AutocompleteGameName';
import AutocompletePublisherName from "./Autocomplete/AutocompletePublisherName";
import AutocompleteTagName from "./Autocomplete/AutocompleteTagName";
import SelectPlaftormName from "./Select/SelectPlatformName";
import SelectCategoryName from "./Select/SelectCategoryName";
import SelectGenreName from "./Select/SelectGenreName";
import SelectAge from "./Select/SelectAge";
import ReleaseDatePickerFull from './ReleaseDatePicker/ReleaseDatePickerFull';
import { Game, Filters, DateFilter, GameSearchResult, SortFilter, APIErrorMessage } from "types";
import { useStyles } from "./Search.styles";
import SortBy from "components/Layout/SortBy/SortBy";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';
import AppsIcon from '@material-ui/icons/Apps';
import MenuIcon from '@material-ui/icons/Menu';
import CardsTable from "./CardsTable/CardsTable";
import { Pagination } from "@material-ui/lab";
import NoGamesFound from "./NoGamesFound/NoGamesFound";
import ReleaseYearPicker from "./ReleaseDatePicker/ReleaseYearPicker";
import GameList from "components/Game/List/GameList";
import Cookies from "js-cookie";
import UserContext from "context/user/UserContext";
import React from "react";

const Search = () => {
    const classes = useStyles();
    const { user } = React.useContext(UserContext);

    const [token, setToken] = useState<string | undefined>();
    const [gameName, setGameName] = useState("");
    const [publishersName, setPublishersName] = useState<string[]>([]);
    const [developersName, setDevelopersName] = useState<string[]>([]);
    const [tagsName, setTagsName] = useState<string[]>([]);
    const [categoriesName, setCategoriesName] = useState<string[]>([]);
    const [platformsName, setPlatformsName] = useState<string[]>([]);
    const [genresName, setGenresName] = useState<string[]>([]);
    const [requiredAges, setRequiredAges] = useState<number[] | undefined>(undefined);

    const [releaseDateBeg, setReleaseDateBeg] = useState<Date | string | undefined>(undefined);
    const [releaseDateEnd, setReleaseDateEnd] = useState<Date | string | undefined>(undefined);
    
    const [minimumPositiveReviews, setMinimumPositiveReviews] = useState<number | null>(0);

    const [onlyShowItemsFromLibrary, setOnlyShowItemsFromLibrary] = useState<boolean>(false);

    const [totalNumberOfPages, setTotalNumberOfPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [gamesFound, setGamesFound] = useState<Game[]>([]);

    const [displayAsGrid, setDisplayAsGrid] = useState<boolean>(true);
    const [isDateInYear, setDateInYear] = useState<boolean>(false);

    const [filters, setFilters] = useState<Filters | undefined>(undefined);
    const [sortByFilter, setSortByFilter] = useState<SortFilter>({ sortBy: 'release_date', isASC: false });

    const [mustClear, setMustClear] = useState<boolean>(false);
    
    const menuIconBtnColor = !displayAsGrid ? 'secondary' : 'inherit';
    const gridIconBtnColor = displayAsGrid ? 'secondary' : 'inherit';

    const handleGameNameChange = (name: string) => { setGameName(name); }
    const handlePublishersNameChange = (names: string[]) => { setPublishersName(names); }
    const handleDevelopersNameChange = (names: string[]) => { setDevelopersName(names); }
    const handleTagNamesChange = (names: string[]) => { setTagsName(names); }
    const handleCategoryNamesChange = (names: string[]) => { setCategoriesName(names); }
    const handlePlatformNamesChange = (names: string[]) => { setPlatformsName(names); }
    const handleGenreNamesChange = (names: string[]) => { setGenresName(names); }
    const handleAgesChange = (ages: number[]) => { setRequiredAges(ages); }

    const handleSearch = () => {
        const releaseDateFilter: DateFilter | undefined = releaseDateBeg || releaseDateEnd ? {
            gte: releaseDateBeg ? releaseDateBeg : undefined,
            lt: releaseDateEnd ? releaseDateEnd : undefined
        } : undefined;

        const ratingFilter: number | undefined = minimumPositiveReviews ? minimumPositiveReviews : undefined;

        const newFilters: Filters = {
            name: gameName ? gameName : undefined,
            release_date: releaseDateFilter,
            developer: developersName && developersName.length > 0 ? developersName : undefined,
            publisher: publishersName && publishersName.length > 0 ? publishersName : undefined,
            platforms: platformsName && platformsName.length > 0 ? platformsName : undefined,
            categories: categoriesName && categoriesName.length > 0 ? categoriesName : undefined,
            genres: genresName && genresName.length > 0 ? genresName : undefined,
            steamspy_tags: tagsName && tagsName.length > 0 ? tagsName : undefined,
            required_age: requiredAges ? requiredAges : undefined,
            positive_rating_percent: ratingFilter,
            sort: sortByFilter? sortByFilter : undefined,
            library: onlyShowItemsFromLibrary
        };

        setFilters(newFilters);
        const token: string | undefined = Cookies.get('token');
        fetch(`/api/games`, {
            method: "POST",
            body: JSON.stringify(newFilters),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": token ? token : ""
            }
        })
        .then(r =>  r.json().then(data => ({status: r.status, body: data})))
		.then((obj) => {
            if (obj.status === 200) {
                (obj.body as GameSearchResult).games.forEach((game: Game) => { game.release_date = new Date(game.release_date)})
                setGamesFound((obj.body as GameSearchResult).games);
                setTotalNumberOfPages((obj.body as GameSearchResult).numberOfPages);
                setCurrentPage(Number((obj.body as GameSearchResult).currentPage));
            } else {
                throw new Error((obj.body as APIErrorMessage).message);
            }
        })
        .catch((e) => { 
            console.error(e); 
            setGamesFound([]);
        });
    };

    const handleFilter = (newSortByFilter: SortFilter) => {
        const newFilters = { ...filters, sort: newSortByFilter };
        setFilters(newFilters);
        setSortByFilter(newSortByFilter);

        fetch(`/api/games`, {
            method: "POST",
            body: JSON.stringify(newFilters),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": token ? token : ""
            }
        })
        .then(r =>  r.json().then(data => ({status: r.status, body: data})))
		.then((obj) => {
            if (obj.status === 200) {
                (obj.body as GameSearchResult).games.forEach((game: Game) => { game.release_date = new Date(game.release_date)})
                setGamesFound((obj.body as GameSearchResult).games);
                setTotalNumberOfPages((obj.body as GameSearchResult).numberOfPages);
                setCurrentPage(Number((obj.body as GameSearchResult).currentPage));
            } else {
                throw new Error((obj.body as APIErrorMessage).message);
            }
        })
        .catch((e) => { 
            console.error(e); 
            setGamesFound([]);
        });
    } 

    const handlePaginationClick = (page: number) => {
        fetch(`/api/games?page=${page}`, {
            method: "POST",
            body: JSON.stringify(filters),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": token ? token : ""
            }
        })
        .then(r =>  r.json().then(data => ({status: r.status, body: data})))
		.then((obj) => {
            if (obj.status === 200) {
                (obj.body as GameSearchResult).games.forEach((game: Game) => { game.release_date = new Date(game.release_date)})
                setGamesFound((obj.body as GameSearchResult).games);
                setTotalNumberOfPages((obj.body as GameSearchResult).numberOfPages);
                setCurrentPage(Number((obj.body as GameSearchResult).currentPage));
            } else {
                throw new Error((obj.body as APIErrorMessage).message);
            }
        })
        .catch((e) => { 
            console.error(e); 
            setGamesFound([]);
        });
    };

    const clearForm = () => {
        // Triggers a state change in the components that will clear them
        setMustClear(true);
        setMinimumPositiveReviews(0);
        setTimeout(() => {
            setMustClear(false);
        }, 1000);
    };

    useEffect(() => {
        setToken(Cookies.get('token'));
        fetch(`/api/games`, {
            method: "POST",
            body: JSON.stringify({}),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": token ? token : ""
            }
        })
        .then(r =>  r.json().then(data => ({status: r.status, body: data})))
		.then((obj) => {
            if (obj.status === 200) {
                (obj.body as GameSearchResult).games.forEach((game: Game) => { game.release_date = new Date(game.release_date)})
                setGamesFound((obj.body as GameSearchResult).games);
                setTotalNumberOfPages((obj.body as GameSearchResult).numberOfPages);
                setCurrentPage(Number((obj.body as GameSearchResult).currentPage));
            } else {
                throw new Error((obj.body as APIErrorMessage).message);
            }
        })
        .catch((e) => { 
            console.error(e); 
            setGamesFound([]);
        });
    }, [token]);

	return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon  />}>
                        <Grid container>
                            <Grid 
                                item 
                                xs={10}
                                sm={10}
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()} 
                            >
                                <AutocompleteGameName mustClear={mustClear} onChangeName={(name: string) => handleGameNameChange(name)} />
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
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <AutocompletePublisherName mustClear={mustClear} onChangePublishers={(names: string[]) => handlePublishersNameChange(names)} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <AutocompleteDeveloperName mustClear={mustClear} onChangeDevelopers={(names: string[]) => handleDevelopersNameChange(names)} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <AutocompleteTagName mustClear={mustClear} onChangeTags={(names: string[]) => handleTagNamesChange(names)} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <SelectCategoryName mustClear={mustClear} onChangeCategories={(names: string[]) => handleCategoryNamesChange(names)} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <SelectPlaftormName mustClear={mustClear} onChangePlatforms={(names: string[]) => handlePlatformNamesChange(names)} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <SelectGenreName mustClear={mustClear} onChangeGenres={(names: string[]) => handleGenreNamesChange(names)} />
                            </Grid>
                            <Grid item xs={12} sm={12} className={classes.removeBottomSpace}>
                                <hr style={{ color: 'lightGrey' }} className={classes.removeBottomSpace} />
                            </Grid>
                            {
                                !isDateInYear 
                                ?   <ReleaseDatePickerFull 
                                        mustClear={mustClear}
                                        onChangeDateBeg={(date: Date) => { setReleaseDateBeg(date)}}
                                        onChangeDateEnd={(date: Date) => {setReleaseDateEnd(date)}}
                                    /> 
                                :   <ReleaseYearPicker 
                                        mustClear={mustClear}
                                        onChangeDateBeg={(year: string) => { setReleaseDateBeg(year)}}
                                        onChangeDateEnd={(year: string) => { setReleaseDateEnd(year)}}
                                    />
                            }
                            <Grid item xs={12} sm={4} className={classes.gridSwitchDateContainer}> 
                                <Grid item style={{ marginTop: "8px" }}>Year</Grid>
                                <Grid item>
                                    <Switch
                                        checked={!isDateInYear} 
                                        onChange={() => { 
                                            setDateInYear(!isDateInYear);
                                            setReleaseDateBeg(undefined);
                                            setReleaseDateEnd(undefined);
                                        }}
                                        value="checked"
                                    />
                                </Grid>
                                <Grid item style={{ marginTop: "8px" }}>Full date</Grid>
                            </Grid> 
                            <Grid item xs={12} sm={4}>
                                <SelectAge mustClear={mustClear} onChangeAges={(ages: number[]) => handleAgesChange(ages)} />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    size="small" 
                                    className={classes.textfieldInput}
                                    label="Min. (+) reviews (%)"
                                    type="number"
                                    value={minimumPositiveReviews}
                                    onChange={(event) => { setMinimumPositiveReviews(Number(event.target.value)) }}
                                    variant="outlined"
                                    InputProps={{ inputProps: { min: 0, max: 100 } }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                { 
                                    user.isAuthenticated &&
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={onlyShowItemsFromLibrary}
                                                onChange={() => { setOnlyShowItemsFromLibrary(!onlyShowItemsFromLibrary) }}
                                                color="secondary"
                                            />
                                        }
                                        label="Only show items from my library"
                                    />
                                }
                                
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>

            <Grid item xs={12}>
                <Grid container justify="center">
                    <Grid item xs={12} sm={12} className={classes.gridButtonContainer}>
                        <Button className={classes.clearFormButton} onClick={clearForm}>CLEAR FORM</Button>
                    </Grid>

                    <Grid item xs={12} sm={12} className={classes.gridButtonContainer}>
                        <SortBy onFilterChange={(sortByFilter: SortFilter) => handleFilter(sortByFilter)} />
                        <IconButton className={classes.iconButtons} onClick={() => {setDisplayAsGrid(false)}}>
                            <MenuIcon color={menuIconBtnColor}/>
                        </IconButton>
                        <IconButton className={classes.iconButtons} onClick={() => {setDisplayAsGrid(true)}}>
                            <AppsIcon color={gridIconBtnColor} />
                        </IconButton>
                    </Grid>
                    { 
                        gamesFound && gamesFound.length > 0 
                        ? !displayAsGrid ? 
                        <Grid item xs={12} sm={8} md={12}>
                            <GameList spacing={2} data={gamesFound} />
                        </Grid> 
                        : 
                        <Grid item xs={12}>
                            <CardsTable games={gamesFound} />
                        </Grid>
                        : 
                        <Grid item xs={12}>
                            <NoGamesFound />
                        </Grid>
                    }
                    <Grid item xs={12} sm={12} className={classes.paginationContainer}>
                        <Pagination 
                            count={totalNumberOfPages} 
                            page={currentPage}
                            siblingCount={0} 
                            color="secondary" 
                            variant="outlined" 
                            onChange={(event, value) => { handlePaginationClick(value) }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
	);
};

export default Search;