import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
	imgContainer: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		justifyContent: "center",
		display: "flex",
	},
	notFoundImg: {
		objectFit: "cover",
		maxWidth: "650px",
		width: "90%",
	},
	txtContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",

		"& > p": {
			maxWidth: "550px",
		},
	},
}));
