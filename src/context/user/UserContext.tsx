import React from "react";
import { UserType } from "../../types";

interface Props {
	user: UserType;
	setUser: React.Dispatch<React.SetStateAction<any>>;
}

const userContext = React.createContext<Partial<Props>>({});

export default userContext;
