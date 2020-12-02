function mergeSort(arr) {
	if(arr === null || arr.length < 2) return arr;

	var mid = Math.floor(arr.length / 2),
		left = arr.slice(0, mid),
		right = arr.slice(mid, arr.length);

	return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
	var res = [];

	while(left.length > 0 && right.length > 0) {

		if(left[0] <= right[0]) {
			res.push(left.shift());
		} else {
			res.push(right.shift());
		}

	}

	if(left.length) {
		res.push(...left);
	}

	if(right.length) {
		res.push(...right);
	}

	return res;
}

console.log( mergeSort([1, 5, 4, 66, 32, 22, 54, 33]) )






























