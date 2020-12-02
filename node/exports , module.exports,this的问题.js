// 面试题： 问模块导出的是什么呢？
// 答：
// 1.
// { a: 1, b: 2 }
// 
// 2.
// { c: 3, a: 1, b: 2, m: 5 }



console.log('当前模块路径：', __dirname)

console.log('当前模块文件：', __filename)

console.log(this === module.exports)
console.log(this === exports)
console.log(exports === module.exports)

// 1.
// this.m = 5
// exports.c = 3;
// module.exports = {
// 	a: 1,
// 	b: 2
// } // 重新赋值

// 2.
exports.c = 3;
module.exports.a = 1;
module.exports.b = 2;
this.m = 5;

