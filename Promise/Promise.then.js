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
		// 
		// returnValue 是一个 MyPromise对象，里面同步执行的函数会触发成功或者失败的回调。
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
	var self = this;
	// 链式操作 ; function(res, rej) 同步执行
	var nextPromise = new MyPromise(function (res, rej) {
		if(self.status === 'Fulfilled') {
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
			setTimeout(function () {
				try {
					var nextRejectValue = onRejected(self.rejectReason);
					ResolutionReturnPromise(nextPromise, nextRejectValue, res, rej);
				} catch (e) {
					rej(e);
				}
				
			}, 0);
		}
		// 异步事件虽然改变了状态，但因为是异步的，所以没有在new MpPromise执行完返回一个promise对象前修改好状态
		// 回调函数的收集
		if(self.status === 'pending') {
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
		}
	})
	// 每一个Promise对象都有自己的状态的函数
	return nextPromise;
}