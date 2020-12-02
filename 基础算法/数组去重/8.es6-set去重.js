/*
	Set 兼容性问题

*/
function unqie(arr) {
	return [...new Set(arr)];
}
// 测试
var obj = {};
var fn = function() {}
var arr = [1, 2, 1, 2, 2, "huang", {}, true, true, obj, obj, 'true', undefined, null, null, undefined, fn, fn];
console.log(unqie(arr));


function unqie1(arr) {
	return Array.from(new Set(arr));
}
// 测试
var arr1 = [1, 2, 1, 2, 2, "huang", {}, true, true, obj, obj, 'true', undefined, null, null, undefined, fn, fn];
console.log(unqie(arr1));