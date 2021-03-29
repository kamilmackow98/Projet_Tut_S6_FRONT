import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import React from "react";
import userContext from "./context/user/UserContext";
import Router from "./router/Router";

const userConfig = {
	authenticated: true,
};

const App = () => {
	const [user, setUser] = React.useState(userConfig);

	const theme = createMuiTheme({
		palette: {
			primary: {
				main: "#3A79FF",
			},
		},
	});

	return (
		<userContext.Provider value={{ user, setUser }}>
			<MuiThemeProvider theme={theme}>
				<Router />
			</MuiThemeProvider>
		</userContext.Provider>
	);
};

export default App;
