import VideogameAssetIcon from "@material-ui/icons/VideogameAsset";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import GamepadIcon from "@material-ui/icons/Gamepad";
import LayersIcon from "@material-ui/icons/Layers";
import StarsIcon from "@material-ui/icons/Stars";
import ListSubheader from "@material-ui/core/ListSubheader";
import SidebarLink from "./SidebarLink";

export const mainListItems = (
	<>
		<SidebarLink text="Home" to="/">
			<GamepadIcon />
		</SidebarLink>

		<SidebarLink text="Protected" to="/protected">
			<SportsEsportsIcon />
		</SidebarLink>

		<SidebarLink text="Nested" to="/nested">
			<VideogameAssetIcon />
		</SidebarLink>
	</>
);

export const secondaryListItems = (
	<>
		<ListSubheader>Recommended for you</ListSubheader>

		<SidebarLink text="404" to="/non-existing-route">
			<StarsIcon />
		</SidebarLink>

		<SidebarLink text="Test components" to="/components">
			<LayersIcon />
		</SidebarLink>
	</>
);
