export function countOccurrences(array: string[]) {
	return array.reduce(function (acc: any, curr) {
		acc[curr] ? acc[curr]++ : (acc[curr] = 1);

		return acc;
	}, {});
}

export function getRandomFromArray(arr: string[]) {
	return arr[Math.floor(Math.random() * arr.length)];
}
