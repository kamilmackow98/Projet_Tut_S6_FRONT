import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { Gamepad, SportsEsports, VideogameAsset, Stars } from "@material-ui/icons";
import { Link } from "react-router-dom";

export const mainListItems = (
	<div>
		<ListItem component={Link} to="/" button>
			<ListItemIcon>
				<Gamepad />
			</ListItemIcon>
			<ListItemText primary="Home" />
		</ListItem>
		<ListItem component={Link} to="/protected" button>
			<ListItemIcon>
				<SportsEsports />
			</ListItemIcon>
			<ListItemText primary="Protected" />
		</ListItem>
		<ListItem component={Link} to="/nested" button>
			<ListItemIcon>
				<VideogameAsset />
			</ListItemIcon>
			<ListItemText primary="Nested" />
		</ListItem>
	</div>
);

export const secondaryListItems = (
	<div>
		<ListSubheader>Recommended for you</ListSubheader>
		<ListItem component={Link} to="/non-existing-route" button>
			<ListItemIcon>
				<Stars />
			</ListItemIcon>
			<ListItemText primary="404" />
		</ListItem>
	</div>
);
