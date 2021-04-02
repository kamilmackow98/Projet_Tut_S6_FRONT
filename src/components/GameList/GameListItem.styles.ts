import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface StyleProps {
	header_image: string;
}

export const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) =>
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
		img: (props) => ({
			// borderTopLeftRadius: 4,
			// borderTopRightRadius: 4,
			background: `url(${props.header_image})`,
			objectPosition: "center",
			maxWidth: "100%",
		}),
		paper: {
			// display: "flex",
		},
		gridContainer: {
			padding: theme.spacing(2),
		}
	})
);
