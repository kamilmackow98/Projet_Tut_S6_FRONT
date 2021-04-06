import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import React from "react";

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		"& ~ $paper": {
			marginTop: theme.spacing(2),
		},
	},
	code: {
		backgroundColor: "lightblue",
	},
}));

const Protected: React.FC = () => {
	const classes = useStyles();

	return (
		<>
			<Typography variant="h4" gutterBottom>
				Protected Component !
			</Typography>
			<Container disableGutters>
				<Paper className={classes.paper}>
					Logged !
				</Paper>
				<Paper className={classes.paper}>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam
					animi quis quaerat, voluptates molestiae, vitae quasi officia id
					corporis, quo quam exercitationem omnis alias laudantium? Lorem ipsum
					dolor sit amet consectetur adipisicing elit. Consequatur tempora
					impedit illum explicabo minus quibusdam unde, assumenda accusamus
					voluptatibus aut magnam odit ad accusantium est consectetur, tenetur
					placeat labore dolor!
				</Paper>
			</Container>
		</>
	);
};

export default Protected;
