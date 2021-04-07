import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import "../../assets/styles/loader.css";

const useStyles = makeStyles((theme) => ({
	root: {
		transform: "translate3d(-50%, -50%, 0)",
		position: "fixed",
		left: "50%",
		top: "50%",

		flexDirection: "column",
		display: "flex",
	},
}));

const Loader = () => {
	const classes = useStyles();
	const spans = Array(9).fill("");

	return (
		<div className={classes.root}>
			<div className="spinner">{React.Children.toArray(spans.map(() => <span className="spinner__ring"></span>))}</div>
			<Typography variant="caption" align="center">
				LOADING
			</Typography>
		</div>
	);
};

export default Loader;
