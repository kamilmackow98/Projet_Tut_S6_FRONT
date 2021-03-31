import { makeStyles } from "@material-ui/core";

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	toolbar: {
		paddingRight: theme.spacing(2),
		[theme.breakpoints.down("xs")]: {
			paddingRight: theme.spacing(1),
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.down("xs")]: {
			marginRight: theme.spacing(1),
		},
	},
	title: {
		flexGrow: 1,
		textDecoration: "none",
		outline: "none",
	},
	drawerPaper: {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: "100vh",
		overflow: "auto",
	},
	container: {
		padding: theme.spacing(4),
		[theme.breakpoints.down("xs")]: {
			padding: theme.spacing(3),
		},
	},
}));
