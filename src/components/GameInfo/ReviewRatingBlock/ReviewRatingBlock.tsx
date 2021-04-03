import React from "react";
import { Box, Divider, Paper } from "@material-ui/core";
import { useStyles } from "../GameInfo.styles";
import ChipList from "../ChipList";

interface Props {
    positiveRatings: number,
    negativeRatings: number,
    genres: string[],
    categories: string[]
};

const ReviewRatingBlock: React.FC<Props> = ({ positiveRatings, negativeRatings, genres, categories }) => {

    const classes = useStyles();
    const ratingPercent: number = Math.round((positiveRatings / (positiveRatings + negativeRatings)) * 100);

    return (
        <Paper variant="outlined" className={classes.card}>
            <Box p={1}>
                <p className={`${ratingPercent} > 50 ? ${classes.greenText} : ${classes.redText}`}>
                    {ratingPercent}% positive reviews
                </p>
                <Divider />
                <p>Genres: </p>
                <ChipList color={'primary'} tags={genres} />
                <Divider />
                <p>Categories: </p>
                <ChipList color={'secondary'} tags={categories} />
            </Box>
        </Paper>
    )
}

export default ReviewRatingBlock
