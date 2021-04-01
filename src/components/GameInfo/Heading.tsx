import React from "react"
import {Grid} from '@material-ui/core';
import ChipList from "./ChipList";

function Heading(props: any) {

    return (
        <Grid container>
            <Grid item md={3}>
                <img src={props.headerImage} style={{width: '95%'}} alt={"header_image"}/>
            </Grid>
            <Grid item container direction="column" md={7} spacing={0}>
                <Grid item>
                    <h1>{props.name}</h1>
                </Grid>

                {/* Grid element containing a list of platform chips */}
                <ChipList
                    elements = {props.platforms}
                    color = {"primary"}
                />
                <br/>
            </Grid>
        </Grid>
    )
}

export default Heading
