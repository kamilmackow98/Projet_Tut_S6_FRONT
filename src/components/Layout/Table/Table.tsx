import {
	createStyles,
	makeStyles,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Theme,
	Typography,
	Link,
} from "@material-ui/core";
import React from "react";
import CustomTableHead from "./CustomTableHead";
import { BodyTableData, HeadTableData, Order } from "types";
import { Link as RouterLink } from "react-router-dom";

interface Props {
	data: BodyTableData[];
}

const CustomTable: React.FC<Props> = ({ data }) => {
	const classes = useStyles();
	const [order, setOrder] = React.useState<Order>("asc");
	const [orderBy, setOrderBy] = React.useState<keyof HeadTableData>("name");

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof HeadTableData
	) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	return (
		<Paper className={classes.root}>
			<TableContainer>
				<Table className={classes.table}>
					<CustomTableHead
						onRequestSort={handleRequestSort}
						classes={classes}
						orderBy={orderBy}
						order={order}
					/>
					<TableBody>
						{data.map((game) => (
							<TableRow hover key={game.id}>
								<TableCell>
									<Typography component="div">
										<Link
											color="inherit"
											component={RouterLink}
											to={`${game.id}`}
										>
											{game.name}
										</Link>
									</Typography>
								</TableCell>
								<TableCell>{game.releaseDate}</TableCell>
								<TableCell>{game.score}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: "100%",
		},
		paper: {
			width: "100%",
			marginBottom: theme.spacing(2),
		},
		table: {
			minWidth: 500,
			width: "100%",
		},
		visuallyHidden: {
			border: 0,
			clip: "rect(0 0 0 0)",
			height: 1,
			margin: -1,
			overflow: "hidden",
			padding: 0,
			position: "absolute",
			top: 20,
			width: 1,
		},
	})
);

export default CustomTable;
