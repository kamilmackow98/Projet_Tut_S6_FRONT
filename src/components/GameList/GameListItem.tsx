import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import { Link as RouterLink } from "react-router-dom";
import { useStyles } from "./GameListItem.styles";
import { gameScore } from "utils/GameUtils";
import { CompleteGameInfo } from "types";
import React from "react";

import WindowsLogo from "assets/images/windows-logo.svg";
import LinuxLogo from "assets/images/linux-logo.svg";
import MacLogo from "assets/images/mac-logo.svg";

const GameListItem: React.FC<CompleteGameInfo> = (props) => {
	const {
		id,
		name,
		platforms,
		header_image,
		release_date,
		positive_ratings,
		negative_ratings,
		short_description,
	} = props;

	const classes = useStyles({ header_image });

	const releaseDate = new Date(release_date).toLocaleDateString("en-GB");
	const platformsMap = platforms.map((platform) => {
		switch (platform) {
			case "windows":
				return (
					<img
						style={{ objectFit: "cover", height: 30 }}
						src={WindowsLogo}
						alt={platform}
					/>
				);

			case "linux":
				return (
					<img
						style={{ objectFit: "cover", height: 30 }}
						src={LinuxLogo}
						alt={platform}
					/>
				);

			case "mac":
				return (
					<img
						style={{ objectFit: "cover", height: 30 }}
						src={MacLogo}
						alt={platform}
					/>
				);

			default:
				return null;
		}
	});

	return (
		<Paper variant="outlined" className={classes.root}>
			<Grid container>
				<Grid item xs={12} md={4}>
					<RouterLink color="inherit" to={`game/${id}`}>
						<Box className={classes.imgBox}>
							{/* <img className={classes.img} src={header_image} alt={name} /> */}
							<div className={classes.img}></div>
						</Box>
					</RouterLink>
				</Grid>
				<Grid item xs={12} md={8}>
					<Box padding={2}>
						<Typography color="primary" variant="button">
							<Link component={RouterLink} to={`game/${id}`}>
								{name}
							</Link>
						</Typography>
						<Typography paragraph variant="caption">
							{`Released on ${releaseDate}`}
						</Typography>
						<Grid item>{short_description}</Grid>
						<Grid item>{platformsMap}</Grid>
						{gameScore(positive_ratings, negative_ratings)}
					</Box>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default GameListItem;
