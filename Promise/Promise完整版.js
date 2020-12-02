function MyPromise (executor) {
	var self = this;
	// 等待状态
	self.status = 'pending';
	// 参数
	self.resolveValue = null;
	self.rejectReason = null;
	// 存成功的回调函数
	self.ResolveCallBackList = [];
	// 存失败的回调函数
	self.RejectCallBackList = [];
	function resolve (val) {
		if(self.status === 'pending') {
			self.status = 'Fulfilled';
			self.resolveValue = val;
			self.ResolveCallBackList.forEach(function (ele) {
				ele();
			});
		}
	}
	function reject (reason) {
		if(self.status === 'pending') {
			self.status = 'Rejected';
			self.rejectReason = reason;
			self.RejectCallBackList.forEach(function (ele) {
				ele();
			});
		}
	}
	try {
		executor(resolve, reject);
	} catch(e) {
		reject(e);
	}
};

function ResolutionReturnPromise (nextPromise, returnValue, res, rej) {
	if(returnValue instanceof MyPromise) {
		// returnValue是.then函数里注册的成功或者失败函数执行后的返回值
		// (不是.then执行后的返回值)
		// 如果返回值returnValue是一个promise对象，这个返回的promise对象
		// 就可以注册成功res和失败rej的回调函数，回调函数在注册res或者rej函数
		// 里面调用.then执行后返回的Promise对象（即nextPromise）注册的res或者rej函数。
		// 因为这样,形成的关联，所以我们在表面看起来就好像是，如果.then里面的res或者rej的返回值
		// 是一个promise对象，这个对象执行res函数，那么下一个.then就执行res函数；这个
		// 对象执行rej函数，那么下一个.then就执行rej函数
		returnValue.then(function (val) {
			res(val);
		}, function (reason) {
			rej(reason);
		})
	} else {
		res(returnValue);
	}
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
	// 处理空then
	if(!onFulfilled) {
		onFulfilled = function (val) {
			return val;
		}
	}
	if(!onRejected) {
		onRejected = function (reason) {
			throw new Error(reason);
		}
	}
	// self 为 Promise实例
	var self = this;
	// 链式操作
	var nextPromise = new MyPromise(function (res, rej) {
		if(self.status === 'Fulfilled') {
			console.log('Fulfilled')
			// 模拟微任务
			setTimeout(function () {
				// 抛出错误的处理
				try {
					var nextResolveValue = onFulfilled(self.resolveValue);
					// res(nextResolveValue);
					// 因为是异步操作，所以nextPromise可以传进来
					ResolutionReturnPromise(nextPromise, nextResolveValue, res, rej);
				} catch (e) {
					rej(e);
				}	
			}, 0);
		}

		if(self.status === 'Rejected') {
			console.log('Rejected');
			setTimeout(function () {
				try {
					var nextRejectValue = onRejected(self.rejectReason);
					ResolutionReturnPromise(nextPromise, nextRejectValue, res, rej);
				} catch (e) {
					rej(e);
				}
				
			}, 0);
		}
		// 异步事件虽然改变了状态，但是没有在new MpPromise执行完返回一个promise对象前修改
		if(self.status === 'pending') {
			console.log('pending')
			self.ResolveCallBackList.push(function () {
				setTimeout(function () {
					try {
						var nextResolveValue = onFulfilled(self.resolveValue);
						ResolutionReturnPromise(nextPromise, nextResolveValue, res, rej);
						
					} catch (e) {
						rej(e);
					}
				
				}, 0);
			});
			self.RejectCallBackList.push(function () {
				setTimeout(function () {
					try {
						var nextRejectValue = onRejected(self.rejectReason);
						ResolutionReturnPromise(nextPromise, nextRejectValue, res, rej);
						
					} catch (e) {
						rej(e);
					}
				}, 0);
			})
			console.log(self.ResolveCallBackList)
		}
	})
	
	return nextPromise;
}

MyPromise.prototype.catch = function (onRejected){
	return this.then(null,onRejected)
}

MyPromise.race = function (promiseArr) {
	return new MyPromise(function (res, rej) {
		promiseArr.forEach(function (promise, index) {
			promise.then(res, rej);
		})
	})
}


MyPromise.all = function (promiseArr) {
	return new MyPromise(function (res, rej) {
		var len = promiseArr.length,
			count = 0,
			tempArr = new Array(len);
		promiseArr.forEach(function (ele, index, self) {
			ele.then(function (val) {
				tempArr[index] = val;
				count ++;
				count == len && res(tempArr);
			}, function (reason) {
				rej(reason);
			});
		});
	})
}

//resolve方法
MyPromise.resolve = function(val){
  return new Promise((resolve,reject) => {
    resolve(val)
  })
}

//reject方法
MyPromise.reject = function(val){
  return new Promise((resolve,reject) => {
    reject(val)
  })
}



