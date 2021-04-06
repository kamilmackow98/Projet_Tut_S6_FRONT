import { libraryItem, mainListItems, secondaryListItems } from "./SidebarItems";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { ClassNameMap } from "@material-ui/styles";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import UserContext from "context/user/UserContext";
import React from "react";

interface Props {
	open: boolean;
	toggleDrawer: Function;
	classes: ClassNameMap;
}

const Sidebar: React.FC<Props> = ({ open, toggleDrawer, classes }) => {
	const { user } = React.useContext(UserContext);
	if (user.isAuthenticated && mainListItems.length === 3) mainListItems.push(libraryItem);

	return (
		<SwipeableDrawer
			classes={{
				paper: classes.drawerPaper,
			}}
			onClose={toggleDrawer(false)}
			onOpen={toggleDrawer(true)}
			variant="temporary"
			anchor={"left"}
			open={open}
		>
			<List onClick={toggleDrawer(false)}>{mainListItems}</List>
			{user.isAuthenticated && (
				<>
					<Divider />
					<List onClick={toggleDrawer(false)}>{secondaryListItems}</List>
				</>
			)}
		</SwipeableDrawer>
	);
};

export default Sidebar;
