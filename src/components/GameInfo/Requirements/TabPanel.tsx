import React from "react";
import { Typography } from "@material-ui/core";

interface Props {
    recommended?: string,
    minimum?: string,
    value: any,
    index: number
};

const TabPanel: React.FC<Props> = ({ recommended, minimum, value, index }) => {

    const replaceAll = (htmlString: string) => {
        return htmlString.replace(/\\t/g,"\t").replace(/\\n/g,"\n").replace(/\\r/g,"\r");
    };

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
        >
            {minimum != null && <ul dangerouslySetInnerHTML={{__html: replaceAll(minimum)}}></ul> }
            {recommended != null && <ul dangerouslySetInnerHTML={{__html: replaceAll(recommended)}}></ul>}
        </Typography>
    );
}

export default TabPanel;