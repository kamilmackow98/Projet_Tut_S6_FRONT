import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Copyright from "../Layout/Copyright";

import userContext from "context/user/UserContext";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { ErrorMessage, LoginFormInputs } from "types";
import { checkRules } from "validator/Validator";
import { Redirect, useHistory } from "react-router-dom";
import { useStyles } from "./Login.styles";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const Login: React.FC = () => {
	const classes = useStyles();
	const history = useHistory();
	const { user } = React.useContext(userContext);

	const [errors, setErrors] = useState<Partial<ErrorMessage>[]>([]);
	const [wrongInfo, setWrongInfo] = React.useState<boolean>(false);
	const [fields, setFields] = useState<LoginFormInputs>({
		email: "",
		password: "",
	});

	if (user!.authenticated) {
		return <Redirect to="/" />;
	}

	const getErrors = (fieldName: keyof ErrorMessage) => {
		return errors.filter((error) => error[fieldName]);
	};

	const hasErrors = (fieldName: keyof ErrorMessage) => {
		return getErrors(fieldName).length > 0;
	};

	const displayErrors = (fieldName: keyof ErrorMessage) => {
		return getErrors(fieldName)[0]?.[fieldName];
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const errorsCheck: Array<Partial<ErrorMessage>> = checkRules(fields);
		setErrors(errorsCheck);

		if (!errorsCheck.length) {
			fetch("api/user/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json; charset=UTF-8",
				},
				body: JSON.stringify(fields),
			})
				.then((res) => res)
				.then((response) => {
					if (response.status === 403) {
						setWrongInfo(true);
					}

					if (response.status === 200) {
						return response.json();
					}
				})
				.then((token) => {
					if (token) {
						console.log(token.token); // TODO : Do the JWT
					}
				})
				.catch((e) => console.error(e));
		}
	};

	const handleChange = (name: keyof LoginFormInputs) => (
		event: ChangeEvent<HTMLInputElement>
	) => {
		setFields({ ...fields, [name]: event.currentTarget.value });
	};

	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}

		setWrongInfo(false);
	};

	return (
		<Container className={classes.root} maxWidth="xs">
			<Snackbar open={wrongInfo} autoHideDuration={3000} onClose={handleClose}>
				<Alert
					onClose={handleClose}
					severity="error"
					variant="filled"
					elevation={6}
				>
					Incorrect credentials !
				</Alert>
			</Snackbar>

			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form onSubmit={handleSubmit} className={classes.form}>
					<TextField
						helperText={displayErrors("email")}
						onChange={handleChange("email")}
						error={hasErrors("email")}
						value={fields.email}
						label="Email address"
						autoComplete="email"
						variant="outlined"
						margin="normal"
						name="email"
						id="email"
						fullWidth
						autoFocus
					/>
					<TextField
						helperText={displayErrors("password")}
						onChange={handleChange("password")}
						error={hasErrors("password")}
						value={fields.password}
						autoComplete="current-password"
						variant="outlined"
						label="Password"
						margin="normal"
						name="password"
						type="password"
						id="password"
						fullWidth
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
};

export default Login;
