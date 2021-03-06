import React from "react";
import { Box, Grid, Paper } from "@material-ui/core";

interface Props {
    requiredAge: number
}

const PegiRating: React.FC<Props> = ({ requiredAge }) => {

        return (
                requiredAge !== 0 ?
                <Grid item xs={12}>
                    <Paper variant="outlined">
                        <Box p={1}>
                            <a href={"https://pegi.info/"}>
                                <img src={`/images/pegi/${requiredAge}.png`} alt={`pegi-${requiredAge} rating`}/>
                            </a>
                        </Box>
                    </Paper>
                </Grid>
                : null
        )
}

export default PegiRating
