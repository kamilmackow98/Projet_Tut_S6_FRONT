import FormattedSpan from "./FormattedSpan";
import React from "react";

interface Props {
	score: number;
}

const GameScore: React.FC<Props> = ({ score }) => {
	switch (true) {
		case score < 25:
			return <FormattedSpan rating="bad" score={score} />;

		case score < 50:
			return <FormattedSpan rating="mediocre" score={score} />;

		case score < 75:
			return <FormattedSpan rating="good" score={score} />;

		case score <= 100:
			return <FormattedSpan rating="great" score={score} />;

		default:
			return null;
	}
};

export default GameScore;
