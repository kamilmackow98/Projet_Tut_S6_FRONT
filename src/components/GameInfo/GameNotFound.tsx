import { Grid } from "@material-ui/core";
import NoGameFoundImage from '../../assets/images/undraw_not_found.svg';
import { useStyles } from "./GameInfo.styles";

const GameNotFound = () => {
    const classes = useStyles();
	
	return (
        <Grid container justify="center" className={classes.noGameFoundContainer}>
            <Grid item xs={12} sm={12} className={classes.noGameFoundContainer}>
               <img className={classes.noGameFoundImage} src={NoGameFoundImage} alt="404" />
            </Grid>
            <Grid item xs={12} sm={12} className={classes.noGameFoundContainer}>
                <h3>The game you were looking for was not found...</h3>
            </Grid>
        </Grid>
	);
};

export default GameNotFound;