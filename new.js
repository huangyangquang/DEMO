// 思路：
// 1.变量初始化 获取到构造函数
// 2.判断构造函数是不是一个函数
// 3.创建新对象 并且指定新对象的原型
// 4.执行构造函数里的代码 并且改变this指向为新对象 获取构造函数的返回值
// 5.判断构造函数的返回值是不是引用值
// 6.如果是，就返回这个引用值; 如果不是，就返回新对象

function _new() {

	let newObject = null,
		constructor = Array.prototype.shift.call(arguments),
		result = null;

	// 参数判断
	if (typeof constructor !== "function") {
		console.error("type error");
		return;
	}

	// 新建一个空对象，对象的原型为构造函数的 prototype 对象
	newObject = Object.create(constructor.prototype);

	// 将 this 指向新建对象，并执行函数
	result = constructor.apply(newObject, arguments);

	// 判断返回对象
	let flag = result && (typeof result === "object" || typeof result === "function");

	// 判断返回结果
	return flag ? result : newObject;
}

// 使用方法
// objectFactory(构造函数, 初始化参数);


// 2020.06.20 (错两处)
function _new(fn) { 
	if(typeof fn !== 'function') return 'not a function';
	var obj = Object.create(fn.prototype);
	var returnVal = fn.call(obj); // 参数
	if(returnVal !== null && typeof returnVal === 'object') { // 引用值包括函数
		return obj;
	} else {
		return returnVal;
	}
}


// 2020.5.19 默写（全对）
function createObj(fn, ...arg) {
	// 严谨性判断
	if(fn == null || typeof fn !== 'function') return fn;

	// 创建对象 原型
	var obj = Object.create(fn.prototype);

	// 执行代码 即添加对象属性
	var returnVal = fn.apply(obj, arg)

	// 判断是否有返回值， 返回值是否为基本数据类型
	if(typeof returnVal == 'object' || typeof returnVal == 'function') {
		return returnVal
	} else {
		return obj;
	}

}

function Person(name) {
	this.name = name;
	this.age = 18;
	return {

	}
}


// 默写（全对）
function createObject(func) {
	// 判断参数
	if(typeof func !== 'function') {
		console.err('Type error');
		return;
	}
	var obj = null,
		flag = false,
		result = null;

	// 创建新对象 指定新对象的原型
	obj = Object.create(fun.prototype);

	// 执行代码 this绑定为新对象 参数
	result = func.apply(obj, [...arguments].slice(1));

	// 判断构造函数的返回值
	if(typeof result == 'function' || typeof result == 'object') {
		flag = true;
	}

	// 返回最后结果
	return flag ? result : obj;
}


function createObject(func) {
	// 判断参数
	if(typeof func !== 'function') {
		console.err('Type error');
	}
	var obj = null,
		flag = false,
		result = null;

	// 创建新对象 指定新对象的原型
	obj = Object.create(fun.prototype);

	// 执行代码 this绑定为新对象 参数
	result = func.apply(obj, [...arguments].slice(1));

	// 判断构造函数的返回值
	if(typeof result == 'function' || typeof result == 'object') {
		flag = true;
	}

	// 返回最后结果
	return flag ? result : obj;
}


// 默写（全对）
function myNew() {
	// 初始化变量 获取到构造函数
	let newObj = null,
		constructor = [].shift.call(arguments),
		result = null,
		flag = false;

	// 判断构造函数是不是一个函数
	console.log(constructor);
	if(typeof constructor !== 'function') {
		throw new Error('类型错误');
		return;
	}

	// 创建一个对象 指定对象的原型
	newObj = Object.create(constructor.prototype);

	// 执行构造函数代码 并且改变this指向
	result = constructor.apply(newObj, arguments);

	// 判断构造函数的返回值
	flag = result && (typeof result == 'object' || typeof result == 'function')

	// 返回最后结果
	return flag ? result : newObj;
}


// 全对 （2020.09.06）
function _new(constructor, ...arg) {
	if(typeof constructor !== 'function') {
		console.log('type error');
		return;
	}

	var newObj = Object.create(constructor.prototype);

	var res = constructor.apply(newObj, arg);

	if(typeof res == 'function' || typeof res == 'object') {
		return res;
	} else {
		return newObj;
	}
}

// 默写（2020.09.25） 错一个
function _new(fn, ...arg) {
	if(!fn || typeof fn !== 'function') {
		console.log('类型错误'+ fn);
		return;
	}

	const obj = Object.create(fn.prototype); // Object.create(fn.prototype)

	var res = fn.apply(obj, arg);

	if(res && typeof res === 'function' || typeof res === 'object') {
		return res;
	} else {
		return obj;
	}
}

// 2020.11.05 默写（全对）
function _new(constructor, ...arg) {
	if(!constructor) return

	var obj = Object.create(constructor.prototype)

	var res = fn.call(obj, ...arg)

	if(typeof res === 'object' || typeof res === 'function') {
		return res
	}

	return obj
}


function _newtest(constructor, ...arg) {
	if(!constructor) return

	var obj = Object.create(constructor.prototype)

	var res = fn.call(obj, ...arg)

	if(typeof res === 'object' || typeof res === 'function') {
		return res
	}

	return obj
}


