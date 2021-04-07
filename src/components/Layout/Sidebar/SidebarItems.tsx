import GamepadIcon from "@material-ui/icons/Gamepad";
import StarsIcon from "@material-ui/icons/Stars";
import ListSubheader from "@material-ui/core/ListSubheader";
import SidebarLink from "./SidebarLink";
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

export const mainListItems = [
	<SidebarLink key={"home"} text="Home" to="/">
		<GamepadIcon />
	</SidebarLink>,
];

export const libraryItem = (
	<SidebarLink text="My Library" to="/library">
		<LibraryBooksIcon />
	</SidebarLink>
);

export const secondaryListItems = (
	<>
		<ListSubheader>Recommended for you</ListSubheader>

		<SidebarLink text="Games" to="/recommended">
			<StarsIcon />
		</SidebarLink>
	</>
);
