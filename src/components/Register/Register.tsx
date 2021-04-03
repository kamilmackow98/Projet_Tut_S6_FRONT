import { Link as RouterLink, useHistory } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Copyright from "components/Layout/Copyright";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { isEmailUnique, isValid } from "validator/Validator";
import { useStyles } from "./Register.styles";
import { ErrorMessage, Rules } from "types";
import { rules } from "validator/rules";
import RedirectBox from "./RedirectBox";

interface FormInputs {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	confirmPassword: string;
}

const Register: React.FC = () => {
	const classes = useStyles();
	const history = useHistory();

	const [errors, setErrors] = useState<ErrorMessage[]>([]);
	const [fields, setFiels] = useState<FormInputs>({
		firstname: "",
		lastname: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [registered, setRegistered] = useState<boolean>(false);

	const getErrors = (fieldName: keyof ErrorMessage) => {
		return errors.filter((error) => error[fieldName]);
	};

	const hasErrors = (fieldName: keyof ErrorMessage) => {
		return getErrors(fieldName).length > 0;
	};

	const displayErrors = (fieldName: keyof ErrorMessage) => {
		return getErrors(fieldName)[0]?.[fieldName];
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		let errorsCheck: any[] = [];

		for (const [key, value] of Object.entries(fields)) {
			const rulesKey = key as keyof Rules;
			const rulesArray = rules[rulesKey];

			if (rulesArray) {
				rulesArray.forEach((rule) => {
					if (!isValid(value, rule)) {
						errorsCheck.push({ [key]: rule.message });
					}
				});
			}
		}

		if (fields.password !== fields.confirmPassword) {
			errorsCheck.push({ confirmPassword: "Passwords do not match." });
		}

		const isUniqueEmail = await isEmailUnique(fields.email);

		if (!isUniqueEmail) {
			errorsCheck.push({ email: "This email is already in use." });
		}

		setErrors(errorsCheck);

		if (!errorsCheck.length) {
			fetch("api/user/create", {
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

	const handleChange = (name: string) => (
		event: ChangeEvent<HTMLInputElement>
	) => {
		setFiels({ ...fields, [name]: event.currentTarget.value });
	};

	if (registered) {
		return <RedirectBox />;
	}

	return (
		<Container className={classes.root} maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6}>
							<TextField
								helperText={displayErrors("firstname")}
								onChange={handleChange("firstname")}
								error={hasErrors("firstname")}
								variant="outlined"
								label="First name"
								name="firstname"
								id="firstname"
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								helperText={displayErrors("lastname")}
								onChange={handleChange("lastname")}
								error={hasErrors("lastname")}
								variant="outlined"
								label="Last name"
								name="lastname"
								id="lastname"
								autoFocus
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								helperText={displayErrors("email")}
								onChange={handleChange("email")}
								error={hasErrors("email")}
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
								label="Confirm Password"
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
						variant="contained"
						color="primary"
						type="submit"
						fullWidth
					>
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
};

export default Register;
