import { UserType } from "types";
import React from "react";

interface Props {
	user: UserType;
	setUser: React.Dispatch<React.SetStateAction<UserType>>;
}

const UserContext = React.createContext<Props>({
	user: { authenticated: false, token: "" },
	setUser: () => {},
});

export default UserContext;
