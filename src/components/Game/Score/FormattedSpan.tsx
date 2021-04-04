import styles from "./GameScore.module.css";
import React from "react";

interface Props {
	rating: "bad" | "mediocre" | "good" | "great";
	score: number;
}

export const FormattedSpan: React.FC<Props> = ({ rating, score }) => {
	return (
		<span>
			<span>Score: </span>
			<span className={styles[rating]}>{`${score.toFixed(1)} %`}</span>
		</span>
	);
};

export default FormattedSpan;
