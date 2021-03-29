import { ClassNameMap } from "@material-ui/styles";

export interface UserType {
	authenticated: boolean;
}

type Screenshot = {
	id: number;
	path_thumbnail: string;
	path_full: string;
}

export interface IncompleteGameInfo {
	id: number;
	name: string;
	release_date: Date;
	english: boolean;
	developer: string[];
	publisher: string[];
	platforms: string[];
	required_age: number;
	categories: string[];
	genres: string[];
	steamspy_tags: string[];
	achievements: number;
	positive_ratings: number;
	negative_ratings: number;
	average_playtime: number;
	median_playtime: number;
	owners: string;
	price: number;
}

export interface CompleteGameInfo extends IncompleteGameInfo {
	detailed_description: string;
	about_the_game: string;
	short_description: string;
	pc_requirements?: string;
	mac_requirements?: string;
	linux_requirements?: string;
	minumum: string;
	recommended: string;
	header_image: string;
	screenshots: Screenshot[];
}

export interface HeadTableData {
	name: string;
	releaseDate: string;
	score: number;
}

export interface BodyTableData extends HeadTableData {
	id: number;
}

export interface HeadCell {
	id: keyof HeadTableData;
	label: string;
}

export type Order = "asc" | "desc";

export interface CustomTableProps {
	classes: ClassNameMap;
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof HeadTableData
	) => void;
	order: Order;
	orderBy: string;
}
