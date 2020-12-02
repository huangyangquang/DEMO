/*
	实际上也是利用到对象属性的唯一性

	hasOwnProperty

	缺点： 引用值判断 会通过 toString来转换

	为什么加 typeof 
	因为 true 和 字符串 'true' toString结果一样
*/

function unqie(arr) {
	if(arr == null || arr.length == 0) return arr;
	var obj = {};
	return arr.filter(function(ele, index, self) {
		if(obj.hasOwnProperty(typeof ele + ele)) {
			return false;
		} else {
			return obj[typeof ele + ele] = true;
		}
	})

}
// 测试
var obj = {};
var fn = function() {}
var arr = [1, 2, 1, 2, 2, "huang", {}, true, true, obj, obj, 'true', undefined, null, null, undefined, fn, fn];
console.log(unqie(arr));


