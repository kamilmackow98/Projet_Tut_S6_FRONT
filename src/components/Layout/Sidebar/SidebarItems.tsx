import ListSubheader from "@material-ui/core/ListSubheader";
import SidebarLink from "./SidebarLink";
import {
	Gamepad,
	SportsEsports,
	VideogameAsset,
	Stars,
	Layers,
} from "@material-ui/icons";

export const mainListItems = (
	<>
		<SidebarLink text="Home" to="/">
			<Gamepad />
		</SidebarLink>

		<SidebarLink text="Protected" to="/protected">
			<SportsEsports />
		</SidebarLink>

		<SidebarLink text="Nested" to="/nested">
			<VideogameAsset />
		</SidebarLink>
	</>
);

export const secondaryListItems = (
	<>
		<ListSubheader>Recommended for you</ListSubheader>

		<SidebarLink text="404" to="/non-existing-route">
			<Stars />
		</SidebarLink>

		<SidebarLink text="Test components" to="/components">
			<Layers />
		</SidebarLink>
	</>
);
