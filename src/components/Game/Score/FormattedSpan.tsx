import styles from "./GameScore.module.css";
import React from "react";

interface Props {
	label?: string;
	direction?: "left" | "right";
	rating: "bad" | "mediocre" | "good" | "great";
	score: number;
}

export const FormattedSpan: React.FC<Props> = ({
	label,
	direction = "left",
	rating,
	score,
}) => {
	const labelSpan = <span>{label}</span>;

	return (
		<span className={styles[rating]}>
			{label && direction === "left" && labelSpan}
			{" "}
			<span>{`${score.toFixed(1)}%`}</span>
			{" "}
			{label && direction === "right" && labelSpan}
		</span>
	);
};

export default FormattedSpan;
