import userContext from "../context/user/UserContext";
import { Redirect, Route } from "react-router-dom";
import React, { ComponentType } from "react";

interface Props {
	path: string;
	render: ComponentType<any>;
}

const PrivateRoute: React.FC<Props> = ({ path, render: Component }) => {
	const { user } = React.useContext(userContext);

	const authenticated: boolean = user!.authenticated;

	return (
		<Route
			path={path}
			render={(props) =>
				authenticated ? <Component {...props} /> : <Redirect to="/login" />
			}
		/>
	);
};

export default PrivateRoute;
