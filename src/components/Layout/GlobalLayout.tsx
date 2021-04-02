import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useStyles } from "./Layout.styles";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Footer from "./Footer";
import React, { MouseEvent, ReactElement } from "react";

interface Props {
	children: ReactElement;
}

const GlobalLayout: React.FC<Props> = ({ children }) => {
	const classes = useStyles();

	const [anchorEl, setAnchorEl] = React.useState(null);
	const [open, setOpen] = React.useState(false);

	const toggleDrawer = (open: boolean) => (event: MouseEvent) => {
		setOpen(open);
	};

	const handleClickAccount = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseAnchor = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<CssBaseline />
			<AppBar position="absolute">
				<Toolbar className={classes.toolbar}>
					<IconButton
						className={classes.menuButton}
						onClick={toggleDrawer(true)}
						aria-label="open drawer"
						color="inherit"
						edge="start"
					>
						<MenuIcon />
					</IconButton>
					<Typography
						className={classes.title}
						component={Link}
						color="inherit"
						variant="h6"
						noWrap
						to="/"
					>
						Video Games Encyclopedia
					</Typography>
					<IconButton onClick={handleClickAccount} color="inherit">
						<AccountCircleIcon />
					</IconButton>
					<Menu
						onClose={handleCloseAnchor}
						open={Boolean(anchorEl)}
						anchorEl={anchorEl}
						id="simple-menu"
						keepMounted
					>
						<MenuItem
							onClick={handleCloseAnchor}
							component={Link}
							to="/my-account"
						>
							My account
						</MenuItem>
						<MenuItem component={Link} to="/login" onClick={handleCloseAnchor}>
							Logout
						</MenuItem>
					</Menu>
				</Toolbar>
			</AppBar>
			<Sidebar open={open} toggleDrawer={toggleDrawer} classes={classes} />
			<main className={classes.content}>
				<div className={classes.appBarSpacer}></div>
				<Container maxWidth="lg" className={classes.container}>
					<Grid container spacing={3}>
						{children}
					</Grid>
				</Container>
				<Footer classes={classes} />
			</main>
		</>
	);
};

export default GlobalLayout;
