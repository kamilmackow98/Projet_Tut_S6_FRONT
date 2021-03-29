import { Divider, List, SwipeableDrawer } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/styles";
import React from "react";
import { mainListItems, secondaryListItems } from "./SidebarItems";

interface Props {
	open: boolean;
	toggleDrawer: Function;
	classes: ClassNameMap;
}

const Sidebar: React.FC<Props> = ({ open, toggleDrawer, classes }) => {
	return (
		<SwipeableDrawer
			variant="temporary"
			classes={{
				paper: classes.drawerPaper,
			}}
			onClose={toggleDrawer(false)}
			onOpen={toggleDrawer(true)}
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
