import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { ClassNameMap } from "@material-ui/styles";
import { headerCells } from "./Table.config";
import React from "react";

interface Props {
	classes: ClassNameMap;
}

const CustomTableHead: React.FC<Props> = ({ classes }) => {
	const headerCellsMap = headerCells.map((cell) => (
		<TableCell key={cell.id}>{cell.label}</TableCell>
	));

	return (
		<TableHead>
			<TableRow>{headerCellsMap}</TableRow>
		</TableHead>
	);
};

export default CustomTableHead;
