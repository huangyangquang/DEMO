// promisify.js
module.exports = {
   promisify(fn){
       return function () {
           var args = Array.from(arguments); // 参数作为数组，供fn.apply(即原函数)使用
           return new Promise(function (resolve, reject) {
              fn.apply(null, args.concat(function (err) { // 拼接上原函数的回调函数
                 if (err) {
                     reject(err);
                 } else {
                     resolve(arguments[1])
                 }
              }));
           })
       }
   }
}
