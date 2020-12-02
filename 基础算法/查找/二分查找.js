const arr = [1, 2, 3, 4, 5, 6, 7, 8];

// 二分查找 :  O(logn)
// 前提： 有序数组

//说明：元素必须是有序的，如果是无序的则要先进行排序操作。

// 基本思想：也称为是折半查找，属于有序查找算法。用给定值k先与中间结点的关键字比较，
// 			中间结点把线形表分成两个子表，若相等则查找成功；若不相等，再根据k与该
// 			中间结点关键字的比较结果确定下一步查找哪个子表，这样递归进行，直到查
// 			找到或查找结束发现表中没有这样的结点。

// 复杂度分析：最坏情况下，关键词比较次数为log2(n+1)，且期望时间复杂度为O(log2n)；

// 注：折半查找的前提条件是需要有序表顺序存储，对于静态查找表，一次排序后不再变化，
//     折半查找能得到不错的效率。但对于需要频繁执行插入或删除操作的数据集来说，维
//     护有序的排序会带来不小的工作量，那就不建议使用。——《大话数据结构》 

// 递归 由中间开始往两边查找 前提是有序的数组 返回对应的索引位置
function binarySearch1(arr, dest, start = 0, end = data.length) {
	if (start > end) {
		return -1
	}
	let midIndex = Math.floor((start + end) / 2); // 中间位置索引
	let mid = arr[midIndex]; // 中间值

	if (mid == dest) {
		return midIndex;
	}
	if (dest < mid) { // 要找的比中间值小 就从中间往开头找 一直到0
		return binarySearch1(arr, dest, 0, midIndex - 1);
	}
	if (dest > mid) { // 要找的比中间值大 就从中间往后找 一直到end结束
		return binarySearch1(arr, dest, midIndex + 1, end);
	}
	return -1; // 找不到返回-1
}
// console.log(binarySearch1(arr, 7, 3, 6)); // 6


// 非递归 arr前提有序数组 （从小到大）返回对应的索引位置 
function binarySearch2(arr, dest) {
	let max = arr.length - 1;
	let min = 0;
	while (min <= max) {
		let mid = Math.floor((max + min) / 2); // mid中间位置索引
		if (dest < arr[mid]) { // 如果要找的这项比中间项还要小 说明应该在mid中间位置前面 修改最大边界值max=mid-1 
			max = mid - 1;
		} else if (dest > arr[mid]) { // 如果要找的这项比中间项还要大 说明应该在mid中间位置的后面 修改最小边界值min=mid+1
			min = mid + 1;
		} else {
			return mid;
		}
	}
	return -1; // 找不到返回-1
}
// console.log(binarySearch2(arr, 3)); // 2





// 2020.06.20 （全对）
function search(arr, s, start, end) {
	if(arr ===  null || start > end) {
		return -1;
	}
	arr = arr.sort(function(a, b) {
		return a - b > 0;
	})
	var middleIndex = Math.floor( (start + end) / 2 ),
		middleValue = arr[middleIndex];

	if(s === middleValue) {
		return middleIndex;
	}
	if(s < middleValue) {
		return search(arr, s, 0, middleIndex - 1);
	}
	if(s > middleValue) {
		return search(arr, s, middleIndex + 1, end);
	}
	return -1;
}
// console.log( search(arr, 6, 0, arr.length) );


// 默写 （全对）
function bindarySearch(arr, s, start, end) {
	if(arr === null || start > end) return -1;
	arr = arr.sort(function(a, b) {
		return a -b > 0;
	})
	var middleIndex = Math.floor( (start + end) / 2 );
	var middleVal = arr[middleIndex];
	if(s === middleVal) {
		return middleIndex;
	}
	if(s < middleVal) {
		return bindarySearch(arr, s, 0, middleIndex - 1);
	}
	if(s > middleIndex) {
		return bindarySearch(arr, s, middleIndex + 1, end);
	}
	return  -1;
}
// var arr2 = [1, 5, 8, 12, 22, 56, 78];
// console.log('index:', bindarySearch(arr2, 78, 0, arr2.length - 1));


// 默写： （错误7处）
function search(arr, s, start, end) {
	if(arr == null) return;
	var middle = Math.floor( (start + end) / 2 ); 
	var temp = []; //
	arr = arr.sort(function(a, b) {
		return a - b > 0;
	});

	if(s == arr[middle]) {
		return middle;
	} else if(s < arr[middle]) { // 
		temp = arr.slice(start, middle); //
		return search(temp, s, 0, middle - 1); //
	} else if(s > arr[middle]) { //
		temp = arr.slice(middle + 1, end); //
		return search(temp, s, middle + 1, end); //
	}
	return -1;
}
// var arr1 = [1, 5, 8, 12, 22, 56, 78];
// console.log('position:', search(arr1, 8, 0, arr.length));


// 2020.07.02(全对)
function baneryFind(arr, start, end, val) {
	if(arr == null || arr.length == 0) return -1;
	if(start > end) return -1;

	arr = arr.sort(function(a, b) {
		return a - b;
	});

	var middleIndex = Math.floor( (start + end) / 2 ),
		middleVal = arr[middleIndex];

	if(val < middleVal) {
		return baneryFind(arr, 0, middleIndex - 1, val);
	} else if(val > middleVal) {
		return baneryFind(arr, middleIndex + 1, end, val);
	} else {
		return middleIndex;
	}
	return -1;
}
// console.log(baneryFind(arr, 0, 8, 1));



























