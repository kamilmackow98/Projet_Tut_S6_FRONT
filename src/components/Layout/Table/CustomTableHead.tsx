import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { ClassNameMap } from "@material-ui/styles";
import { HeadTableData, Order } from "types";
import { headerCells } from "./Table.config";
import React from "react";

interface Props {
	classes: ClassNameMap;
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof HeadTableData
	) => void;
	order: Order;
	orderBy: string;
}

const CustomTableHead: React.FC<Props> = (props) => {
	const { order, orderBy, onRequestSort } = props;

	const createSortHandler = (property: keyof HeadTableData) => (
		event: React.MouseEvent<unknown>
	) => {
		onRequestSort(event, property);
	};

	const headerCellsMap = headerCells.map((cell) => (
		<TableCell
			sortDirection={orderBy === cell.id ? order : false}
			key={cell.id}
		>
			<TableSortLabel
				direction={orderBy === cell.id ? order : "asc"}
				onClick={createSortHandler(cell.id)}
				active={orderBy === cell.id}
			>
				{cell.label}
			</TableSortLabel>
		</TableCell>
	));

	return (
		<TableHead>
			<TableRow>{headerCellsMap}</TableRow>
		</TableHead>
	);
};

export default CustomTableHead;
