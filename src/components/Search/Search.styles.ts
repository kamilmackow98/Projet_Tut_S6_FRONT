import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
	buttonContainer: {
        "& > button": {
            [theme.breakpoints.down("xs")]: {
                minWidth: 0,
                padding: 0,
                width: 40,
            },
            marginLeft: "5px",
            marginRight: "10px",
            height: "100%",
            color: "white"
        },
    },
    selectForm: {
        width: "100%"
    }, textfieldInput: {
        width: "100%"
    }, datepickerInput: {
        width: "100%"
    },
    removeBottomSpace: {
        marginBottom: "0px",
        paddingBottom: "0px !important"
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    gridButtonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    paginationContainer: {
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        marginTop: "20px",
        marginBottom: "20px"
    },
    noGamesFoundImage: {
        width: "250px"
    },
    noGamesFoundContainer: {
        display: "flex",
        justifyContent: "center"
    },
    gridSwitchDateContainer: {
        display: "flex",
        flexDirection: "row",
        marginTop: "15px"
    },
    iconButtons: {
        alignSelf: "center"
    },
    libraryTitle: {
        marginLeft: "5px",
        fontSize: "1.5em"
    },
    clearFormButton: {
        color: '#bd3922'
    }
}));
