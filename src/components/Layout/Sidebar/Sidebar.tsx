import { mainListItems, secondaryListItems } from "./SidebarItems";
import { ClassNameMap } from "@material-ui/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import React from "react";

interface Props {
	open: boolean;
	toggleDrawer: Function;
	classes: ClassNameMap;
}

const Sidebar: React.FC<Props> = ({ open, toggleDrawer, classes }) => {
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
			<Divider />
			<List onClick={toggleDrawer(false)}>{secondaryListItems}</List>
		</SwipeableDrawer>
	);
};

export default Sidebar;
