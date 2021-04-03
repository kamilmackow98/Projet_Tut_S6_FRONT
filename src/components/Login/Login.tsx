import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { Redirect } from "react-router-dom";
import Copyright from "../Layout/Copyright";
import userContext from "../../context/user/UserContext";
import React, { useState } from "react";
import { useStyles } from "./Login.styles";

const Login: React.FC = () => {
	const classes = useStyles();
	const { user } = React.useContext(userContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	if (user!.authenticated) {
		return <Redirect to="/" />;
	}

	const handleSubmit = () => {};

	return (
		<Container className={classes.root} maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form onSubmit={handleSubmit} className={classes.form}>
					<TextField
						onChange={(e) => setEmail(e.target.value)}
						value={email}
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
						onChange={(e) => setPassword(e.target.value)}
						value={password}
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
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
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
