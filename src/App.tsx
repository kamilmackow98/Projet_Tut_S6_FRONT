import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import userContext from "context/user/UserContext";
import Router from "router/Router";
import React from "react";
// import { useLocation } from "react-router-dom";

const userConfig = {
	authenticated: false,
	token: ''
};

const App = () => {
	const [user, setUser] = React.useState(userConfig);
	// const location = useLocation();

	const theme = createMuiTheme({
		palette: {
			primary: {
				main: "#3A79FF",
			},
		},
	});

	// React.useEffect(() => {
	
	// console.log(location);	
		
	// }, [location])

	return (
		<userContext.Provider value={{ user, setUser }}>
			<MuiThemeProvider theme={theme}>
				<Router />
			</MuiThemeProvider>
		</userContext.Provider>
	);
};

export default App;
