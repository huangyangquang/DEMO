/*

	pre.push 无返回值 所以传递给下一个循环的时候是undefined
*/

function unqie(arr) {
	return arr.reduce(function(pre, ele, index, self) {
		if(pre.includes(ele)) {
			return pre;
		} else {
			return [...pre, ele];
		}
	}, []);
}
// 测试
var obj = {};
var huang = 'pop'
var fn = function() {}
var arr = [1, 2, 1, 2, 2, "huang", huang, {}, true, true, obj, obj, 'true', undefined, null, null, undefined, fn, fn];
console.log(unqie(arr));
