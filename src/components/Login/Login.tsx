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
import { Redirect } from "react-router-dom";
import Copyright from "../Layout/Copyright";
import { makeStyles } from "@material-ui/core/styles";
import userContext from "../../context/user/UserContext";
import { Alert, AlertTitle } from '@material-ui/lab';
import React, { useState } from "react";

const Login = () => {
	const classes = useStyles();

	const { user } = React.useContext(userContext);
	const [emailValue, setEmailValue] = useState('');
	const [passValue, setPassValue] = useState('');
	let [error, setErrorValue] = useState('');

	// TODO : FIND BETTER SOLUTION TO REDIRECT ?
	if (user!.authenticated) {
		return <Redirect to="/" />;
	}
	
	const handleLogin = () => {

		// axios.post('http://localhost:5000/api/user/login', null, {
		// 	params: {
		// 		email: emailValue,
		// 		password: passValue
		// 	}
		// }).then((response) => {
		// 	if (response.data.token !== undefined) {
		// 		let data = response.data;
		// 		user!.authenticated = true;
		// 		user!.token = data.token;
		// 		history.push("/");
		// 	} else {
		// 		setErrorValue("Invalid credentials");
		// 	}
		// }).catch((e) => console.error(e));
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
				{error.length > 0 &&
					<Alert severity="error">
						<AlertTitle>Error - {error}</AlertTitle>
					</Alert>
				}
				<form onSubmit={handleLogin} className={classes.form} noValidate>
					<TextField
						label="Email Address"
						autoComplete="email"
						variant="outlined"
						margin="normal"
						name="email"
						id="email"
						fullWidth
						autoFocus
						value={emailValue}
						onChange={(e) => setEmailValue(e.target.value)}
					/>
					<TextField
						autoComplete="current-password"
						variant="outlined"
						label="Password"
						margin="normal"
						name="password"
						type="password"
						id="password"
						value={passValue}
						onChange={(e) => setPassValue(e.target.value)}
					/>
					<FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
					<Button fullWidth variant="contained" color="primary" className={classes.submit} onClick={handleLogin}>
						Sign In
					</Button>
					<Grid container justify={"center"}>
						<Grid item>
							<Link href="/register" variant="body2">
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

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(6),
		flexDirection: "column",
		alignItems: "center",
		display: "flex",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		marginTop: theme.spacing(1),
		width: "100%", // Fix IE 11 issue.
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default Login;