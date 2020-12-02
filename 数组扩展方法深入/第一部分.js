
// Array.prototype.forEach   遍历数组
/*
	func: 回调函数
	obj: 第一个参数func的this指向
*/
Array.prototype.myforEach = function(func, obj) {
	var len = this.length;
	for(var i = 0; i < len; i ++) {
		func.call(obj || window, this[i], i, this);
	}
}


// Array.prototype.filter    遍历数组 + 过滤数组 ==> 返回一个新数组
/*
	func: 回调函数
	obj: 第一个参数func的this指向
*/
Array.prototype.myfilter = function(func, obj) {
	var len = this.length;
	var newArr = [];
	for(var i = 0; i < len; i ++) {
		func.call(obj || window, this[i], i, this) && newArr.push(this[i]);
	}
	return newArr;
} 


// Array.prototype.map      遍历数组 + 映射数组   ==>  返回数组
Array.prototype.mymap = function(func, obj) {
	var newArr = [];
	var len = this.length;
	for(var i = 0; i < len; i ++) {
		newArr.push(func.call(obj || window, this[i], i, this));
	}
	return newArr;
}


// Array.prototype.every   遍历数组 + 判断每一个元素是否符合条件（回调函数返回的都是true）  ==> true
//                         遍历数组 + 判断每一个元素是否符合条件（回调函数有返回false）     ==> false
Array.prototype.myevery = function(func, obj) {
	var len = this.length;
	for(var i = 0; i < len; i ++) {
		if(!func.call(obj || window, this[i], i, this)) {
			return false;
		}
	}
	return true;
}


// Array.prototype.some    遍历数组 + 判断部分元素是否符合条件（回调函数有返回true）   ==> true
//                         遍历数组 + 判断部分元素是否符合条件（回调函数都返回false）  ==> false
Array.prototype.mysome = function(func, obj) {
	var len = this.length;
	for(var i = 0; i < len; i ++) {
		if(func.call(obj || window, this[i], i, this)) {
			return true;
		}
	}
	return false;
}


// Array.prototype.reduce       从左向右遍历数组  ==> 最后一圈的返回结果
/*
	func: 回调函数 （preVal, ele, index, self）
	initValue: 初始值

	遍历的第一圈：preVal 就是 initValue
	以后的遍历; preVal 就是 上一圈的返回值
	最后一圈的返回结果作为reduce函数的返回值

*/
/*
	func: 回调函数
	initValue: 初始值
	obj: func的this指向 （在实际Array.prototype.reduce上是没有的）
*/
Array.prototype.myreduce = function(func, initValue, obj) {
	var len = this.length;
	var curReturn = initValue;
	for(var i = 0; i < len; i ++) {
		curReturn = func.call(obj || window, curReturn, this[i], i, this);
	}
	return curReturn;
}


// Array.prototype.reduceRight  从左向右遍历数组
Array.prototype.myreduceRight = function(func, initValue, obj) {
	var len = this.length;
	var curReturn = initValue;
	for(var i = len - 1; i >= 0; i --) {
		curReturn = func.call(obj || window, curReturn, this[i], i, this);
	}
	return curReturn;
}

// push:数组可以溢出写
Array.prototype.myPush = function() {
	var len = arguments.length;
	for(var i = 0; i < len; i ++) {
		this[this.length] = arguments[i];
	}
	return this.length;
}

// 有序数组乱序：
var arr = [1, 2, 3, 4, 5];
arr.sort(function() {
	return 0.5 - Math.random();
})
console.log(arr);