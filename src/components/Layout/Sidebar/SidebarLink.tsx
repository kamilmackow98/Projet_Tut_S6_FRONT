import {
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

interface SidebarLinkProps {
	text: string;
	to: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ text, to, children }) => {
	return (
		<ListItem component={Link} to={to} button>
			<ListItemIcon>{children}</ListItemIcon>
			<ListItemText primary={<Typography noWrap>{text}</Typography>} />
		</ListItem>
	);
};

export default SidebarLink;
