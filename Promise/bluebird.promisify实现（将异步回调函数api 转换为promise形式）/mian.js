// main.js
const fs = require('fs');
const {promisify} = require('./promisify.js');

const readFile = promisify(fs.readFile); // 转换异步读取

// 异步文件 由回调函数形式变成promise形式
readFile('./1.txt', 'utf8').then(data => { 
   console.log(data);
}).catch(err => {
   console.log(err);
});

console.log(1)
