import { Divider, Grid } from "@material-ui/core";
import React from "react";
import ChipList from "./ChipList";

interface Props {
    description: string,
    tags: string[],
    developer: string[],
    publisher: string[]
}

const BasicInfo: React.FC<Props> = ({
    description,
    tags,
    developer,
    publisher,
}) => {

    return (
        <Grid item>
            <p>{description}</p>
            <Divider/>
            <p><strong>Developer: </strong>{developer.join(", ")}</p>
            <Divider/>
            <p><strong>Publisher: </strong>{publisher.join(", ")}</p>
            <Divider/>

            <ChipList color={'primary'} tags={tags} />
        </Grid>
    )
}

export default BasicInfo
