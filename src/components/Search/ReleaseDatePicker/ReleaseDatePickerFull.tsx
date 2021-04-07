import { Grid } from "@material-ui/core";
import { useStyles } from "../Search.styles";
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { useEffect, useState } from "react";

interface Props {
    onChangeDateBeg: Function,
    onChangeDateEnd: Function,
    mustClear: boolean
}

const ReleaseDatePickerFull: React.FC<Props> = ({
    onChangeDateBeg,
    onChangeDateEnd,
    mustClear
}) => {
    const classes = useStyles();

    const [releaseDateBeg, setReleaseDateBeg] = useState<Date | null>(null);
    const [releaseDateEnd, setReleaseDateEnd] = useState<Date | null>(null);
    
    const handleReleaseDateBegChange = (date: Date) => { onChangeDateBeg(date); setReleaseDateBeg(date); }
    const handleReleaseDateEndChange = (date: Date) => { onChangeDateEnd(date); setReleaseDateEnd(date); }

    useEffect(() => {
        if (mustClear) {
            setReleaseDateBeg(null);
            setReleaseDateEnd(null);
            onChangeDateBeg(null);
            onChangeDateEnd(null);
        }
    }, [mustClear, onChangeDateBeg, onChangeDateEnd]);
	
	return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={12} sm={4}>
                <KeyboardDatePicker
                    className={`${classes.removeBottomSpace} ${classes.datepickerInput}`}
                    margin="normal"
                    size="small" 
                    inputVariant="outlined"
                    value={releaseDateBeg}
                    label="Release date from"
                    format="MM/dd/yyyy"
                    onChange={(date) => handleReleaseDateBegChange(date as Date)}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <KeyboardDatePicker
                    size="small" 
                    className={`${classes.removeBottomSpace} ${classes.datepickerInput}`}
                    margin="normal"
                    inputVariant="outlined"
                    label="Release date to"
                    format="MM/dd/yyyy"
                    value={releaseDateEnd}
                    onChange={(date) => handleReleaseDateEndChange(date as Date)}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
	);
};

export default ReleaseDatePickerFull;
