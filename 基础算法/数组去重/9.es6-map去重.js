

function unqie(arr) {
	if(arr == null || arr.length == 0) return arr;
	var map = new Map(),
		temp = [],
		len = arr.length;
	for(var i = 0; i < len; i ++) {
		if(!map.has(arr[i])) {
			map.set(arr[i], false);
			temp.push(arr[i]);
		}
	}
	return temp;
}
// 测试
var obj = {};
var huang = 'pop'
var fn = function() {}
var arr = [1, 2, 1, 2, 2, "huang", huang, {}, true, true, obj, obj, 'true', undefined, null, null, undefined, fn, fn];
console.log(unqie(arr));



