import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Redirect } from "react-router-dom";
import Copyright from "../Layout/Copyright";
import userContext from "../../context/user/UserContext";

import { Alert, AlertTitle } from '@material-ui/lab';
import axios from 'axios';
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Register() {
	const classes = useStyles();
	const { user } = React.useContext(userContext);
	const [lastnameValue, setLastnameValue] = useState('');
	const [firstnameValue, setFirstnameValue] = useState('');
	const [emailValue, setEmailValue] = useState('');
	const [passValue, setPassValue] = useState('');
	const [confirmPassValue, setConPassValue] = useState('');
	let [error, setErrorValue] = useState('');
	let history = useHistory();

	// TODO : FIND BETTER SOLUTION TO REDIRECT ?
	// if (user!.authenticated) {
	// 	return <Redirect to="/" />;
	// }

	const CallAPi = () => {

		axios.post('http://localhost:5000/api/user/create', null, {
			params: {
				lastname: lastnameValue,
				firstname: firstnameValue,
				email: emailValue,
				password: passValue,
				confirm_password: confirmPassValue
			}
		}).then((response) => {

			console.log(response);
			if (response.data == "Email already used !") {
				setErrorValue(response.data);
			} else {
				history.push("/");
			}
		}).catch((e) => console.error(e));

	}

	const handleRegister = () => {
		const re = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/;
		const params = {
			lastname: lastnameValue,
			firstname: firstnameValue,
			email: emailValue,
			password: passValue,
			confirm_password: confirmPassValue
		};
		// TODO : improve Quality 
		if (params.lastname === undefined || params.lastname.length < 3) {
			setErrorValue("Invalid lastname");
		} else if (params.firstname === undefined || params.firstname.length < 3) {
			setErrorValue("Invalid firstname");
		} else if (params.email === undefined || re.test(params.email)) {
			setErrorValue("Invalid email");
		} else if (params.password === undefined || params.password.length <= 7) {
			setErrorValue("password is too short");
		} else if (params.confirm_password === undefined || params.confirm_password !== params.password) {
			setErrorValue("password are not the same");
		}
		else {
			// CallAPi();
			axios.post('http://localhost:5000/api/user/create', null, {
				params: {
					lastname: lastnameValue,
					firstname: firstnameValue,
					email: emailValue,
					password: passValue,
					confirm_password: confirmPassValue
				}
			}).then((response) => {

				console.log(response);
				if (response.data == "Email already used !") {
					setErrorValue(response.data);
				} else {
					// history.push("/login");
				}
			}).catch((e) => console.error(e));
		}
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
				<form className={classes.form} noValidate onSubmit={handleRegister}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="lastname"
						name="lastname"
						label="LastName"
						value={lastnameValue}
						onChange={(e) => setLastnameValue(e.target.value)}
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="firstname"
						name="firstname"
						label="FirstName"
						value={firstnameValue}
						onChange={(e) => setFirstnameValue(e.target.value)}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						name="email"
						label="Email Address"
						autoComplete="email"
						value={emailValue}
						onChange={(e) => setEmailValue(e.target.value)}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={passValue}
						onChange={(e) => setPassValue(e.target.value)}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="confirmPassword"
						label="Confirm Password"
						type="password"
						id="confirmPassword"
						value={confirmPassValue}
						onChange={(e) => setConPassValue(e.target.value)}
					/>

					<Button onClick={handleRegister} fullWidth variant="contained" color="primary" className={classes.submit}>
						Sign Up
					</Button>
					<Grid container justify={"center"}>
						<Grid item>
							<Link href="/login" variant="body2">
								{"Already have an account? Sign In"}
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