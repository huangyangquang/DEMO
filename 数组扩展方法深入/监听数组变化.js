// 在前端的 MVVM 框架当中，我们经常需要监听数据的变化，而数组是需要监听的重要对象。
// 请你完成 ObserverableArray，它的实例和普通的数组实例功能相同，
// 但是当调用：push,pop,shift,unshift,splice,sort,reverse 这些方法的时候，
// 除了执行相同的操作，还会把方法名打印出来。 例如：
// const arr = new ObserverableArray()

// arr.push('Good') // => 打印 'push'，arr 变成了 ['Good']
// 复制代码注意，你不能修改 Array 的 prototype。还有函数 return 的值和原生的操作保持一致。

function ObserverableArray() {
  return new Proxy([], {
    get(target, propKey) {
      const matArr = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
      matArr.indexOf(propKey) > -1 && console.log(propKey);
      return target[propKey]
    }
  })
}
const arr = new ObserverableArray()

arr.push('Good') // => 打印 'push'，arr 变成了 ['Good']
arr.push('Good2') // => 打印 'push'，arr 变成了 ['Good', 'Good2']
arr.unshift('Good2') // => 打印 'unshift'，arr 变成了 ['Good2','Good', 'Good2']
console.log(arr) // ['Good2','Good', 'Good2']