/*


 test ： 回调的数组中存多个值 
 let op = new MyPromise(function(res, rej) {
 	setTimeout(function() {
 		res('good')
 	}, 1000);
	
 })

 op.then(function(val) {
 	console.log(val + '9');
 	return new MyPromise(function(res, rej) {
 		res('smkla');
 	});
 }, function(err) {
 	console.log(err);
 }).then().then(function(val) {
 	console.log(val + '9');
 }, function(err) {
 	console.log(err);
 }).then(function(val) {
 	console.log(val + '9');
 }, function(err) {
 	console.log(err);
 }).then(function(val) {
 	console.log(val + '9');
 }, function(err) {
 	console.log(err);
 })

 op.then(function(val) {
 	console.log(val + '8');
 }, function(err) {
 	console.log(err);
 });

 op.then(function(val) {
 	console.log(val + '8');
 }, function(err) {
 	console.log(err);
 });

 */





 /*
 
 思路整理：
 Promise 有3种状态， 分别是pending, fulfilled, rejected。
 状态只能从pending改变为fulfilled或者是rejected,状态一旦改变之后，就不能修改了。
 所以，在构造函数里面，resolve 或者 reject 函数只有在第一次执行时有效，多次调用是没有效果的。

 此外Promise构造函数是同步执行的，.then方法中的函数是异步执行的。

 .then方法中根据判断当前的promise实例的状态，作出不同的回应。
 如果我们在Promise构造函数传入的是一个异步的操作去改变promise实例状态的函数的话，
 调用.then函数时，会触发pending状态对应的操作，把.then注册的成功回调，失败的回调分别放置到两个数组，最后状态改变时，在去循环调用这些函数。
 如果我们在Promise构造函数传入的是一个同步的操作去改变promise实例状态的函数的话，
 调用.then函数时，会触发fulfilled 或者 rejected 状态的操作。
 而且.then函数会生成一个新的promise实例，作为返回值，这样就可以实现promise的链式调用了。
 
 .then函数里的参数：
 onFulfilled或者onRejected只有在执行上下文堆栈只有平台代码时才能被触发，这个两个函数是异步执行的，是一个微任务。
 
 .then函数必须返回一个Promsie对象
 
 当.then函数的参数函数中return了一个值，我们可以继续then下去，不管是什么值，都能在下一个then中获取，
 还有，当我们不在then中放入参数，例：promise.then().then()，那么其后面的then依旧可以得到之前then返回的值
 
 对于.then的参数函数中显示的返回值的处理：
 会先判断返回值是不是一个Prommise对象，
 是的话，给我们显示返回的Promise对象提供.then方法来注册成功的回调和失败的回调，由这个返回值Promsie对象来触发
 不是的话，就直接触发nextPromise的成功回调。

 Promise实现：bluebird, q-promise
 */



/*
面试题：
介绍一下Promise? 
答：
Promise 对象是异步编程的一种解决方案，最早由社区提出。
（Promises/A+ 规范是 JavaScript Promise 的标准，规定了一个 Promise 所必须具有的特性。）

Promise 是一个构造函数，接收一个函数作为参数，返回一个 Promise 实例；这个函数参数是同步执行。

一个 Promise 实例有三种状态，分别是 pending、resolved 和 rejected，分别代表了进行中、已成功和已失败。
实例的状态只能由 pending 转变 resolved 或者 rejected 状态，并且状态一经改变，无法再被改变了。
状态的改变是通过 resolve() 和 reject() 函数来实现的，我们可以在异步操作结束后调用这两个函数改变 Promise 实例的状态。

Promise的原型上定义了一个 then 方法，使用这个 then 方法可以为两个状态的改变注册回调函数。
这个回调函数属于微任务，会在本轮事件循环的末尾执行。
then方法会在根据当前的Promise 对象的状态，进行不同的操作：
pending状态时，我将我们的成功回调和失败回调给存储在成功回调的数组和失败回调的数组
resolved状态时，会去触发 then注册的成功的回调函数
rejected状态时，会去触发 then注册的失败的回调函数
最后，then方法会会返回一个新的Promise 对象。
	==> 说一下事件循环？

 */
 

 /*
 	实现思路：
 	try{} catch() {} 捕获错误， 触发reject函数

 	Promise：
 	1. 初始化： 
 		参数： fn
 		变量： status, resolveValue, rejectReason, ResolveCallbackList, RejectCallBackList, resolve, rejecte

 	then:  (核心)
 	1. 原型上方法
 	2. 返回一个新的Promise 对象
 	3. 根据状态的不同 触发不同的操作
 	4. 处理回调函数的返回值
 	5. 处理 then 里面的回调函数不是一个函数的情况
	
	catch: 本质是then函数

	静态方法：
	all:
	1. 返回一个新的Promise对象
	2. 根据闭包的写法
	3. 提供计数器来判断是否所有的异步操作已经完成
	4. 数组中的每一个元素都是一个Promise 对象，所以可以为每一个 Promise对象来注册回调， 然后配合计数器来完成
	5. 错误的捕获， 触发要返回的新的Promise的 reject函数

	race:
	1. 返回一个新的 Promise 对象
	2. 数组中的每一个元素都是一个Promise 对象，所以可以为每一个 Promise对象来注册回调
	   成功的回调是新的Promise 对象的resolve函数； 失败的回调是新的Promise 对象的reject函数


	resolve:

	reject:


  */
 


 
/*
参考：
https://segmentfault.com/a/1190000016411620
https://juejin.im/post/5b32f552f265da59991155f0#heading-3
https://juejin.im/post/5a04066351882517c416715d
 */

