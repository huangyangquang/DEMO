function sum (...args) { // 解构

  const f = (...rest) => {
    return sum(...[...args, ...rest]) // 递归, 参数最后被收集到了args
  }

  f.valueOf = () => {
    return args.reduce((x, y) => x + y, 0) // 数据方法
  }

  return f // 闭包
}

sum(1, 2, 3).valueOf() //6
sum(2, 3)(2).valueOf() //7
sum(1)(2)(3)(4).valueOf() //10
sum(2)(4, 1)(2).valueOf() //9
sum(1)(2)(3)(4)(5)(6).valueOf() // 21

function sum(...args) {
	
	const f = (...rest) => {
		return sum(...[...args, ...rest])
	}

	f.valueOf = () => {
		return args.reduce((x, y) => x + y, 0);
	}

	return f;
}

// 2020.11.04
function sum(...pre) {
	function f(...last) {
		return sum(...pre, ...last)
	}

	f.valueOf = function() {
		return [...pre].reduce((a, b) => (a + b))
	}

	return f
}

console.log( sum(1, 2, 3)(1, 2)(1, 2).valueOf() )

// 2020.11.05 (默写 全对)
function sum(...arg) {
	var f = function(...args) {
		return sum(...arg, ...args);
	}

	f.valueOf = function() {
		const sum = arg.reduce((a, b) => {
			return a + b;
		})
		return sum
	}

	return f
}

























