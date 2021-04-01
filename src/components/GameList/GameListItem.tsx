import { Box, Container, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { CompleteGameInfo } from "types";
import { useStyles } from "./GameListItem.styles";

const GameListItem: React.FC<CompleteGameInfo> = (props) => {
	const classes = useStyles();

	const { name, header_image, short_description, release_date } = props;

	return (
		<Paper variant="outlined" className={classes.root}>
			<Grid container>
				<Grid item xs={12} md={8}>
					<Box className={classes.imgBox}>
						<img className={classes.img} src={header_image} alt={name} />
					</Box>
				</Grid>
				<Grid item xs={12} md={4}>
					<Box padding={2}>
						<Typography component="h6" variant="button">
							{name}
						</Typography>
            <Typography paragraph variant="caption">
              {`Released ${release_date}`}
            </Typography>
						<Grid item>{short_description}</Grid>
					</Box>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default GameListItem;
