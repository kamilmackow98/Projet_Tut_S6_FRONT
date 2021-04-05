import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	root: {
		[theme.breakpoints.down("xs")]: {
			padding: 0,
		},
	},
	paper: {
		marginTop: theme.spacing(6),
		flexDirection: "column",
		alignItems: "center",
		display: "flex",
	},
	buttonsBox: {
		justifyContent: "center",
		display: "flex",

		"& > a": {
			textDecoration: "none",

			"& ~ a": {
				marginLeft: theme.spacing(1),
			},
		},
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		marginTop: theme.spacing(3),
		width: "100%", // Fix IE 11 issue.
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	homeLink: {
		textDecoration: "none !important",
		position: "absolute",
		
		[theme.breakpoints.down("xs")]: {
			left: theme.spacing(1),
			top: theme.spacing(1),
		},
		left: theme.spacing(2),
		top: theme.spacing(2),
	},
}));
