import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Copyright from "components/Layout/Copyright";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { useHistory, Link as RouterLink } from "react-router-dom";
import { checkRules, isEmailUnique } from "validator/Validator";
import { ErrorMessage, RegisterFormInputs } from "types";
import { useStyles } from "./Register.styles";
import RedirectBox from "./RedirectBox";

const Register: React.FC = () => {
	const classes = useStyles();
	const history = useHistory();

	const [errors, setErrors] = useState<Partial<ErrorMessage>[]>([]);
	const [fields, setFiels] = useState<RegisterFormInputs>({
		firstname: "",
		lastname: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [registered, setRegistered] = useState<boolean>(false);
	const [isDisabled, setIsDisabled] = useState<boolean>(false);

	const getErrors = (fieldName: keyof ErrorMessage) => {
		return errors.filter((error) => error[fieldName]);
	};

	const hasErrors = (fieldName: keyof ErrorMessage) => {
		return getErrors(fieldName).length > 0;
	};

	const displayErrors = (fieldName: keyof ErrorMessage) => {
		return getErrors(fieldName)[0]?.[fieldName];
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsDisabled(true);

		const errorsCheck: Array<Partial<ErrorMessage>> = checkRules(fields);

		if (fields.password !== fields.confirmPassword) {
			errorsCheck.push({ confirmPassword: "Passwords do not match." });
		}

		let isUniqueEmail = null;

		if (fields.email.length > 0) {
			isUniqueEmail = await isEmailUnique(fields.email);
		}

		if (!isUniqueEmail) {
			errorsCheck.push({ email: "This email is already in use." });
		}

		setErrors(errorsCheck);

		if (!errorsCheck.length) {
			fetch("/api/user/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json; charset=UTF-8",
				},
				body: JSON.stringify(fields),
			})
				.then(() => {
					setRegistered(true);

					setTimeout(() => {
						history.push({ pathname: "/login" });
					}, 5000);
				})
				.catch((e) => console.error(e));
		}
	};

	const handleChange = (name: keyof RegisterFormInputs) => (
		event: ChangeEvent<HTMLInputElement>
	) => {
		setFiels({ ...fields, [name]: event.currentTarget.value });
		isDisabled && setIsDisabled(false);
	};

	if (registered) {
		return <RedirectBox />;
	}

	return (
		<Container className={classes.root} maxWidth="xs">
			<Link
				color="primary"
				className={classes.homeLink}
				component={RouterLink}
				to="/"
			>
				<Button
					variant="outlined"
					color="primary"
					startIcon={<ArrowBackIcon />}
				>
					Home
				</Button>
			</Link>
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6}>
							<TextField
								helperText={displayErrors("firstname")}
								onChange={handleChange("firstname")}
								error={hasErrors("firstname")}
								value={fields.firstname}
								variant="outlined"
								label="First name"
								name="firstname"
								id="firstname"
								autoFocus
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								helperText={displayErrors("lastname")}
								onChange={handleChange("lastname")}
								error={hasErrors("lastname")}
								value={fields.lastname}
								variant="outlined"
								label="Last name"
								name="lastname"
								id="lastname"
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								helperText={displayErrors("email")}
								onChange={handleChange("email")}
								error={hasErrors("email")}
								value={fields.email}
								label="Email address"
								autoComplete="email"
								variant="outlined"
								name="email"
								id="email"
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								helperText={displayErrors("password")}
								onChange={handleChange("password")}
								error={hasErrors("password")}
								value={fields.password}
								autoComplete="current-password"
								variant="outlined"
								label="Password"
								name="password"
								type="password"
								id="password"
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								helperText={displayErrors("confirmPassword")}
								onChange={handleChange("confirmPassword")}
								error={hasErrors("confirmPassword")}
								value={fields.confirmPassword}
								label="Confirm password"
								name="confirmPassword"
								id="confirmPassword"
								variant="outlined"
								type="password"
								fullWidth
							/>
						</Grid>
					</Grid>

					<Button
						className={classes.submit}
						disabled={isDisabled}
						variant="contained"
						color="primary"
						type="submit"
						fullWidth
					>
						Sign Up
					</Button>
					<Grid container justify={"center"}>
						<Grid item>
							<Link to="/login" component={RouterLink} variant="body2">
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
};

export default Register;
