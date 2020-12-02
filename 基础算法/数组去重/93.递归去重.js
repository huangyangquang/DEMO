/*
	temp 变量是 父级作用域的
*/


function unqie(arr) {
	if(arr == null || arr.length == 0) return arr;
	var len = arr.length,
		temp = arr.sort();

	function loop(index) {
		if(index >= 1) {
			if(temp[index] === temp[index - 1]) {
				temp.splice(index, 1)
			}
			loop(index - 1);
		}
	}
	loop(len - 1);
	return temp;
}
// 测试
var obj = {};
var fn = function() {}
var arr = [1, 2, 1, 2, 2, "huang", {}, true, true, obj, obj, 'true', undefined, null, null, undefined, fn, fn];
console.log(unqie(arr));
