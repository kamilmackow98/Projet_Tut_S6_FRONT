import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import { Link } from "react-router-dom";
import React from "react";

interface Props {
	text: string;
	to: string;
}

const SidebarLink: React.FC<Props> = ({ text, to, children }) => {
	return (
		<ListItem component={Link} to={to} button>
			<ListItemIcon>{children}</ListItemIcon>
			<ListItemText primary={<Typography noWrap>{text}</Typography>} />
		</ListItem>
	);
};

export default SidebarLink;
