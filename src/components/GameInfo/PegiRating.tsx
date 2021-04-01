import React from "react";
import {Box, Grid, Paper} from "@material-ui/core";

function PegiRating(props: any) {

    if (props.requiredAge !== "0") {
        return (
            <Grid item>
                <Paper variant="outlined">
                    <Box p={1}>
                        <a href={"https://pegi.info/"}>
                            <img src={`/images/pegi/${props.requiredAge}.png`} alt={`pegi-${props.requiredAge} rating`}/>
                        </a>
                        <br/>
                        <span>Rating for: PEGI</span>
                    </Box>
                </Paper>
            </Grid>
        )
    }
    else return null
}

export default PegiRating
