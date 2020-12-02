function sort(arr, left, right) {
	if(left >= right) {
		return;
	}

	var l = left,
		r = right,
		flag = arr[left],
		temp;

	while(l < r) {
		while(arr[r] >= flag && l < r) {
			r --;
		}

		while(arr[l] <= flag && l < r) {
			l ++;
		}

		if(l < r) {
			temp = arr[l];
			arr[l] = arr[r];
			arr[r] = temp;
		}
	}

	// r、l 都指向同一个索引
	arr[left] = arr[r];
	arr[r] = flag;

	sort(arr, left, r - 1);
	sort(arr, r + 1, right);

	return arr;
}

var arr = [7, 4, 56, 2, 89, 44, 55, 5, 6];
console.log( sort(arr, 0, arr.length - 1) );