import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import "assets/styles/loader.css";
 
interface Props {
	fixed?: boolean;
}

const Loader: React.FC<Props> = ({ fixed = false }) => {
	const classes = useStyles();
	const spans = Array(9).fill("");

	return (
		<div className={fixed ? classes.rootFixed : classes.root}>
			<div className="spinner">
				{React.Children.toArray(
					spans.map(() => <span className="spinner__ring"></span>)
				)}
			</div>
			<Typography variant="caption" align="center">
				LOADING
			</Typography>
		</div>
	);
};

export default Loader;

const useStyles = makeStyles((theme) => ({
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
