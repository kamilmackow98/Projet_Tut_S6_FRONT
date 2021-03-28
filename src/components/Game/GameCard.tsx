import {
	Card,
	CardActionArea,
	CardActions,
	CardMedia,
	makeStyles,
	Theme,
	Typography,
} from "@material-ui/core";

interface Props {
	name?: string;
	header_image: string;
	disableAnimation?: boolean;
}

const GameCard: React.FC<Props> = ({
	name,
	header_image,
	disableAnimation = false,
}) => {
	const classes = useStyles({ disableAnimation });

	return (
		<Card elevation={5} className={classes.root}>
			<CardActionArea>
				<CardMedia className={classes.media} image={header_image} />
			</CardActionArea>
			{name && (
				<CardActions className={classes.cardActions}>
					<Typography noWrap variant="button" className={classes.title}>
						{name}
					</Typography>
				</CardActions>
			)}
		</Card>
	);
};

interface StyleProps {
	disableAnimation: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
	root: (props) => ({
		transform:
			"matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1) scale(1) translateZ(0)",
		WebkitBackfaceVisibility: "hidden",
		backfaceVisibility: "hidden",
		position: "relative",
		transition: "0.3s",

		"&::after": {
			background:
				"linear-gradient(to top, transparent, rgba(255, 255, 255, 0.75) 15%, rgba(255, 255, 255, 0.5))",
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

		"&:hover": props.disableAnimation
			? {
					"&::after": {
						transform: "rotate(15deg)",
						opacity: 0.2,
						top: "-25%",
					},
			  }
			: {
					transform:
						"matrix3d(1, 0, 0, 0, 0, 1, 0, -0.00004, 0, 0, 1, 0, 0, 0, 0, 1) scale(1.01) translateZ(0)",
					boxShadow: theme.shadows[20],

					"&::after": {
						transform: "rotate(15deg)",
						opacity: 0.2,
						top: "-25%",
					},
			  },
	}),
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