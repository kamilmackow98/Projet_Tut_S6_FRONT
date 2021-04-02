import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import userContext from "context/user/UserContext";
import Router from "router/Router";
import React from "react";

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
			secondary: {
				main: "#4bc57c"
			}
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
