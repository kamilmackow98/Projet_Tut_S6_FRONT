import { makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";

const useStyes = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
	},
}));

const Main = () => {
	const classes = useStyes();

	return (
		<>
			<Typography variant="h4" gutterBottom>Main Component !</Typography>
			<Paper className={classes.paper}>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo repellat vitae natus facilis qui quidem aliquam soluta, facere
				maiores fuga inventore ea sit, ipsum voluptatibus quisquam praesentium! Molestiae, dolorum laborum autem, ut dignissimos asperiores,
				ipsam quae doloremque reprehenderit quaerat mollitia pariatur deserunt nesciunt maxime cupiditate? Omnis, est. Et necessitatibus
				impedit, error quas alias facilis eveniet cumque facere ipsam autem minima maxime, obcaecati dicta ipsum asperiores molestiae? Id
				vitae voluptate ducimus in facilis quae, assumenda natus qui esse doloremque provident incidunt! Dolor veniam dolorem at natus in
				facilis dignissimos a doloribus cupiditate. Quidem molestias sunt magni delectus harum aliquam libero? Inventore!
			</Paper>
		</>
	);
};

export default Main;
