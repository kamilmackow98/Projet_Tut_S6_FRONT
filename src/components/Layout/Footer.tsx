import { ClassNameMap } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Copyright from "./Copyright";
import React from "react";

interface Props {
	classes: ClassNameMap;
}

const Footer: React.FC<Props> = ({ classes }) => {
	return (
		<div className={classes.footerRoot}>
			<Paper className={classes.footerPaper} elevation={4} square>
				<Copyright />
			</Paper>
		</div>
	);
};

export default Footer;
