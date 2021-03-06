import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import React from "react";

const Copyright: React.FC = () => {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" component={RouterLink} to="/">
				Video Games Encyclopedia
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
};

export default Copyright;
