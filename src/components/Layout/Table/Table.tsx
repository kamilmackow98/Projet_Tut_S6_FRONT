import TableContainer from "@material-ui/core/TableContainer";
import Typography from "@material-ui/core/Typography";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import Link from "@material-ui/core/Link";
import { CompleteGameInfo } from "types";
import { Link as RouterLink } from "react-router-dom";
import CustomTableHead from "./CustomTableHead";
import { useStyles } from "./Table.styles";
import React from "react";

const score = (positive_ratings: number, negative_ratings: number) => {
	return (
		(positive_ratings / (positive_ratings + negative_ratings)) *
		100
	).toFixed(1);
};

interface Props {
	data: CompleteGameInfo[];
}

const CustomTable: React.FC<Props> = ({ data }) => {
	const classes = useStyles();

	data.forEach((obj) => {
		obj.release_date = new Date(obj.release_date);
	}, data);

	const dataMap = data.map((game) => (
		<TableRow hover key={game.id}>
			<TableCell>
				<Typography component="div">
					<Link color="inherit" component={RouterLink} to={`game/${game.id}`}>
						{game.name}
					</Link>
				</Typography>
			</TableCell>
			<TableCell>
				{game.release_date.toLocaleDateString("fr-FR", {
					timeZone: "America/New_York",
				})}
			</TableCell>
			<TableCell>
				{score(game.positive_ratings, game.negative_ratings)} %
			</TableCell>
		</TableRow>
	));

	return (
		<Paper className={classes.root}>
			<TableContainer>
				<Table className={classes.table}>
					<CustomTableHead classes={classes} />
					<TableBody>{dataMap}</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
};

export default CustomTable;
