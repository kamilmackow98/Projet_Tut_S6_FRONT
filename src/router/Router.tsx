import AnotherNestedRoutes from "components/AnotherNestedRoutes";
import BasicLayout from "components/Layout/BasicLayout";
import GlobalLayout from "components/Layout/GlobalLayout";
import Login from "components/Login/Login";
import Main from "components/Main";
import NestedRoutes from "components/NestedRoutes";
import NotFound from "components/NotFound";
import Protected from "components/Protected";
import TestComponents from "components/TestComponents";
import PrivateRoute from "./PrivateRoute";
import { Route, Switch } from "react-router-dom";
import React from "react";
import Register from "../components/Register/Register";

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
					"/components",
				]}
			>
				<GlobalLayout>
					<Switch>
						<Route exact path="/" render={() => <Main />} />
						<PrivateRoute path="/protected" render={() => <Protected />} />
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
					</Switch>
				</GlobalLayout>
			</Route>

			<Route path={["/login", "/register"]}>
				<BasicLayout>
					<Switch>
						<Route path="/login" render={() => <Login />} />
						<Route path="/register" render={() => <Register />} />
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
