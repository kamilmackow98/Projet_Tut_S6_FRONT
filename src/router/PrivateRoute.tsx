import DelayedLoader from "components/Layout/Loader/DelayedLoader";
import { Redirect, Route } from "react-router-dom";
import React, { ComponentType } from "react";
import { checkAuth } from "auth/Auth";

interface Props {
	path: string;
	render: ComponentType<any>;
}

const PrivateRoute: React.FC<Props> = ({ path, render: Component }) => {
	const [isAuthenticated, setIsAuthenticated] = React.useState(false);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		async function fetchAuth() {
			const response = await checkAuth();

			setIsAuthenticated(response);
			setLoading(false);
		}

		fetchAuth();
	}, []);

	if (loading) {
		return <DelayedLoader fixed delay={300} />;
	}

	return (
		<Route
			path={path}
			render={(props) =>
				isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
			}
		/>
	);
};

export default PrivateRoute;
