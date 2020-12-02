

function unqie(arr) {
	if(arr == null || arr.length == 0) return arr;
	return arr.filter(function(ele, index, self) {
		//当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
		return self.indexOf(ele, 0) === index;
	})
}
// 测试
var obj = {};
var fn = function() {}
var arr = [1, 2, 1, 2, 2, "huang", {}, true, true, obj, obj, 'true', undefined, null, null, undefined, fn, fn];
console.log(unqie(arr));




