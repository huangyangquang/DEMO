function sort(arr) {
	if(arr === null || arr.length === 0) return arr;
	var len = arr.length;
	for(var i = 0; i < len - 1; i ++) {
		var min = i;
		for(var j = i; j < len; j ++) {
			if(arr[j] < arr[min]) min = j;
		}
		var temp = arr[min];
		arr[min] = arr[i];
		arr[i] = temp;
	}
	return arr;
}
console.log( sort([1, 2, 22, 3, 0, 8, 6, 5, 5, 7, 7]) )

// https://www.cnblogs.com/onepixel/articles/7674659.html