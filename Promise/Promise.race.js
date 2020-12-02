MyPromise.race = function (promiseArr) {
	return new MyPromise(function (res, rej) {
		promiseArr.forEach(function (promise, index) {
			promise.then(res, rej);
		})
	})
}


// 默写 (全对)
MyPromise.race = function(promiseArr) {
	return new MyPromise(function(res, rej) {
		promiseArr.forEach(function(ele) {
			ele.then(res, rej);
		})
	})
}


//  默写 回调写错（2020.5.19）
MyPromise.race = function(promiseArr) {
	return new MyPromise(function(res, rej) {
		promiseArr.forEach(function(ele, index) {
			ele.then(function(val) { //
				res(val);
			}, function(rea) { //
				rej(rea);
			})
		})
	})
}

