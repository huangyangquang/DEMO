/*
	先对数组进行排序 然后在比较相邻元素
*/

function unqie(arr) {
	if(arr == null || arr.length == 0) return arr;
	var arr = arr.sort();
	var temp = [arr[0]];
	for(var i = 1; i < arr.length; i ++) {
		if(arr[i] !== arr[i - 1]) {
			temp.push(arr[i])
		}
	}
	return temp;
}
// 测试
var obj = {};
var fn = function() {}
var arr = [1, 2, 1, 2, 2, "huang", {}, true, true, obj, obj, 'true', undefined, null, null, undefined, fn, fn];
console.log(unqie(arr));

