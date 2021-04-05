import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import { useStyles } from "./GameCard.styles";

interface Props {
	id: number;
	name?: string;
	header_image: string;
	disableAnimation?: boolean;
}

const GameCard: React.FC<Props> = ({
	id,
	name,
	header_image,
	disableAnimation = false,
}) => {
	const classes = useStyles({ disableAnimation });

	return (
		<Card elevation={5} className={classes.root}>
			<Link className={classes.link} color="primary" to={`game/${id}`}>
				<CardActionArea>
					<CardMedia className={classes.media} image={header_image} />
				</CardActionArea>
			</Link>
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
