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
	},
	drawerPaper: {
		whiteSpace: "nowrap",
		position: "relative",
		width: drawerWidth,
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexDirection: "column",
		overflow: "auto",
		display: "flex",
		height: "100vh",
		flexGrow: 1,
	},
	container: {
		flexGrow: 1,
		padding: theme.spacing(4),
		[theme.breakpoints.down("xs")]: {
			padding: theme.spacing(3),
		},
	},
	footerRoot: {
		width: "100%",
	},
	footerPaper: {
		paddingTop: 15,
		paddingBottom: 10
	},
}));
