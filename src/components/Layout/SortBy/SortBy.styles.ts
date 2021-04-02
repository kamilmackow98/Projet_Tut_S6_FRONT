import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
        sortByContainer: {
            width: "100%",
            marginTop: "10px",
            marginBottom: "10px",
            marginLeft: "5px"
        },
        sortBySelect: {
            marginLeft: "10px",
            width: "100%"
        },
        sortBySwitch: {
            marginLeft: "10px"
        }
	})
);