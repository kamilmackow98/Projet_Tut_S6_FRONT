import { UserType } from "types";
import React from "react";

interface Props {
	user: UserType;
	setUser: React.Dispatch<React.SetStateAction<any>>;
}

const userContext = React.createContext<Partial<Props>>({});

export default userContext;
