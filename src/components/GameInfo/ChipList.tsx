import React from "react";
import { Chip, Grid } from "@material-ui/core";
import { useStyles } from "./GameInfo.styles";

interface Props {
    tags: string[],
    color?: "primary" | "secondary" | "default" | undefined
};

const ChipList: React.FC<Props> = ({ tags, color }) => {

    const classes = useStyles();
    
    return (
        <Grid className={classes.chips} item container spacing={1}>
            {tags.map((tag) => (
                <Grid item key={tag}>
                    <Chip color={color} label={tag} />
                </Grid>
            ))}
        </Grid>
    )
};

export default ChipList;
