import {
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
} from "@material-ui/core";
import React from "react";
import { CustomTableProps, HeadTableData } from "types";
import { headerCells } from "./TableConfig";

const CustomTableHead: React.FC<CustomTableProps> = (props) => {
	const { order, orderBy, onRequestSort } = props;

	const createSortHandler = (property: keyof HeadTableData) => (
		event: React.MouseEvent<unknown>
	) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{headerCells.map((cell) => (
					<TableCell
						key={cell.id}
						sortDirection={orderBy === cell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === cell.id}
							direction={orderBy === cell.id ? order : "asc"}
							onClick={createSortHandler(cell.id)}
						>
							{cell.label}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
};

export default CustomTableHead;
