import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			// padding: theme.spacing(2),
		},
		imgBox: {
			// width: "100%",
			[theme.breakpoints.down("sm")]: {
				// marginBottom: theme.spacing(2)
			}
		},
		img: {
			// borderTopLeftRadius: 4,
			// borderTopRightRadius: 4,
			objectPosition: "center",
			maxWidth: "100%",
		},
		paper: {
			// display: "flex",
		},
		gridContainer: {
			padding: theme.spacing(2),
		}
	})
);
