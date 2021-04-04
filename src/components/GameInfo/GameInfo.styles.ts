import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
	redText: {
		color: "red",
	},
	greenText: {
		color: "#4bc57c",
	},
	headerImage: {
		maxWidth: "300px",
	},
	headerName: {
		margin: "2px",
	},
	titleContainer: {
		marginLeft: "5px",
	},
	carouselImage: {
		position: "absolute",
		objectFit: "cover",
		height: "100%",
		width: "100%",
		left: 0,
		top: 0,
	},
	screenshotContainer: {
		paddingTop: "56.25%",
		position: "relative",
		display: "flex",
		// height: "100%",
		// width: "100%",
		// alignContent: "flex-start",
		// alignItems: "flex-start",
		// justifyContent: "flex-start"
	},
	chips: {
		marginTop: "10px",
		marginBottom: "10px",
	},
	thumbnail: {
		objectPosition: "center",
		objectFit: "cover",
		height: "50px",
		width: "100%",

		// width: "50px"
	},
	thumbnailContainer: {
		// flexDirection: "row",
		// display: "flex",

		"& $screenshotContainer": {
			padding: 0,
		},

        "& .alice-carousel__stage-item": {
            border: "1px solid #FAFAFA",
        }
	},
	detailedDescription: {
		marginTop: "10px",
	},
	card: {
		padding: "10px",
	},
	cardTitle: {
		marginBottom: "5px",
	},
	bottomContainer: {
		marginTop: "10px",
	},
	carouselContainer: {
		marginTop: theme.spacing(2),
		// marginTop: "10px",

		"& .alice-carousel__wrapper": {
			backgroundColor: "black !important",
		},
	},
	releaseDateContainer: {
		margin: "0",
		padding: "0",
	},
	releaseDateTitle: {
		margin: "0",
		padding: "0",
		marginLeft: "5px",
	},
	playerWrapper: {
		paddingBottom: "56.25%" /* Player ratio: 100 / (1280 / 720) */,
		position: "relative",
		display: "flex",
	},
	reactPlayer: {
		height: "100% !important",
		width: "100% !important",
		position: "absolute",
	},
}));
