import { Select, Chip, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Platform } from "types";
import { useStyles } from "../Search.styles";

interface Props {
	onChangePlatforms: Function,
	mustClear: boolean
}

const SelectPlatformName: React.FC<Props> = ({ onChangePlatforms, mustClear }) => {

	const [platformNames, setPlatformNames] = useState<Platform[]>([]);
	const [platformNamePagination, setPlatformNamePagination] = useState(1);
	const [platformNamesChosen, setPlatformNamesChosen] = useState<Platform[]>([]);

	const platformNamesRef = React.useRef(platformNames);
	const classes = useStyles();

	useEffect(() => {
		platformNamesRef.current = platformNames;
	});

	useEffect(() => {
		if (mustClear) {
			setPlatformNamesChosen([]);
			onChangePlatforms(undefined);
		}
	}, [mustClear, onChangePlatforms]);
   
	useEffect(() => {
		fetch(`/api/platforms?page=${platformNamePagination}`)
		.then((res) => res.json())
		.then((platforms: Platform[]) => {
			const extendedPlatforms: Platform[] = platformNamesRef.current.concat(platforms);
			setPlatformNames(extendedPlatforms);
		})
		.catch((e) => console.error(e));
	}, [platformNamePagination]);
	
	return (
		<FormControl size="small" variant="outlined" className={classes.selectForm}>
        	<InputLabel id="demo-simple-select-outlined-label">Platforms</InputLabel>
			<Select
				MenuProps={{	
						PaperProps: {
							onScroll: (event: any) => {
								if ((event.target.scrollTop + event.target.clientHeight) === event.target.scrollHeight) {
									setPlatformNamePagination(platformNamePagination + 1);
								}
							}
						},
						style: { maxHeight: 300 },
						id: "id-menu",
						anchorOrigin: {
							vertical: "bottom",
							horizontal: "left"
						},
						getContentAnchorEl: null
				}}
				label="Platforms"
				value={platformNamesChosen}
				multiple
				onChange={(event) => { 
					onChangePlatforms(event.target.value);
					setPlatformNamesChosen((event.target.value as Platform[]));
				}}
				renderValue={(selected) => (
					<div className={classes.chips}>
						{React.Children.toArray(
							(selected as any).map((value: any) => (
								<Chip label={value} className={classes.chip} />
							))
						)}
					</div>
				)}
			>
				{platformNames.map((platform: Platform) => (
					<MenuItem value={platform.name} key={platform.name}>
					{platform.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default SelectPlatformName;

