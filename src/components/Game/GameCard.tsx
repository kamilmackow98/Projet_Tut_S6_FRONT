import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./GameCard.styles";

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

export default GameCard;
