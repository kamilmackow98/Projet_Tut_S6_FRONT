import {Divider, Grid} from "@material-ui/core";
import React from "react";
import ChipList from "./ChipList";

function BasicInfo(props: any) {

    // reformatting of the date
    const options: any = { year: 'numeric', month: 'short', day: 'numeric'};
    let releaseDate = (new Date(props.releaseDate)).toLocaleDateString('fr-FR', options)

    return (
        <Grid item container direction="column" xs={12} md={5}>
            <Grid item>
                <p>{props.description}</p>
                <Divider/>
                <p><strong>Release date: </strong>{releaseDate}</p>
                <Divider/>
                <p><strong>Developer: </strong>{props.developer.join(", ")}</p>
                <Divider/>
                <p><strong>Publisher: </strong>{props.publisher.join(", ")}</p>
            </Grid>
            <Divider/>
            <br/>
            {/* Grid element containing a list of tag chips */}
            <ChipList
                elements = {props.tags}
            />
        </Grid>
    )
}

export default BasicInfo
