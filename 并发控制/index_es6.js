// 核心是，通过给 Promise.race(executing) 注册then方法，当 Promise.race(executing) 最
// 快的任务结束时，就进行递归，开启新的任务。

function asyncPool(poolLimit, array, iteratorFn) {
  let i = 0;
  const ret = []; // 存储所有的异步任务
  const executing = []; // 存储正在执行的异步任务
  const enqueue = function () {
    if (i === array.length) {
      return Promise.resolve();
    }
    const item = array[i++]; // 获取新的任务项
    const p = Promise.resolve().then(() => iteratorFn(item, array));
    ret.push(p);

    let r = Promise.resolve();

    // 当poolLimit值小于或等于总任务个数时，进行并发控制
    if (poolLimit <= array.length) {
      // 当任务完成后，从正在执行的任务数组中移除已完成的任务
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= poolLimit) { // 存储正在执行的异步任务的数量 和 控制的并发数相等时
        r = Promise.race(executing); // 执行里边的异步任务
      }
    }
 
    // 正在执行任务列表 中较快的任务执行完成之后，才会从array数组中获取新的待办任务
    return r.then(() => enqueue());
  };

  return enqueue().then(() => Promise.all(ret));
}


const timeoutFn = i => new Promise(resolve => setTimeout(() => {
  console.log(i)
  resolve(i) 
}, i));

asyncPool(2, [1000, 5000, 3000, 2000], timeoutFn).then(res => {
  console.log('res', res)
})

