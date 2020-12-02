// 监听器 Observer:
/**
  * 循环遍历数据对象的每个属性
  */
function observable(obj) {
    if (!obj || typeof obj !== 'object') {
        return;
    }
    let keys = Object.keys(obj);
    keys.forEach((key) => {
        defineReactive(obj, key, obj[key])
    })
    return obj;
}
/**
 * 将对象的属性用 Object.defineProperty() 进行设置
 */
function defineReactive(obj, key, val) {
    Object.defineProperty(obj, key, {
        get() {
            console.log(`${key}属性被读取了...`);
            return val;
        },
        set(newVal) {
            console.log(`${key}属性被修改了...`);
            val = newVal;
        }
    })
}

// 测试
const obj = {
	name: 'asu',
	age: 18
}

observable(obj);

console.log(obj);

console.log(obj.age);

obj.name = 'hang';
console.log(obj.name);



// 作者：我是你的超级英雄
// 链接：https://juejin.im/post/5d421bcf6fb9a06af23853f1
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
