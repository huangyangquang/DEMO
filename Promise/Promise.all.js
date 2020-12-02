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

// 完整版
Promise.all = function (values) {
    return new Promise((resolve, reject) => {
        let result = []; // 存放返回值
        let counter = 0; // 计数器，用于判断异步完成
        function processData(key, value) {
            result[key] = value;
            // 每成功一次计数器就会加1，直到所有都成功的时候会与values长度一致，则认定为都成功了，所以能避免异步问题
            if (++counter === values.length) {
                resolve(result);
            }
        }
        
        // 遍历 数组中的每一项，判断传入的是否是promise
        for (let i = 0; i < values.length; i++) {
            let current = values[i];
            // 如果是promise则调用获取data值，然后再处理data
            if (isPromise(current)) {
                current.then(data => {
                    processData(i, data);
                }, reject);
            } else {
                // 如果不是promise，传入的是普通值，则直接返回
                processData(i, current);
            }
        }
    });
}


// 默写（全对）
MyPromise.all = function(promiseArr) {
	var len = promiseArr.length,
		num = 0,
		temp = [];
	return new MyPromise(function(res, rej) {
		promiseArr.forEach(function(ele, index) {
			ele.then(function(val) {
				temp[index] = val;
				num ++;
				if(len === num) {
					res(temp)
				}
			}, function(rea) {
				rej(rea)
			})
		})
	})
}


// 默写 .all 传递给 回调的数据是一个数组 （2020.5.29）
MyPromise.all = function(promiseArr) {
	return new MyPromise(res, rej) {
		const len = promiseArr.length;
		let num = 0;
		// 缺数组
		promiseArr.forEach(function(ele, index, self) {
			// 缺数组
			ele.then(function(val) {
				num ++;
				if(len === num) {
					res(val)
				}
			}, function(rea) {
				rej(rea);
			})
		})
	}
}




















