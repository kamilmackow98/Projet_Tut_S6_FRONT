import Typography from "@material-ui/core/Typography";
import { useStyles } from "./Loader.styles";
import styles from "./Loader.module.css";
import React from "react";

interface Props {
	fixed?: boolean;
}

const Loader: React.FC<Props> = ({ fixed = false }) => {
	const classes = useStyles();
	const spans = Array(9).fill("");

	const ringsMap = React.Children.toArray(
		spans.map(() => <span className={styles.spinner__ring}></span>)
	);

	return (
		<div className={fixed ? classes.rootFixed : classes.root}>
			<div className={styles.spinner}>{ringsMap}</div>
			<Typography variant="caption" align="center">
				LOADING
			</Typography>
		</div>
	);
};

export default Loader;
