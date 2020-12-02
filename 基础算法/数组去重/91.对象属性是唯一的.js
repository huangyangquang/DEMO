/*
	在对象中，每一个属性是唯一的
	因为在obj[arr[i]] 会调用toString方法，对于引用值 ，就不适用了
*/

function unqie(arr) {
	if(arr == null || arr.length == 0) return arr;
	var obj = {},
		len = arr.length,
		temp = [];
	for(var i = 0; i < len; i ++) {
		if(!obj[typeof arr[i] + arr[i]]) {
			obj[typeof arr[i] + arr[i]] = true;
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