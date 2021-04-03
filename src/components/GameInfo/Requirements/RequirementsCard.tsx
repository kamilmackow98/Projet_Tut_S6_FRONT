import React from "react";
import { Box, Divider, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import TabPanel from "./TabPanel";
import { Requirements } from "types";
import { useStyles } from "../GameInfo.styles";

interface Props {
    pcRequirements: Requirements | undefined,
    macRequirements: Requirements | undefined,
    linuxRequirements: Requirements | undefined
}

const RequirementsCard: React.FC<Props> = ({ pcRequirements, macRequirements, linuxRequirements }) => {

    const [value, setValue] = React.useState(0);
    const classes = useStyles();
    
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const tabProps = (index: number) => {
        return {
            id: `scrollable-auto-tab-${index}`,
            "aria-controls": `scrollable-auto-tabpanel-${index}`
        };
    };

    return (
        <Paper className={classes.card} variant="outlined">
            <Box p={1}>
                <Typography className={classes.cardTitle} variant="h6">System requirements</Typography>
                <Divider />
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="tabs requirements"
                >
                    { pcRequirements && typeof pcRequirements !== 'undefined' && <Tab label="Windows" {...tabProps(0)} /> }
                    { macRequirements && typeof macRequirements !== 'undefined' && <Tab label="Mac OS" {...tabProps(1)} /> }
                    { linuxRequirements && typeof linuxRequirements !== 'undefined' && <Tab label="Linux" {...tabProps(2)} /> }
                </Tabs>
                <TabPanel value={value} index={0} minimum={pcRequirements?.minimum} recommended={pcRequirements?.recommended} />
                <TabPanel value={value} index={1} minimum={macRequirements?.minimum} recommended={macRequirements?.recommended} />
                <TabPanel value={value} index={2} minimum={linuxRequirements?.minimum} recommended={linuxRequirements?.recommended} />
            </Box>
        </Paper>
    )
}

export default RequirementsCard;

