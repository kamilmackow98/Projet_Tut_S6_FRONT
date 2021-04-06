import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";
import UserContext from "context/user/UserContext";
import { ClassNameMap } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { removeToken } from "auth/Auth";
import React from "react";

interface Props {
	classes?: ClassNameMap;
}

const AccountMenu: React.FC<Props> = ({ classes }) => {
	const { user, setUser } = React.useContext(UserContext);
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClickAccount = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseAnchor = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		setAnchorEl(null);
		removeToken();
		setUser({ ...user, isAuthenticated: false });
	};

	const menuItems = user.isAuthenticated ? (
		<div>
			<MenuItem component={Link} to="/library" onClick={handleCloseAnchor}>
				My library
			</MenuItem>
			<Divider />
			<MenuItem component={Link} to="/" onClick={handleLogout}>
				Logout
			</MenuItem>
		</div>
	) : (
		<div>
			<MenuItem component={Link} to="/login" onClick={handleCloseAnchor}>
				Login
			</MenuItem>
			<Divider />
			<MenuItem component={Link} to="/register" onClick={handleCloseAnchor}>
				Register
			</MenuItem>
		</div>
	);

	return (
		<>
			<IconButton onClick={handleClickAccount} color="inherit">
				<AccountCircleIcon />
			</IconButton>
			<Menu
				onClose={handleCloseAnchor}
				open={Boolean(anchorEl)}
				anchorEl={anchorEl}
				id="account-menu"
				keepMounted
			>
				{menuItems}
			</Menu>
		</>
	);
};

export default AccountMenu;
