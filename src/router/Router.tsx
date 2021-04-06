import AnotherNestedRoutes from "components/AnotherNestedRoutes";
import BasicLayout from "components/Layout/BasicLayout";
import GlobalLayout from "components/Layout/GlobalLayout";
import Login from "components/Login/Login";
import NestedRoutes from "components/NestedRoutes";
import NotFound from "components/NotFound";
import Protected from "components/Protected";
import PrivateRoute from "./PrivateRoute";
import Search from "components/Search/Search";
import GameInfo from "components/GameInfo/GameInfo";
import { Route, Switch } from "react-router-dom";
import React from "react";
import Recommended from "components/Game/Recommended";
import TestComponents from "components/TestComponents";
import Register from "../components/Register/Register";
import AuthRoute from "./AuthRoute";
import GamesLibrary from "components/Library/GamesLibrary";

const Router: React.FC = () => {
	return (
		<Switch>
			<Route
				exact
				path={[
					"/",
					"/protected",
					"/nested",
					"/nested/another-nested",
					"/recommended",
					"/components",
					"/library",
					"/game/:id"
				]}
			>
				<GlobalLayout>
					<Switch>
						<Route exact path="/" render={() => <Search />} />
						<PrivateRoute path="/protected" render={() => <Protected />} />
						<PrivateRoute path="/library" render={() => <GamesLibrary />} />
						<PrivateRoute path="/recommended" render={() => <Recommended />} />
						<Route
							path="/nested"
							render={({ match: { url } }) => (
								<>
									<Route
										exact
										path={`${url}/`}
										render={() => <NestedRoutes />}
									/>
									<Route
										path={`${url}/another-nested`}
										render={() => <AnotherNestedRoutes />}
									/>
								</>
							)}
						/>
						<Route path="/components" render={() => <TestComponents />} />
						<Route
							path="/game/:id"
							render={(routeProps) => <GameInfo id={Number(routeProps.match.params.id)} />}
						/>
					</Switch>
				</GlobalLayout>
			</Route>

			<Route path={["/login", "/register"]}>
				<BasicLayout>
					<Switch>
						<AuthRoute path="/login" render={() => <Login />} />
						<AuthRoute path="/register" render={() => <Register />} />
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
