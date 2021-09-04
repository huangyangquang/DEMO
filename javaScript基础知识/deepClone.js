// 浅拷贝：
// 1.Object.assign()
// 2.对象的解构，可进行深入拷贝，但是层次不能太深;
//   当object只有一层的时候，是深拷贝
// 3.数组： concat函数、slice函数


// 深拷贝：
// 1.jQuery: $.extend()
//   情况：一个参数 / 多个参数 / true + 多个参数
// 2.var newObj = JSON.parse(JSON.stringify(obj));
// 3.
function deepClone(origin, target) {
	var target = target || {},
		toStr = Object.prototype.toString,
		arrStr = "[object Array]";
		regStr = "[object RegExp]";
	for(var prop in origin) {
		if(origin.hasOwnProperty(prop)) {
			if(origin[prop] !== 'null' && typeof(origin[prop]) == 'object') {
				if(toStr.call(origin[prop]) == arrStr) {
					target[prop] = [];
				}else if(toStr.call(origin[prop]) == regStr) {
					target[prop] = new RegExp(origin[prop]);
				} else {
					target[prop] = {};
				}
				deepClone(origin[prop], target[prop]);
			}else{
				target[prop] = origin[prop];
			}
		}
	}
	return target;
}

// test:
var obj = {
	name: 'huang',
	age: 10,
	arr: [1, 'huang', true, {sex: 'box'}],
	temp: {
		class: '1',
		arr: [0, 90, {school: 'zhbit'}]
	},
	uu: null,
	fn: function() {},
	reg: /\\/g
}

var target = deepClone(obj);
console.log(target);
target.temp.class = '9';
target.reg = '9';
console.log(target);
console.log(obj);


// 2020.07.02 （错四处）
function deepClone1(origin, target) {
	var target = target || {},
		toString = Object.prototype.toString,
		ArrType = "object Array"; // 少了 []

	for(var prop in origin) {
		if(origin.hasOwnproperty(prop)) {
			if(typeof origin[prop] === 'object') { // null 没考虑
				if(origin[prop] === null && toString.call(origin[prop]) !== ArrType) { // 对象
					target[prop] = {};
				} else {
					target[prop] = [];
				}
				deepClone1(origin[prop], target[prop]);
			} else {
				target[prop] = origin[target];
			}
		}
	}
	//递归出口没写
}

// 2020.07.02 (错两处)
function deepClone2(origin, target) {
	var target = targrt || {},
		toString = Object.prototype.toString,
		ArrType = "[object Array]";

	for(var prop in origin) {
		// 必须判断属性是否是对象本身上的
		var propVal = origin[prop];
		if(propVal !== null && typeof propVal === "object") {
			if(toString.call(propVal) === ArrType) {
				target[prop] = [];
			} else {
				target[prop] = {};
			}
			// 递归进行克隆
		} else {
			target[prop] = propVal;
		}
	}
	return target;
}

// 2020.07.02(全对)
function deepClone3(origin, target) {
	var target = target || {},
		toString = Object.prototype.toString,
		ArrType = "[object Array]";

	for(var prop in origin) {
		if(origin.hasOwnProperty(prop)) {
			var propVal = origin[prop];
			if(propVal !== null && typeof propVal === "object") {
				if(toString.call(propVal) === ArrType) {
					target[prop] = [];
				} else {
					target[prop] = {};
				}
				deepClone3(propVal, target[prop]);
			} else {
				target[prop] = propVal;
			}
		}
	}
	return target;
}

// 2020.11.05
function deepClone4(origin, target) {
	const _target = target || {}
	const arrStr = "[object Array]"
	const regStr = "[object RegExp]"
	const toString = Object.prototype.toString

	for(let prop in origin) {
		if(origin.hasOwnProperty(prop)) {
			if(origin[prop] !== null && typeof origin[prop] === 'object') {
				if(toString.call(origin[prop]) === arrStr) {
					_target[prop] = []
				} else if(toString.call(origin[prop]) === regStr) {
					_target[prop] = new RegExp(origin[prop])
				} else {
					_target[prop] = {}
				}
				deepClone(origin[prop], _target[prop])
			} else {
				_target[prop] = origin[prop]
			}

		}
	}

	return _target
}
