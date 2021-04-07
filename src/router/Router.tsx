import BasicLayout from "components/Layout/BasicLayout";
import GlobalLayout from "components/Layout/GlobalLayout";
import Login from "components/Login/Login";
import NotFound from "components/NotFound";
import PrivateRoute from "./PrivateRoute";
import Search from "components/Search/Search";
import GameInfo from "components/GameInfo/GameInfo";
import { Route, Switch } from "react-router-dom";
import React from "react";
import Register from "../components/Register/Register";
import PublicOnlyRoute from "./PublicOnlyRoute";
import GamesLibrary from "components/Library/GamesLibrary";
import RecommendedGames from "components/Recommended/RecommendedGames";

const Router: React.FC = () => {
	return (
		<Switch>
			<Route
				exact
				path={["/", "/recommended", "/library", "/game/:id"]}
			>
				<GlobalLayout>
					<Switch>
						<Route exact path="/" render={() => <Search />} />
						<PrivateRoute path="/library" render={() => <GamesLibrary />} />
						<PrivateRoute
							path="/recommended"
							render={() => <RecommendedGames />}
						/>
						<Route
							path="/game/:id"
							render={(routeProps) => (
								<GameInfo id={Number(routeProps.match.params.id)} />
							)}
						/>
					</Switch>
				</GlobalLayout>
			</Route>

			<Route path={["/login", "/register"]}>
				<BasicLayout>
					<Switch>
						<PublicOnlyRoute path="/login" render={() => <Login />} />
						<PublicOnlyRoute path="/register" render={() => <Register />} />
					</Switch>
				</BasicLayout>
			</Route>

			<GlobalLayout>
				<Route component={NotFound} />
			</GlobalLayout>
		</Switch>
	);
};

export default Router;
