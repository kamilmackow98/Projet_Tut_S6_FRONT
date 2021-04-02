import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "./Layout.styles";
import React, { ReactElement } from "react";

interface Props {
	children: ReactElement;
}

const BasicLayout: React.FC<Props> = ({ children }) => {
	const classes = useStyles();

	return (
		<>
			<CssBaseline />
			<main className={classes.content}>
				<Container maxWidth="lg" className={classes.container}>
					<Grid container spacing={3}>
						{children}
					</Grid>
				</Container>
			</main>
		</>
	);
};

export default BasicLayout;
