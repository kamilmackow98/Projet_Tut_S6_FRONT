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
        height: "300px",
        width: "100%"
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
    }
}));
