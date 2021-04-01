import React from "react";
import {Box, Divider, Paper, Tab, Tabs, Typography} from "@material-ui/core";

function Requirements(props: any) {

    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Paper variant="outlined" style={{marginTop: "10px"}} >
            <Box p={1}>
                <Typography variant="h6">System requirements</Typography>
                <Divider style={{marginTop: "10px"}} />
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="tabs requirements"
                >
                    {/* une section requirements vide sera: [{}] et renverra un type 'object' */}
                    { typeof props.pcRequirements[0] === 'undefined' &&
                    <Tab label="Windows" {...a11yProps(0)} />
                    }
                    { typeof props.macRequirements[0] === 'undefined' &&
                    < Tab label="Mac OS" {...a11yProps(1)} />
                    }
                    { typeof props.linuxRequirements[0] === 'undefined' &&
                    <Tab label="Linux" {...a11yProps(2)} />
                    }
                </Tabs>
                <TabPanel value={value} index={0}>
                    {props.pcRequirements}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {props.macRequirements}
                </TabPanel>
                <TabPanel value={value} index={2}>
                    {props.linuxRequirements}
                </TabPanel>
            </Box>
        </Paper>
    )
}

function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {children.minimum != null &&
                <ul dangerouslySetInnerHTML={{__html:replaceAll(children.minimum)}}>
                </ul>
            }
            {children.recommended != null &&
                <ul dangerouslySetInnerHTML={{__html:replaceAll(children.recommended)}}>
                </ul>
            }
        </Typography>
    );
}

function a11yProps(index: number) {
    return {
        id: `scrollable-auto-tab-${index}`,
        "aria-controls": `scrollable-auto-tabpanel-${index}`
    };
}

function replaceAll(htmlString: string) {
    let str = htmlString.replace(/\\t/g,"");
    str = str.replace(/\\n/g,"");
    str = str.replace(/\\r/g,"");

    return str;
}

export default Requirements

