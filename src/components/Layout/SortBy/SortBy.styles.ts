import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
        sortByContainer: {
            width: "100%",
            marginTop: "10px",
            marginBottom: "20px"
        },
        sortBySelect: {
            width: "100%"
        },
        sortBySwitch: {
            marginLeft: "10px",
            marginTop: "8px"
        }
	})
);