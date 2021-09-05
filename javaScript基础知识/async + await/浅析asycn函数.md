# 关于asycn + await 的两道比较简单的题目

是这样的，在掘金上看见了这篇文章[await在forEach中无效](https://juejin.cn/post/6999795230430461966)。比较好奇，就看下。

发现自己对asycn函数的理解和使用上，没有之前清晰了。

好奇怪，工具越用越不熟悉？其实也不是，之前可以没有充分理解某个点吧，在工作中不断被问题Q到，所以就在好好理解理解。

文章实际上就在讨论：为什么如下代码（上诉文章源代码），在感官上是一次性打印出结果，而不是一行输出之后再输出另外一行呢？
```
  function api(i) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const n = Math.random();
                if (n > 0.5) {
                    resolve(n);
                } else {
                    resolve(-n)
                }
            }, 1000 * 1);
        });
    }

    const list = [1, 2, 3, 4, 5];
    async function fn() {
        // 数组forEach遍历方法 await无效
        list.forEach(async (el, index) => {
            const n = await api(index);
            console.log(n, index);
        });
    };

    fn();
```

如果你也有这个疑问，请继续阅读下去：

我们先来看下如下代码：
```
function api () {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            console.log('async 异步内容')
            resolve()
        }, 4000)
    })
}

async function afn() {
    await api()
    console.log('await 阻塞之后打印')
}

function bFn () {
    console.log('普通函数')
}

afn()
bFn()
console.log('全局打印')

打印结果：
// 普通函数
// 全局打印
// (隔了4000ms之后...)
// async 异步内容
// await 阻塞之后打印
```
实际上，我们的 async函数 在执行的时候，是不会阻塞其他函数的执行的。

asycn函数 的阻塞效果，是在它自己的函数中，才会产生 阻塞的效果，不会对外界的函数产生影响。

所以，我们可以看见，先打印出了`普通函数`，`全局打印`，然后隔了4000ms之后，在打印出`async 异步内容`，`await 阻塞之后打印`


我们在回头看看这段代码：
```
  function api(i) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const n = Math.random();
                if (n > 0.5) {
                    resolve(n);
                } else {
                    resolve(-n)
                }
            }, 1000 * 1);
        });
    }

    const list = [1, 2, 3, 4, 5];
    async function fn() {
        list.forEach(async (el, index) => {
            const n = await api(index);
            console.log(n, index);
        });
    };

    fn();
```
很好理解，实际上是多个async函数被`按顺序`执行了。

代码就类似于：
```

function api(i) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const n = Math.random();
            if (n > 0.5) {
                resolve(n);
            } else {
                resolve(-n)
            }
        }, 1000 * 1);
    });
}

async function aFn() {
    const n = await api(1);
    console.log(n, 1);
}
async function bFn() {
    const n = await api(2);
    console.log(n, 2);
}
async function cFn() {
    const n = await api(3);
    console.log(n, 3);
}
async function dFn() {
    const n = await api(4);
    console.log(n, 4);
}

aFn()
bFn()
cFn()
dFn()

```

同时，文章的另外一段代码（上诉文章源代码），和上边的代码对比，大家伙可能会朦😵一下，比较有意思：
```
function api(i) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const n = Math.random();
            if (n > 0.5) {
                resolve(n);
            } else {
                resolve(-n)
            }
        }, 1000 * 2);
    });
}

const list = [1, 2, 3, 4, 5];
async function fn() {
    for (let i = 0; i < list.length; i++) {
        const n = await api(i);
        console.log('for--------', n, i);
    }
};

fn();
```
你可以思考下，这段代码，在感官上，会出现怎么样的打印效果呢？

是的，他是一行输出之后再输出另外一行，在感官上可以很明显的感受到。

实际上，这段代码可以等价为如下代码：
```

function api(i) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const n = Math.random();
            if (n > 0.5) {
                resolve(n);
            } else {
                resolve(-n)
            }
        }, 1000 * 2);
    });
}

async function fn() {
    const n1 = await api(1)
    console.log('n1: ', n1);

    const n2 = await api(2)
    console.log('n2: ', n2);

    const n3 = await api(3)
    console.log('n3: ', n3);
    
    const n4 = await api(4) 
    console.log('n4: ', n4);
};

fn();

```

所以，最后就是，`async函数`的执行，对`async函数外的函数的执行`没有阻塞作用的，发挥阻塞作用的区域在asycn函数中。