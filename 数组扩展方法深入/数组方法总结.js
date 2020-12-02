// 数组中查找最小值
function getMin_arr(arr) {
	if(arr === null || arr.length === 0) return;
	return Math.min(...arr);
}
// 理解：
var arr = [1, 3.4, 5, 0];
var min = Math.min(...arr);
console.log(min);
