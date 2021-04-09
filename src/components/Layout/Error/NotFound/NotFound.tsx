import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import { Link as RouterLink } from "react-router-dom";
import NotFoundImage from "assets/images/404.svg";
import React from "react";
import { useStyles } from "./NotFound.styles";

const NotFound: React.FC = () => {
	const classes = useStyles();

	return (
		<Container disableGutters>
			<Grid container spacing={2} justify="center">
				<Grid item xs={12}>
					<Box className={classes.imgContainer}>
						<img
							className={classes.notFoundImg}
							src={NotFoundImage}
							alt={"404"}
						/>
					</Box>
				</Grid>
				<Grid item xs={12}>
					<Box px={8} className={classes.txtContainer} textAlign="center">
						<Typography paragraph>
							The page you are looking for no longer exists or may have been
							moved.
						</Typography>
						<Link color="primary" component={RouterLink} to="/">
							<Button variant="contained" color="primary">
								Home
							</Button>
						</Link>
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
};

export default NotFound;
