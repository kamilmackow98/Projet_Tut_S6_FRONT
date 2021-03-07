import { Container, CssBaseline, Grid } from "@material-ui/core";
import React, { ReactElement } from "react";
import { layoutConfig } from "./LayoutConfig";

interface Props {
	children: ReactElement;
}

const useStyles = layoutConfig;

const BasicLayout: React.FC<Props> = ({ children }) => {
	const classes = useStyles();

	return (
		<>
			<CssBaseline />
			<main className={classes.content}>
				<Container maxWidth="lg" className={classes.container}>
					<Grid container spacing={3}>{children}</Grid>
				</Container>
			</main>
		</>
	);
};

export default BasicLayout;
