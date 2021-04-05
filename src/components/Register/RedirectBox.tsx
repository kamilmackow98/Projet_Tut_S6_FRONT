import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { Link as RouterLink } from "react-router-dom";
import { useStyles } from "./Register.styles";
import React from "react";

const RedirectBox: React.FC = () => {
	const classes = useStyles();

	return (
		<Container className={classes.root} maxWidth="sm">
			<div className={classes.paper}>
				<Paper elevation={4}>
					<Box paddingX={5} paddingY={8}>
						<Grid container spacing={4}>
							<Grid item xs={12}>
								<Typography align="center">
									You have been successfully registered !
								</Typography>
								<Typography align="center">
									You will be redirected to the login page in 5 seconds.
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Box className={classes.buttonsBox}>
									<RouterLink to="/login">
										<Button tabIndex={-1} variant="contained" color="primary">
											Login
										</Button>
									</RouterLink>
									<RouterLink to="/">
										<Button tabIndex={-1} variant="outlined" color="primary">
											Home
										</Button>
									</RouterLink>
								</Box>
							</Grid>
						</Grid>
					</Box>
				</Paper>
			</div>
		</Container>
	);
};

export default RedirectBox;
