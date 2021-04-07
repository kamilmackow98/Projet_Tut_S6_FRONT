import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
	title: {
		fontWeight: 600,
	},
	iconButtons: {
		justifyContent: "flex-end",
		display: "flex",
	},
	noGamesFoundContainer: {
        display: "flex",
        justifyContent: "center"
    }
}));
