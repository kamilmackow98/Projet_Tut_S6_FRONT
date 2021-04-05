import FormattedSpan from "./FormattedSpan";
import React from "react";

interface Props {
	label?: string;
	direction?: "left" | "right";
	score: number;
}

const GameScore: React.FC<Props> = ({ label, direction = "left", score }) => {
	switch (true) {
		case score < 25:
			return (
				<FormattedSpan
					label={label}
					direction={direction}
					rating="bad"
					score={score}
				/>
			);

		case score < 50:
			return (
				<FormattedSpan
					label={label}
					direction={direction}
					rating="mediocre"
					score={score}
				/>
			);

		case score < 75:
			return (
				<FormattedSpan
					label={label}
					direction={direction}
					rating="good"
					score={score}
				/>
			);

		case score <= 100:
			return (
				<FormattedSpan
					label={label}
					direction={direction}
					rating="great"
					score={score}
				/>
			);

		default:
			return null;
	}
};

export default GameScore;
