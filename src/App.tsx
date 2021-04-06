import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import DelayedLoader from "components/Layout/Loader/DelayedLoader";
import UserContext from "context/user/UserContext";
import { checkAuth } from "auth/Auth";
import Router from "router/Router";
import React from "react";

const userConfig = {
	authenticated: false,
	token: "",
};

const App = () => {
	const [user, setUser] = React.useState(userConfig);
	const [loading, setLoading] = React.useState(true);

	const theme = createMuiTheme({
		palette: {
			primary: {
				main: "#3A79FF",
			},
			secondary: {
				main: "#4bc57c"
			}
		},
	});

	React.useEffect(() => {
		let isAuthenticated = false;

		const fetchAuth = async () => {
			isAuthenticated = await checkAuth();
			setUser((user) => ({ ...user, authenticated: isAuthenticated }));
			setLoading(false);
		};

		fetchAuth();
	}, []);

	if (loading) {
		return <DelayedLoader fixed delay={500} />;
	}

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<MuiThemeProvider theme={theme}>
				<Router />
			</MuiThemeProvider>
		</UserContext.Provider>
	);
};

export default App;
