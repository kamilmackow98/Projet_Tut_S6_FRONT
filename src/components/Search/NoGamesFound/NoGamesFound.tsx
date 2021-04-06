import { Grid } from "@material-ui/core";
import NoGameFoundImage from '../../../assets/images/undraw_gaming.svg';
import { useStyles } from "../Search.styles";

const NoGamesFound = () => {
    const classes = useStyles();
	
	return (
        <Grid container justify="center" className={classes.noGamesFoundContainer}>
            <Grid item xs={12} sm={12} className={classes.noGamesFoundContainer}>
                <img className={classes.noGamesFoundImage} src={NoGameFoundImage} alt="Video game controller" /> 
            </Grid>
            <Grid item xs={12} sm={12} className={classes.noGamesFoundContainer}>
                <h3>No <span style={{color: 'primary' }}>games</span> found...</h3>
            </Grid>
        </Grid>
	);
};

export default NoGamesFound;
