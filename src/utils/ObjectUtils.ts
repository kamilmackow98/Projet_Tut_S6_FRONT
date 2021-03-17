export function sortByOccurrences(obj: any) {
	const keysSorted = Object.keys(obj)
		.sort(function (a, b) {
			return obj[a] - obj[b];
		})
		.reverse();

	return keysSorted;
}
