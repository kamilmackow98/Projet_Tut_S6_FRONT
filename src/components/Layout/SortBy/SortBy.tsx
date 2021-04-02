import { Select, MenuItem, Grid, FormControl, InputLabel, Switch, ListItemText, OutlinedInput, FormControlLabel } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useStyles } from "./SortBy.styles";

interface Props {
    onFilterChange: Function
}

const SortBy: React.FC<Props> = ({ onFilterChange }) => {
    
    const [filterBy, setFilterBy] = useState<string | undefined>(undefined);
    const [isASC, setIsASC] = useState<boolean>(true);

    const handleFilterChange = (filter: string) => {
        onFilterChange({ sortBy: filter, isASC: isASC });
    }

    const handleSwitchChange = (newIsASC: boolean) => {
        onFilterChange({ sortBy: filterBy, isASC: newIsASC });
    }

    const classes = useStyles();
    const filters = [
        { name: 'Release date', value: 'release_date' },
        { name: 'Name', value: 'name' },
        { name: 'Developer', value: 'developer' },
        { name: 'Publisher', value: 'publisher' },
        { name: 'Required age', value: 'required_age' },
        { name: 'Positive reviews', value: 'positive_reviews' }
      ];

	return (
        <Grid container className={classes.sortByContainer}>
            <Grid item xs={6} sm={2}>
                <FormControl size="small" variant="outlined" className={classes.sortBySelect}>
                    <InputLabel id="demo-simple-select-outlined-label">Sort By</InputLabel>
                    <Select
                        label="Sort By"
                        MenuProps={{	
                                style: { maxHeight: 300 },
                                id: "id-menu",
                                anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "left"
                                },
                                getContentAnchorEl: null
                        }}
                        variant="outlined"
                        input={<OutlinedInput />}
                        onChange={(event) => { 
                            if (event) { 
                                handleFilterChange(event?.target.value as string); 
                                setFilterBy(event?.target.value as string);
                            }
                        }}
                    >
                        {filters.map((filter) => (
                            <MenuItem key={filter.value} value={filter.value}>
                                <ListItemText primary={filter.name} />
                            </MenuItem>
                        ))}
                    </Select>
		        </FormControl>
            </Grid>
            <Grid item xs={2} sm={2}>
            <FormControlLabel
                className={classes.sortBySwitch}
                control={
                <Switch
                    checked={isASC}
                    onChange={() => { setIsASC(!isASC); handleSwitchChange(!isASC); }}
                    name="checkedB"
                    color="secondary"
                />
                }
                label="ASC"
            />
            </Grid>
        </Grid>
		
	);
};

export default SortBy;
