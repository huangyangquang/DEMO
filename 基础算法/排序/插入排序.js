function sort(arr) {
	if(arr === null || arr.length === 0) return arr;
	var len = arr.length,
		preIndex = 0,
		current = 0;

	for(var i = 1; i < len; i ++) {
		preIndex = i - 1;
		current = arr[i]; // 新值

		while(preIndex >= 0 && arr[preIndex] > current) { // 已排序的元素与新值进行比较
			arr[preIndex + 1] = arr[preIndex];
			preIndex --;
		}

		arr[preIndex + 1] = current;
	}

	return arr;
}
console.log( sort([1, 2, 45, 67, 3, 8, 5]) );
console.log( sort([1, 44, 45, 67, 3, 888, 5]) );
console.log( sort([1, 0, 44, 45, 67, 3, 888, 5]) );
 

// 2020.10.16 抄写
function sort(arr) {
	if(arr === null || arr.length === 0) return arr;
	var len = arr.length,
		preIndex = 0,
		current = 0;

	for(var i = 0; i < len; i ++) {
		preIndex = i - 1;
		current = arr[i];
		while(preIndex >= 0 && arr[preIndex] > current) {
			arr[preIndex + 1] = arr[preIndex];
			preIndex --;
		}
		arr[preIndex + 1] = current;
	}
	return arr;
}


// 2020.10.16 抄写
function sort(arr) {
	if(arr === null || arr.length === 0) return arr;
	var len = arr.length,
		preIndex = 0,
		current = 0;

	for(var i = 0; i < len; i ++) {
		preIndex = i - 1;
		current = arr[i];
		while(preIndex >= 0 && arr[preIndex] > current) {
			arr[preIndex + 1] = arr[preIndex];
			preIndex --;
		}
		arr[preIndex + 1] = current;
	}		
	return arr;
}


// 2020.10.16 抄写
function sort(arr) {
	if(arr === null || arr.length === 0) return arr;

	var len = arr.length,
		preIndex = 0,
		current = 0;

	for(var i = 0; i < len; i ++) {
		preIndex = i - 1;
		current = arr[i]; // 当前节点值
		while(preIndex >= 0 && arr[preIndex] > current) {
			arr[preIndex + 1] = arr[preIndex];
			preIndex --;
		}
		arr[preIndex + 1] = current;
	}
	return arr;
}


// 2020.10.16 默写（全对）
function sort(arr) {
	if(arr === null || arr.length === 0) return;

	var len = arr.length,
		preIndex = 0,
		cur = 0;

	for(var i = 0; i < len; i ++) {
		preIndex = i - 1;
		cur = arr[i];
		while(preIndex >= 0 && arr[preIndex] > cur) {
			arr[preIndex + 1] = arr[preIndex];
			preIndex --;
		}
		arr[preIndex + 1] = cur;
	}

	return arr;
}











































