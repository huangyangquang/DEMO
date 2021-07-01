// poolLimit：表示限制的并发数；
// array：表示任务数组；
// iteratorFn：表示迭代函数，用于实现对每个任务项进行处理，该函数会返回一个 Promise 对象或异步函数。

// 核心是，在遍历每一个任务的过程中，之前的任务会异步执行，而且最重要的是，
// 这个过程会获取出之前的任务中的两个未完成的来阻塞后续任务的运行。
// 这样就起到了并发控制的作用。
async function asyncPool(poolLimit, array, iteratorFn) {
  const ret = []; // 存储所有的异步任务
  const executing = []; // 存储正在执行的异步任务

  for (const item of array) {
    // 调用iteratorFn函数创建异步任务
    const p = Promise.resolve().then(() => iteratorFn(item, array)); // 异步之后的操作
    ret.push(p); // 保存新的异步任务

    // 当poolLimit值小于或等于总任务个数时，进行并发控制
    if (poolLimit <= array.length) {
      // 当任务完成后，从正在执行的任务数组中移除已完成的任务
      const e = p.then(() => executing.splice(executing.indexOf(e), 1)); // 异步之后的操作
      executing.push(e); // 保存正在执行的异步任务
      if (executing.length >= poolLimit) {
        await Promise.race(executing); // 【等待】 较快的任务执行完成
      }
    }
  }

  return Promise.all(ret);
}

const timeoutFn = i => new Promise(resolve => setTimeout(() => {
  console.log(i)
  resolve(i) 
}, i));

asyncPool(2, [1000, 5000, 3000, 2000], timeoutFn).then(res => {
  console.log('res', res)
})

console.log(123)