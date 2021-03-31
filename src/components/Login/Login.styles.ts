import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(6),
		flexDirection: "column",
		alignItems: "center",
		display: "flex",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		marginTop: theme.spacing(1),
		width: "100%", // Fix IE 11 issue.
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));
