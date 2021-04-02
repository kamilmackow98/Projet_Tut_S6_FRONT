import { useState } from "react";
import { Grid } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { useStyles } from "../Search.styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

interface Props {
    onChangeDateBeg: Function,
    onChangeDateEnd: Function
}

const ReleaseYearPicker: React.FC<Props> = ({
    onChangeDateBeg,
    onChangeDateEnd
}) => {
    const [releaseDateBeg, setReleaseDateBeg] = useState<string | null>(null);
    const [releaseDateEnd, setReleaseDateEnd] = useState<string | null>(null);
    
    const handleReleaseDateBegChange = (date: string) => { onChangeDateBeg(date); setReleaseDateBeg(date); }
    const handleReleaseDateEndChange = (date: string) => { onChangeDateEnd(date); setReleaseDateEnd(date); }
    
    const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid item xs={12} sm={4}>
            <DatePicker
                className={`${classes.removeBottomSpace} ${classes.datepickerInput}`}
                views={["year"]}
                label="Release date from"
                size="small" 
                margin="normal"
                inputVariant="outlined"
                value={releaseDateBeg}
                onChange={(date) => { handleReleaseDateBegChange(String(new Date(date as Date).getFullYear()))}} 
                animateYearScrolling
            />
        </Grid>
        <Grid item xs={12} sm={4}>
            <DatePicker
                className={`${classes.removeBottomSpace} ${classes.datepickerInput}`}
                views={["year"]}
                label="Release date to"
                margin="normal"
                size="small" 
                inputVariant="outlined"
                value={releaseDateEnd} 
                onChange={(date) => { handleReleaseDateEndChange(String(new Date(date as Date).getFullYear())) }}
                animateYearScrolling
            />
        </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default ReleaseYearPicker;