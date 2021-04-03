import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    redText: {
        color: "red"
    },
    greenText: {
        color: "#4bc57c"
    },
    headerImage: {
        maxWidth: "300px"
    },
    headerName: {
        margin: "2px"
    },
    titleContainer: {
        marginLeft: "5px"
    },
    carouselImage: {
        height: "100%",
        width: "100%"
    },
    screenshotContainer: {
        display: "flex", 
        backgroundColor: "black",
        height: "100%"
    },
    chips: {
        marginTop: "10px",
        marginBottom: "10px"
    },
    thumbnail: {
        height: "50px",
        width: "50px"
    },
    thumbnailContainer: {
        display: "flex",
        flexDirection: "row"
    },
    detailedDescription: {
        marginTop: "10px"
    },
    card: {
        padding: "10px"
    },
    cardTitle: {
        marginBottom: "5px"
    },
    bottomContainer: {
        marginTop: "10px"
    },
    carouselContainer: {
        marginTop: "10px"
    },
    releaseDateContainer: {
        margin: "0",
        padding: "0"
    },
    releaseDateTitle: {
        margin: "0",
        padding: "0",
        marginLeft: "5px"
    },
    playerWrapper: {
        position: "relative",
        paddingTop: "56.25%" /* Player ratio: 100 / (1280 / 720) */
    },
    reactPlayer: {
        position: "absolute",
        top: 0,
        left: 0
    }
}));
