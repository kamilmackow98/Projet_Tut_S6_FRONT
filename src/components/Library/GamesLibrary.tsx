import React, { useEffect, useState } from "react"
import UserContext from "context/user/UserContext";
import { APIErrorMessage, Game, Library } from "types";
import Cookies from "js-cookie";
import { Grid, IconButton } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import NoGamesFound from "components/Search/NoGamesFound/NoGamesFound";
import CardsTable from "components/Search/CardsTable/CardsTable";
import GameList from "components/Game/List/GameList";
import AppsIcon from '@material-ui/icons/Apps';
import MenuIcon from '@material-ui/icons/Menu';
import { useStyles } from "../Search/Search.styles";

const GamesLibrary: React.FC = () => {

    const classes = useStyles();
    const { user } = React.useContext(UserContext);
    const [games, setGames] = useState<Game[] | []>([]);
    const [gameIds, setGameIds] = useState<number[] | []>([]);
    const [displayAsGrid, setDisplayAsGrid] = useState<boolean>(true);

    const menuIconBtnColor = !displayAsGrid ? 'secondary' : 'inherit';
    const gridIconBtnColor = displayAsGrid ? 'secondary' : 'inherit';

    const [totalNumberOfPages, setTotalNumberOfPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    
    useEffect(() => {
        if (user.isAuthenticated) {
            const token: string | undefined = Cookies.get('token');
            fetch(`/api/user/library`, {
                method: 'GET',
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": token ? token : ""
                }
            })
                .then(r =>  r.json().then(data => ({status: r.status, body: data})))
                .then((obj) => {
                    if (obj.status === 200) {
                        const ids: number[] = [];
                        (obj.body as Library).library.forEach((gameId: number) => ids.push(gameId));
                        setGameIds(ids);
                        setTotalNumberOfPages(Math.ceil(ids.length / 10));
                        fetchGames(ids.slice(0, 10));
                    } else {
                        throw new Error((obj.body as APIErrorMessage).message);
                    }
                }).catch((error) => {
                    console.error(error);
                });
        }
    }, [user.isAuthenticated]);

    const fetchGames = (ids: number[]) => {
        if (ids.length > 0) {
            Promise.all(
                ids.map((id: number): Promise<Game | void> =>
                    fetch(`/api/game/${id}`)
                        .then(r =>  r.json().then(data => ({status: r.status, body: data})))
                        .then((obj) => {
                            if (obj.status === 200) return (obj.body as Game)
                            else throw new Error((obj.body as APIErrorMessage).message);
                        })
                        .catch((e) => console.error(e))
                )
            )
                .then((games: (Game | void)[]) => {
                    // Get rid of null / undefined items
                    const libraryGames: (Game | void)[] = games.filter((game: Game | void) => game);
                    setGames(libraryGames as Game[]);
                })
                .catch((e) => console.error(e));
        }
    };

    const handlePaginationClick = (value: number) => {
        setCurrentPage(value);
        fetchGames(gameIds.slice((value - 1) * 10, value * 10));
    };

    return (
        <Grid container justify="center">
            <Grid item xs={12}>
                <h1 className={classes.libraryTitle}>My Library</h1>
            </Grid>
            <Grid item xs={12} sm={12} className={classes.gridButtonContainer}>
                <IconButton onClick={() => {setDisplayAsGrid(false)}}>
                    <MenuIcon color={menuIconBtnColor}/>
                </IconButton>
                <IconButton onClick={() => {setDisplayAsGrid(true)}}>
                    <AppsIcon color={gridIconBtnColor} />
                </IconButton>
            </Grid>
            { 
                games && games.length > 0 
                ? !displayAsGrid ? 
                <Grid item xs={12} sm={8} md={12}>
                    <GameList spacing={2} data={games} />
                </Grid> 
                : 
                <Grid item xs={12}>
                    <CardsTable games={games} />
                </Grid>
                : 
                <Grid item xs={12}>
                    <NoGamesFound />
                    <h3 className={classes.noGamesFoundContainer}>We could show you suggestions based on your library !</h3>
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
    )
}

export default GamesLibrary;
