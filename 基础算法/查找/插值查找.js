// 参考：https://juejin.im/post/5d57cf23f265da03d1554ec6
//       https://www.cnblogs.com/maybe2030/p/4715035.html

// 公式：
//                              (key - arr[low])
//  mid = low + (high - low) *  -------------------
//                              (arr[high] - arr[low])

// 注意事项：
// 0. 数组有序
// 1. 对于数据量较大，关键字分布比较均匀的查找表来说，采用插值查找, 速度较快.
// 2. 关键字分布不均匀的情况下，该方法不一定比折半查找要好

// 注：对于表长较大，而关键字分布又比较均匀的查找表来说，插值查找算法的平均性能比折半查找要好的多。
// 反之，数组中如果分布非常不均匀，那么插值查找未必是很合适的选择。

// 复杂度分析：查找成功或者失败的时间复杂度均为O(log2(log2n)) ====> 为什么？？？
 
var arr = [1, 2, 5, 6, 7, 8, 56, 89, 90];

function insertValueFind(arr, val, start, end) {
	if(arr == null || arr.length == 0) return -1;
	if(start > end) return -1;

	arr = arr.sort(function(a, b) {
		return a - b; // 从小到大排序
	})

	var middleIndex = Math.floor( start + (end - start) * (val - arr[start]) / (arr[end] - arr[start]) );
		middleVal = arr[middleIndex];

	if(val === middleVal) return middleIndex;

	if(val < middleVal) {
		return insertValueFind(arr, val, 0, middleIndex - 1);
	}

	if(val > middleVal) {
		return insertValueFind(arr, val, middleIndex + 1, end);
	}

	return -1;
}

console.log( insertValueFind(arr, 90, 0, 8) );

