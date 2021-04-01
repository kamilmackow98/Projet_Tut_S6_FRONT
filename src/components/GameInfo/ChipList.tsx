import React from "react";
import {Chip, Grid} from "@material-ui/core";

function ChipList(props: any) {

    // array of Grid and Chip elements
    let elements: JSX.Element[] = [];
    for (let i = 0; i < props.elements.length; i++) {
        elements.push(
            <Grid item key={i}>
                <Chip label={props.elements[i]} color={props.color} />
            </Grid>
        )
    }

    return (
        <Grid item container spacing={1} style={props.style}>
            {elements}
        </Grid>
    )
}

export default ChipList
