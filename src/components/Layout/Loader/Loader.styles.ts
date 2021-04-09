import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	root: {
		flexDirection: "column",
		display: "flex",
	},
	rootFixed: {
		transform: "translate3d(-50%, -50%, 0)",
		position: "fixed",
		left: "50%",
		top: "50%",

		flexDirection: "column",
		display: "flex",
	},
}));
