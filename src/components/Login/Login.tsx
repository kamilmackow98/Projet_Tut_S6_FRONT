import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Copyright from "components/Layout/Copyright";
import userContext from "context/user/UserContext";
import { Redirect } from "react-router-dom";
import { useStyles } from "./Login.styles";
import React from "react";

export default function Login() {
	const classes = useStyles();

	const { user } = React.useContext(userContext);

	// TODO : FIND BETTER SOLUTION TO REDIRECT ?
	if (user!.authenticated) {
		return <Redirect to="/" />;
	}

	return (
		<Container maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form className={classes.form} noValidate>
					<TextField
						label="Email Address"
						autoComplete="email"
						variant="outlined"
						margin="normal"
						name="email"
						id="email"
						fullWidth
						autoFocus
						required
					/>
					<TextField
						autoComplete="current-password"
						variant="outlined"
						label="Password"
						margin="normal"
						name="password"
						type="password"
						id="password"
						fullWidth
						required
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<Button
						className={classes.submit}
						variant="contained"
						color="primary"
						type="submit"
						fullWidth
					>
						Sign In
					</Button>
					<Grid container justify={"center"}>
						<Grid item>
							<Link href="#" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={6} mb={2}>
				<Copyright />
			</Box>
		</Container>
	);
}
