import React from "react";
import userContext from "./context/user/UserContext";
import Router from "./router/Router";

const userConfig = {
	authenticated: false,
	token: ''
};

const App = () => {
	const [user, setUser] = React.useState(userConfig);

	return (
		<userContext.Provider value={{ user, setUser }}>
			<Router />
		</userContext.Provider>
	);
};

export default App;
