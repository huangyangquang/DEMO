// 1. 字节一面题
var arr = [1000, 100, 3000, 200, 800, 100, 700]

function fn(delay) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(delay)
		}, delay)
	})
}

async function delay(arr) {
	for(var key of arr) {
		var res = await fn(key)
		console.log(res)
	}
}

delay(arr)


// 2. asayn + await特性表现总结：
// MDN: 
// 1. async函数返回一个 Promise 对象，可以使用then方法添加回调函数。
// 2. 当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。
// 3. await 后边需要跟一个Promise对象
// 4. await的左边以及后边的代码会被放入微任务中

function fn() { // 异步函数
	setTimeout(() => {
		console.log('异步任务')
	}, 2000)
}

function fn1() { // 返回一个promise
	return new Promise((reslove) => {
		setTimeout(() => {
			reslove('异步任务')
		}, 2000)
	})
}

async function test() {
	console.log(1)                          
	await fn() // 不会阻塞代码， 同时await左边以及下面得代码会被放入微任务中， 同时会先返回
	console.log('4-1')                      // 2
	var res = await fn1() // 会阻塞代码
	console.log(res, '4-2')
	await 3 
	console.log('4-3')
	return '遇到await，我返回了'
}

setTimeout(() => {
	console.log('宏任务')                    
}, 0)

new Promise((reslove) => {
	reslove('5-1')
}).then(res => {
	console.log(res)                                  
})

var res = test() // 遇到await会先返回
console.log(res)                               
// res.then(res => {
// 	console.log(res)
// }) 暂不考虑

console.log(2)

new Promise((reslove) => {
	reslove('5-2')
}).then(res => {
	console.log(res)
})

console.log('end')
