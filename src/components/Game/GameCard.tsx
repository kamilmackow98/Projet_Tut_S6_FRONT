import { Card, CardActionArea, CardActions, CardMedia, makeStyles, Typography } from "@material-ui/core";
import { IncompleteGameInfo } from "../../types";

interface Props extends IncompleteGameInfo {
	header_image: string;
}

const GameCard = (props: Props) => {
	const classes = useStyles();

	return (
		<Card elevation={5} className={classes.root}>
			<CardActionArea>
				<CardMedia className={classes.media} image={props.header_image} title={props.name} />
			</CardActionArea>
			<CardActions className={classes.cardActions}>
				<Typography noWrap variant="button" className={classes.title}>
					{props.name} [{props.id}]
				</Typography>
			</CardActions>
		</Card>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		transform: "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1) scale(1) translateZ(0)",
		WebkitBackfaceVisibility: "hidden",
		backfaceVisibility: "hidden",
		position: "relative",
		transition: "0.3s",

		"&::after": {
			background: "linear-gradient(to top, transparent, rgba(255, 255, 255, 0.75) 15%, rgba(255, 255, 255, 0.5))",
			transition: "all 0.3s",
			transform: "rotate(20deg)",
			pointerEvents: "none",
			position: "absolute",
			userSelect: "none",
			height: "100%",
			width: "180%",

			content: '""',
			opacity: 0.15,
			left: "-20px",
			top: "-60%",
			zIndex: 10,
		},

		"&:hover": {
			transform: "matrix3d(1, 0, 0, 0, 0, 1, 0, -0.00004, 0, 0, 1, 0, 0, 0, 0, 1) scale(1.01) translateZ(0)",
			boxShadow: theme.shadows[20],

			"&::after": {
				transform: "rotate(15deg)",
				opacity: 0.2,
				top: "-25%",
			},
		},
	},
	container: {
		padding: theme.spacing(2),
		height: "100%",
	},
	media: {
		paddingBottom: "46.7%", // Steam's header image ratio : 215px / 460px
	},
	cardActions: {
		padding: theme.spacing(1),
	},
	title: {
		padding: theme.spacing(1),
	},
}));

export default GameCard;
