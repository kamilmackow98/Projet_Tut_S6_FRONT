import React from "react";
import {Box, Divider, Grid, Paper} from "@material-ui/core";
import ChipList from "./ChipList";

function ReviewRatingBlock(props: any) {

    // Calculation of the % of positive reviews
    let ratingPercent: number = ((
        props.positiveRatings / (JSON.parse(props.positiveRatings) + JSON.parse(props.negativeRatings)) * 100
    ).toFixed(0) as unknown as number)

    // Dynamic style according to % of positive reviews
    let ratingStyle = {}
    if (ratingPercent < 70 && ratingPercent > 39) {
        ratingStyle = {
            color: "#b9a074" // beige
        }
    }
    else if (ratingPercent < 40 ) {
        ratingStyle = {
            color: "#a34c25" // red
        }
    }
    else {
        ratingStyle = {
            color: "#66c0f4" // lightblue
        }
    }

    return (
        <Grid item>
            <Paper variant="outlined">
                <Box p={1}>
                    <p style={ratingStyle}>{ratingPercent}% positive reviews</p>
                    <Divider />
                    <p>Genres: </p>
                    <ChipList elements = {props.genres} />
                    <br/>
                    <Divider />
                    <p>Categories: </p>
                    <ChipList elements = {props.categories} />
                </Box>
            </Paper>
        </Grid>
    )
}

export default ReviewRatingBlock
