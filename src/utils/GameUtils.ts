export const gameScore = (
	positive_ratings: number,
	negative_ratings: number
) => {
	return (
		(positive_ratings / (positive_ratings + negative_ratings)) *
		100
	).toFixed(1);
};
