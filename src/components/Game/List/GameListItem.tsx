import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import GameScore from "../Score/GameScore";
import ClampLines from "react-clamp-lines";
import { Link as RouterLink } from "react-router-dom";
import { useStyles } from "./GameListItem.styles";
import { gameScore } from "utils/GameUtils";
import { Game } from "types";
import React from "react";

import WindowsLogo from "assets/images/windows-logo.svg";
import LinuxLogo from "assets/images/linux-logo.svg";
import MacLogo from "assets/images/mac-logo.svg";

const GameListItem: React.FC<Game> = (props) => {
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
	const score = gameScore(positive_ratings, negative_ratings);
	const platformsMap = React.Children.toArray(
		platforms.map((platform) => {
			switch (platform) {
				case "windows":
					return (
						<img
							className={classes.platform}
							src={WindowsLogo}
							alt={platform}
						/>
					);

				case "linux":
					return (
						<img className={classes.platform} src={LinuxLogo} alt={platform} />
					);

				case "mac":
					return (
						<img className={classes.platform} src={MacLogo} alt={platform} />
					);

				default:
					return null;
			}
		})
	);

	console.log(score);

	return (
		<Paper variant="outlined" className={classes.root}>
			<Grid container>
				{/* Image */}
				<Grid item xs={12} md={5}>
					<RouterLink color="inherit" to={`game/${id}`}>
						<div className={classes.img}></div>
					</RouterLink>
				</Grid>

				{/* Content */}
				<Grid item xs={12} md={7}>
					<Box className={classes.contentBox} padding={2}>
						<Grid container>
							{/* Title */}
							<Grid item className={classes.contentTitle} xs={12}>
								<Typography color="primary" variant="button" noWrap>
									<Link component={RouterLink} to={`game/${id}`}>
										{name}
									</Link>
								</Typography>
							</Grid>

							{/* Release date and score */}
							<Grid item xs={12}>
								<Typography paragraph variant="caption">
									{`Released on ${releaseDate}`}
								</Typography>
								<Typography variant="caption">
									<Box mb={2} fontWeight={600}>
										<GameScore score={score} />
									</Box>
								</Typography>
							</Grid>

							{/* Short description */}
							<Grid item className={classes.description} xs={12}>
								<ClampLines
									text={short_description}
									id={id.toString()}
									buttons={false}
									lines={3}
								/>
							</Grid>
						</Grid>

						<Grid item className={classes.platforms} xs={12}>
							<Box mt={2}>{platformsMap}</Box>
						</Grid>
					</Box>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default GameListItem;
