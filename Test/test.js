// /*
// 	外部迭代器
//  */
// let arr = [1, 2, 3];
// function OuterIterator (o) {
// 	let curIndex = 0;
// 	let next = () => {
// 		return { // next 函数返回一个对象
// 			value: o[curIndex], // 对应 迭代到对应位置的值
// 			done: o.length == ++curIndex // 是否完成迭代
// 		}
// 	}
// 	return { // 返回一个迭代对象 （本质上： 是闭包的写法）
// 		next
// 	}
// }
// let OIt = OuterIterator(arr); 



// /*
// 	对象中部署iterator
//  */
// let obj1 = {
// 	0: 'a',
// 	1: 'b',
// 	2: 'c',
// 	3: 'd',
// 	length: 4,
// 	[Symbol.iterator]: function () {
// 		let curIndex = 0;
// 		let next = () => {
// 			return {
// 				// 当前迭代的值
// 				value: this[curIndex],
// 				// 是否迭代完成
// 				done: this.length == ++curIndex,
// 			}
// 		}
// 		return {
// 			next,
// 		}
// 	}
// }
// console.log([...obj1]);// ["a", "b", "c"]
// for(let prop of obj1) {
// 	console.log(prop);//a   b    c
// }

// /*
// 	async + await 解决回调地狱
//  */
// let fs = require('fs');
// function readFile (path) {
// 	return new Promise((res, rej) => {
// 		fs.readFile(path, 'utf-8', (err, data) => { // 异步操作
// 			if(err) {
// 				rej(err);
// 			} else {
// 				res(data);
// 			}
// 		})
// 	})
// }

// async function read (url) {
// 	let val1 = await readFile(url);
// 	let val2 = await readFile(val1);
// 	let val3 = await readFile(val2);
// 	return val3;
// }

// read('./data/number.txt').then((val) => {
// 	console.log(val);
// }, (reason) => {
// 	console.log(reason);
// })


// function deepClone(origin, target) {
// 	const _target = target || {}
// 	const arrStr = "[object Array]"
// 	const regStr = "[object RegExp]"
// 	const toString = Object.prototype.toString

// 	for(let prop in origin) {
// 		if(origin.hasOwnProperty(prop)) {
// 			if(origin[prop] !== null && typeof origin[prop] === 'object') {
// 				if(toString.call(origin[prop]) === arrStr) {
// 					_target[prop] = []
// 				} else if(toString.call(origin[prop]) === regStr) {
// 					_target[prop] = new RegExp(origin[prop])
// 				} else {
// 					_target[prop] = {}
// 				}
// 				deepClone(origin[prop], _target[prop])
// 			} else {
// 				_target[prop] = origin[prop]
// 			}

// 		}
// 	}

// 	return _target
// }

// var obj = {
// 	name: 'huang',
// 	age: 10,
// 	arr: [1, 'huang', true, {sex: 'box'}],
// 	temp: {
// 		class: '1',
// 		arr: [0, 90, {school: 'zhbit'}]
// 	},
// 	uu: null,
// 	fn: function() {},
// 	reg: /\\/g
// }

// var target = deepClone(obj);
// console.log(target);
// target.temp.class = '9';
// target.reg = '9';
// console.log(target);
// console.log(obj);

// function _instanceof(obj, constructor) {
// 	let obj_proto = Object.getPrototypeOf(obj),
// 		prototype = constructor.prototype

// 	while(true) {
// 		if(!obj_proto) return false
// 		if(obj_proto === prototype) return true

// 		obj_proto = Object.getPrototypeOf(obj_proto)
// 	}
// }



// function sum(...arg) {
// 	var f = function(...args) {
// 		return sum(...arg, ...args);
// 	}

// 	f.valueOf = function() {
// 		const sum = arg.reduce((a, b) => {
// 			return a + b;
// 		})
// 		return sum
// 	}

// 	return f
// }

// sum(1, 2, 3).valueOf() //6
// sum(2, 3)(2).valueOf() //7
// sum(1)(2)(3)(4).valueOf() //10
// sum(2)(4, 1)(2).valueOf() //9
// sum(1)(2)(3)(4)(5)(6).valueOf() // 21


// 防抖
// function fan(fn, delay) {
// 	var timer = null
// 	return function(...arg) {
// 		clearTimeout(timer)
// 		timer = setTimeout(function() {
// 			fn(..arg) // this指向
// 		}, delay)
// 	}
// }

// // 节流
// function jie(fn, wait) {
// 	var curTime = new Date() //

// 	return fucntion(..arg) {
// 		var lastTime = new Date() //
// 		if(lastTime - curTime >= wait) {
// 			fn(...arg) // this指向
// 			curTime = new Date() //
// 		}
// 	}
// }


// // 节流
// function jieliu(fn, wait) {
// 	var curTime = 0

// 	return fucntion(...arg) {
// 		var lastTime = new Date().getTime()
// 		var self = this
// 		if(lastTime - curTime > wait) {
// 			fn.call(self, ...arg)
// 			curTime = lastTime
// 		}
// 	}
// }


// // 防抖
// function fandou(fn, delay) {
// 	var timer = null
// 	return function(...arg) {
// 		clearTimeout(timer)
// 		var self = this
// 		timer = setTimeout(function() {
// 			fn.call(self, ...arg)
// 		}, delay);
// 	}
// }


// Function.prototype.newBind = function(target) {
// 	var fn = this
// 	var _args = [].slice.call(arguments, 1);
// 	var temp = function() {}
// 	var f = fucntion() {
// 		var args = [].slice.call(arguments, 0);
// 		return fn.apply(this instanceof temp ? this : (target || window), _args.concat(args))
// 	}
// 	temp.prototype = fn.prototype
// 	f.prototype = new temp();
// 	return f;
// }