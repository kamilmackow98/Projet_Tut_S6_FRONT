import { Divider, Grid } from "@material-ui/core";
import React from "react";
import { TagCloud } from 'react-tagcloud';

interface Props {
    description: string,
    tags: any[],
    developer: string[],
    publisher: string[]
};

const BasicInfo: React.FC<Props> = ({
    description,
    tags,
    developer,
    publisher,
}) => {
    const options = {
        luminosity: 'dark',
        hue: '#3a79ff',
    };
      
    return (
        <Grid item>
            <p>{description}</p>
            <Divider/>
            <p><strong>Developer: </strong>{developer.join(", ")}</p>
            <Divider/>
            <p><strong>Publisher: </strong>{publisher.join(", ")}</p>
            <Divider/>

            <TagCloud
                minSize={12}
                maxSize={35}
                tags={tags}
                shuffle={false}
                colorOptions={options}
            />
        </Grid>
    )
}

export default BasicInfo
