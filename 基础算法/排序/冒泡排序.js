function sort(arr) {
	if(arr === null || arr.length === 0) return;
	var len = arr.length;
	for(var i = 0; i < len - 1; i ++) { // 比较的次数／圈数
		for(var j = 0; j < len - 1 - i; j ++) {
			if(arr[j] > arr[j + 1]) { // 比较相邻的数
				var temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
			}
		}
	}
	return arr;
}
console.log( sort([1, 3, 5, 0, 2, 98, 78, 100, 40, 0, 2, 3]) );

// https://www.cnblogs.com/onepixel/articles/7674659.html