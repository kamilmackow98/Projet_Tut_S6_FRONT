import { useEffect, useState } from "react";
import { TextField, Grid, Button, Accordion, AccordionSummary, AccordionDetails, IconButton, Switch } from "@material-ui/core";
import AutocompleteDeveloperName from "./Autocomplete/AutocompleteDeveloperName";
import AutocompleteGameName from './Autocomplete/AutocompleteGameName';
import AutocompletePublisherName from "./Autocomplete/AutocompletePublisherName";
import AutocompleteTagName from "./Autocomplete/AutocompleteTagName";
import SelectPlaftormName from "./Select/SelectPlatformName";
import SelectCategoryName from "./Select/SelectCategoryName";
import SelectGenreName from "./Select/SelectGenreName";
import SelectAge from "./Select/SelectAge";
import ReleaseDatePickerFull from './ReleaseDatePicker/ReleaseDatePickerFull';
import { Game, Filters, DateFilter, GameSearchResult, SortByFilter } from "types";
import { useStyles } from "./Search.styles";
import CustomTable from "components/Layout/Table/Table";
import SortBy from "components/Layout/SortBy/SortBy";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';
import AppsIcon from '@material-ui/icons/Apps';
import MenuIcon from '@material-ui/icons/Menu';
import CardsTable from "./CardsTable/CardsTable";
import { Pagination } from "@material-ui/lab";
import NoGamesFound from "./NoGamesFound/NoGamesFound";
import ReleaseYearPicker from "./ReleaseDatePicker/ReleaseYearPicker";
import { filter } from "lodash";

const Search = () => {
    const classes = useStyles();

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
    
    const [minimumPositiveReviews, setMinimumPositiveReviews] = useState<number | undefined>(undefined);

    const [totalNumberOfPages, setTotalNumberOfPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [gamesFound, setGamesFound] = useState<Game[]>([]);

    const [displayAsGrid, setDisplayAsGrid] = useState<boolean>(true);
    const [isDateInYear, setDateInYear] = useState<boolean>(false);

    const [filters, setFilters] = useState<Filters>(undefined);
    const [sortByFilter, setSortByFilter] = useState<SortByFilter>({ sortBy: 'release_date', isASC: true });
    
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
            sort: sortByFilter? sortByFilter : undefined
        };

        setFilters(newFilters);

        fetch(`/api/games`, {
            method: "POST",
            body: JSON.stringify(newFilters),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((res) => res.json())
        .then((resJson: GameSearchResult) => {
            resJson.games.forEach((game: Game) => { game.release_date = new Date(game.release_date)})
            setGamesFound(resJson.games);
            setTotalNumberOfPages(resJson.numberOfPages);
            setCurrentPage(Number(resJson.currentPage));
        })
        .catch((e) => { 
            console.error(e); 
            setGamesFound([]);
        });
    };

    const handleFilter = (newSortByFilter: SortByFilter) => {
    
        const newFilters = { ...filters, sort: newSortByFilter };
        setFilters(newFilters);
        setSortByFilter(newSortByFilter);

        fetch(`/api/games`, {
            method: "POST",
            body: JSON.stringify(newFilters),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((res) => res.json())
        .then((resJson: GameSearchResult) => {
            resJson.games.forEach((game: Game) => { game.release_date = new Date(game.release_date)})
            setGamesFound(resJson.games);
            setTotalNumberOfPages(resJson.numberOfPages);
            setCurrentPage(Number(resJson.currentPage));
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
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((res) => res.json())
        .then((resJson: GameSearchResult) => {
            resJson.games.forEach((game: Game) => { game.release_date = new Date(game.release_date)})
            setGamesFound(resJson.games);
            setTotalNumberOfPages(resJson.numberOfPages);
            setCurrentPage(Number(resJson.currentPage));
        })
        .catch((e) => { 
            console.error(e); 
            setGamesFound([]);
        });
    }

    useEffect(() => {
        fetch(`/api/games`, {
            method: "POST",
            body: JSON.stringify({}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((res) => res.json())
        .then((resJson: GameSearchResult) => {
            resJson.games.forEach((game: Game) => { game.release_date = new Date(game.release_date)})
            setGamesFound(resJson.games);
            setTotalNumberOfPages(resJson.numberOfPages);
            setCurrentPage(Number(resJson.currentPage));
        })
        .catch((e) => { 
            console.error(e); 
            setGamesFound([]);
        });
    }, []);

	return (
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
                            {
                                !isDateInYear 
                                ?   <ReleaseDatePickerFull 
                                        onChangeDateBeg={(date: Date) => { setReleaseDateBeg(date)}}
                                        onChangeDateEnd={(date: Date) => {setReleaseDateEnd(date)}}
                                    /> 
                                :   <ReleaseYearPicker 
                                        onChangeDateBeg={(year: string) => { setReleaseDateBeg(year)}}
                                        onChangeDateEnd={(year: string) => { setReleaseDateEnd(year)}}
                                    />
                            }
                            <Grid item xs={12} sm={4} className={classes.gridSwitchDateContainer}> 
                                <Grid item style={{ marginTop: "8px" }}>Year</Grid>
                                <Grid item>
                                    <Switch
                                        checked={!isDateInYear} 
                                        onChange={() => { setDateInYear(!isDateInYear)}}
                                        value="checked"
                                    />
                                </Grid>
                                <Grid item style={{ marginTop: "8px" }}>Full date</Grid>
                            </Grid> 
                            <Grid item xs={12} sm={4}>
                                <SelectAge onChangeAges={(ages: number[]) => handleAgesChange(ages)} />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    size="small" 
                                    className={classes.textfieldInput}
                                    label="Min. (+) reviews (%)"
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
            
            <Grid container justify="center">
                <Grid item xs={12} sm={12} className={classes.gridButtonContainer}>
                    <SortBy onFilterChange={(sortByFilter: SortByFilter) => handleFilter(sortByFilter)} />
                    <IconButton onClick={() => {setDisplayAsGrid(false)}}>
                        <MenuIcon color={menuIconBtnColor}/>
                    </IconButton>
                    <IconButton onClick={() => {setDisplayAsGrid(true)}}>
                        <AppsIcon color={gridIconBtnColor} />
                    </IconButton>
                </Grid>
                <Grid item xs={11} sm={12} className={classes.gridGamesFoundContainer}>
                    { 
                        gamesFound && gamesFound.length > 0 
                        ? !displayAsGrid ? <CustomTable data={gamesFound} /> : <CardsTable games={gamesFound} />
                        : <NoGamesFound />
                    }
                </Grid>
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
	);
};

export default Search;