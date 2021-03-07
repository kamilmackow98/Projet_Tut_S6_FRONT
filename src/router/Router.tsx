import React from "react";
import { Route, Switch } from "react-router-dom";
import AnotherNestedRoutes from "../components/AnotherNestedRoutes";
import BasicLayout from "../components/Layout/BasicLayout";
import GlobalLayout from "../components/Layout/GlobalLayout";
import Login from "../components/Login/Login";
import Main from "../components/Main";
import NestedRoutes from "../components/NestedRoutes";
import NotFound from "../components/NotFound";
import Protected from "../components/Protected";
import PrivateRoute from "./PrivateRoute";

const Router = () => {
	return (
		<Switch>
			<Route exact path={["/", "/protected", "/nested", "/nested/another-nested"]}>
				<GlobalLayout>
					<Switch>
						<Route exact path="/" render={() => <Main />} />
						<PrivateRoute path="/protected" render={() => <Protected />} />
						<Route
							path="/nested"
							render={({ match: { url } }) => (
								<>
									<Route exact path={`${url}/`} render={() => <NestedRoutes />} />
									<Route path={`${url}/another-nested`} render={() => <AnotherNestedRoutes />} />
								</>
							)}
						/>
					</Switch>
				</GlobalLayout>
			</Route>

			<Route path={["/login"]}>
				<BasicLayout>
					<Switch>
						<Route path="/login" render={() => <Login />} />
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
