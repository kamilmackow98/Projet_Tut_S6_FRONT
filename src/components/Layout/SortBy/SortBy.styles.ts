import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
        sortByContainer: {
            width: "100%",
            marginTop: "10px",
            marginBottom: "20px"
        },
        sortBySelect: {
            width: "100%",

            "& .MuiTypography-root": {
                overflow: "hidden",
                textOverflow: "ellipsis",
            }
        },
        sortBySwitch: {
            marginLeft: "10px",
            marginTop: "8px"
        }
	})
);