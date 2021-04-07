import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MenuIcon from "@material-ui/icons/Menu";
import AppsIcon from "@material-ui/icons/Apps";
import NoGamesFound from "components/Search/NoGamesFound/NoGamesFound";
import CardsTable from "components/Search/CardsTable/CardsTable";
import GameList from "components/Game/List/GameList";
import React, { MouseEvent, useContext, useState } from "react";
import { useStyles } from "./RecommendedGames.styles";
import UserContext from "context/user/UserContext";
import Cookies from "js-cookie";
import { Game } from "types";

const RecommendedGames: React.FC = () => {
	const classes = useStyles();

	const { user } = useContext(UserContext);
	const [games, setGames] = useState<Game[]>([]);
	const [displayAsGrid, setDisplayAsGrid] = useState<boolean>(true);

	const menuIconBtnColor = !displayAsGrid ? "secondary" : "inherit";
	const gridIconBtnColor = displayAsGrid ? "secondary" : "inherit";

	const showGrid = (displayAsGrid: boolean) => (event: MouseEvent) => {
		setDisplayAsGrid(displayAsGrid);
	};

	React.useEffect(() => {
		if (user.isAuthenticated) {
			const token: string | undefined = Cookies.get("token");
			fetch(`/api/games/recommended`, {
				method: "GET",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					Authorization: token ? token : "",
				},
			})
				.then((response) => response.json())
				.then((response: Game[]) => {
					setGames(response);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [user.isAuthenticated]);

	const hasGames = games.length > 0;
	const displayGames = displayAsGrid ? (
		<CardsTable games={games} />
	) : (
		<GameList spacing={2} data={games} />
	);

	return (
		<Container fixed disableGutters>
			<Grid container justify="center">
				<Grid item xs={12}>
					<Typography className={classes.title} paragraph variant="h6">
						Recommended for you
					</Typography>
				</Grid>
				<Grid item className={classes.iconButtons} xs={12}>
					<IconButton onClick={showGrid(false)}>
						<MenuIcon color={menuIconBtnColor} />
					</IconButton>
					<IconButton onClick={showGrid(true)}>
						<AppsIcon color={gridIconBtnColor} />
					</IconButton>
				</Grid>
			</Grid>
			<Grid container justify="center">
				{hasGames ? displayGames : <NoGamesFound />}
			</Grid>
		</Container>
	);
};

export default RecommendedGames;
