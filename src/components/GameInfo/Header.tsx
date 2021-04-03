import React from "react"
import { Grid } from '@material-ui/core';
import ChipList from "./ChipList";
import { useStyles } from "./GameInfo.styles";

interface Props {
    headerImage: string,
    name: string,
    platforms: string[],
    releaseDate: Date
};

const Header: React.FC<Props> = ({ headerImage, name, platforms, releaseDate }) => {

    const classes = useStyles(); 
    const options: any = { year: 'numeric', month: 'short', day: 'numeric' };
    
    return (
        <Grid container spacing={0} justify="center">
            <Grid item xs={12} sm={7} md={4} lg={3}>
                <img className={classes.headerImage} src={headerImage} alt={"header_image"}/>
            </Grid>
            <Grid item xs={12} sm={5} md={8} lg={9}>
                <Grid className={classes.titleContainer} container direction="column">
                    <Grid item sm={12}>
                        <h1 className={classes.headerName}>{name}</h1>
                    </Grid>
                    <Grid className={classes.releaseDateContainer} item sm={12}>
                        <h3 className={classes.releaseDateTitle}>Released: {(new Date(releaseDate)).toLocaleDateString('fr-FR', options)}</h3>
                    </Grid>
                    <Grid item sm={12}>
                        <ChipList color={'secondary'} tags={platforms} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Header
