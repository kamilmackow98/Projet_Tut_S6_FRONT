import {
	AppBar,
	CssBaseline,
	SwipeableDrawer,
	IconButton,
	List,
	Toolbar,
	Typography,
	Container,
	Grid,
	Divider,
	MenuItem,
	Menu,
} from "@material-ui/core";
import React, { MouseEvent, ReactElement } from "react";
import { mainListItems, secondaryListItems } from "./SidebarItems";
import { AccountCircle, Menu as MenuIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { layoutConfig } from "./LayoutConfig";

interface Props {
	children: ReactElement;
}

const useStyles = layoutConfig;

const GlobalLayout = ({ children }: Props) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [open, setOpen] = React.useState(false);
	const classes = useStyles();

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
					<IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer(true)} className={classes.menuButton}>
						<MenuIcon />
					</IconButton>
					<Typography component={Link} to="/" variant="h6" color="inherit" noWrap className={classes.title}>
						Video Games Encyclopedia
					</Typography>
					<IconButton onClick={handleClickAccount} color="inherit">
						<AccountCircle />
					</IconButton>
					<Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleCloseAnchor}>
						<MenuItem component={Link} to="/my-account" onClick={handleCloseAnchor}>
							My account
						</MenuItem>
						<MenuItem component={Link} to="/login" onClick={handleCloseAnchor}>
							Logout
						</MenuItem>
					</Menu>
				</Toolbar>
			</AppBar>
			<SwipeableDrawer
				variant="temporary"
				classes={{
					paper: classes.drawerPaper,
				}}
				onClose={toggleDrawer(false)}
				onOpen={toggleDrawer(true)}
				anchor={"left"}
				open={open}
			>
				<List onClick={toggleDrawer(false)}>{mainListItems}</List>
				<Divider />
				<List onClick={toggleDrawer(false)}>{secondaryListItems}</List>
			</SwipeableDrawer>
			<main className={classes.content}>
				<div className={classes.appBarSpacer}></div>
				<Container maxWidth="lg" className={classes.container}>
					<Grid container spacing={3}>
						{children}
					</Grid>
				</Container>
			</main>
		</>
	);
};

export default GlobalLayout;
