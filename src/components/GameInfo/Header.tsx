import React from "react"
import { Grid, IconButton } from '@material-ui/core';
import ChipList from "./ChipList";
import { useStyles } from "./GameInfo.styles";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlinedIcon from '@material-ui/icons/RemoveCircleOutlined';

interface Props {
    headerImage: string,
    name: string,
    platforms: string[],
    releaseDate: Date,
    isInLibrary: boolean,
    isAuthenticated: boolean,
    onAddToLibrary: Function,
    onRemoveFromLibrary: Function
};

const Header: React.FC<Props> = ({ 
    headerImage, 
    name, 
    platforms, 
    releaseDate, 
    isInLibrary, 
    isAuthenticated,
    onAddToLibrary,
    onRemoveFromLibrary
}) => {

    const classes = useStyles(); 
    const options: any = { year: 'numeric', month: 'short', day: 'numeric' };

    const handleAddToLibrary = () =>  onAddToLibrary();
    const handleRemoveFromLibrary = () => onRemoveFromLibrary();
    
    return (
        <Grid container spacing={0} justify="center">
            <Grid item xs={12} sm={7} md={4} lg={3} className={classes.headerImageContainer}>
                <img className={classes.headerImage} src={headerImage} alt={"header_image"}/>
            </Grid>
            <Grid item xs={11} sm={4} md={7} lg={8}>
                <Grid className={classes.titleContainer} container direction="column">
                    <Grid item sm={12}>
                        <h1 className={classes.headerName}>{name}</h1>
                    </Grid>
                    <Grid className={classes.releaseDateContainer} item sm={12}>
                        <h3 className={classes.releaseDateTitle}>Released: {(new Date(releaseDate)).toLocaleDateString('en-EN', options)}</h3>
                    </Grid>
                    <Grid item sm={12}>
                        <ChipList color={'secondary'} tags={platforms} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={1} sm={1} md={1} lg={1} className={classes.addToLibraryContainer}>
                {
                    isAuthenticated && 
                    <IconButton onClick={() => { if (isInLibrary) handleRemoveFromLibrary() 
                                                else handleAddToLibrary()  }}>
                    { 
                        !isInLibrary && isAuthenticated
                        ? <AddCircleOutlineIcon color="secondary" />
                        : <RemoveCircleOutlinedIcon color="secondary" />
                    }
                    </IconButton>
                }
            </Grid>
        </Grid>
    )
}

export default Header;
