import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface StyleProps {
	header_image: string;
}

export const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) =>
	createStyles({
		root: {
			overflow: "hidden",
		},

		imgPaper: {
			position: "absolute",
			bottom: theme.spacing(1),
			left: theme.spacing(1),
			display: "flex",
			padding: 7,
			// background: "rgb(20, 20, 20)"
		},
		img: (props) => ({
			background: `url(${props.header_image})`,
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center",
			backgroundSize: "cover",
			paddingBottom: "46.7%", // Steam's header image ratio 215 / 460
			height: "100%",
			width: "100%",
		}),
		contentBox: {
			[theme.breakpoints.up("md")]: {
				flexDirection: "column",
				display: "flex",
				height: "100%",
			},
		},
		contentTitle: {
			overflow: "hidden",
			textOverflow: "ellipsis",
		},
		description: {
			MozBoxOrient: "vertical",
		},
		platforms: {
			marginTop: "auto",
			flex: 0,
		},
		platform: {
			objectFit: "cover",
			width: 20,

			"&$platform ~ $platform": {
				marginLeft: 7,
			},
		},
	})
);
