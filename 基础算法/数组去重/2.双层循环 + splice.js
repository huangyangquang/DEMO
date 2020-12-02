/*
	双层循环 + splice

*/

function unqie(arr) {
	for(var i = 0; i < arr.length; i ++) {
		for(var j = i + 1; j < arr.length; j ++) {
			if(arr[i] === arr[j]) { // 必须 使用 ===
				arr.splice(j, 1);
				j --;
			}
		}
	}
	return arr;
}
// 测试
var obj = {};
var fn = function() {}
var arr = [1, 2, 1, 2, 2, "huang", {}, true, true, obj, obj, 'true', undefined, null, null, undefined, fn, fn];
console.log(unqie(arr));

