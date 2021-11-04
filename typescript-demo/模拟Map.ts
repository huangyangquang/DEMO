export type callback<T, U> = (key: T, val: U) => void

/**
 * typescript模拟Map实现
 */
export class Dictionaries<K, V> {
    private keys: K[] = []
    private vals: V[] = []

    /**
     * 返回数据的总数
     * @readonly
     * @memberof Dictionaries
     */
    get size () {
        return this.keys.length
    }

    /**
     *设置键值对
     * @param {K} key
     * @param {V} val
     * @memberof Dictionaries
     */
    set(key: K, val: V) {
        const index = this.keys.indexOf(key)
        if (index < 0) {
            this.keys.push(key)
            this.vals.push(val)
        } else {
            this.vals[index] = val
        }
    }

    /**
     *获取某个键的值
     * @param {K} key
     * @memberof Dictionaries
     */
    get(key: K) {
        const index = this.keys.indexOf(key)
        if (index < 0) return
        else this.vals[index]
    }

    /**
     *判断某个键值对是否存在
     * @param {K} key
     * @return {*} 
     * @memberof Dictionaries
     */
    has(key: K) {
        return this.keys.includes(key)
    }

    /**
     *移除某个键值对
     * @param {K} key
     * @memberof Dictionaries
     */
    remove(key: K) {
        const index = this.keys.indexOf(key)
        if (index < 0) {
            return
        } else {
            this.keys.splice(index, 1)
            this.vals.splice(index, 1)
        }
    }

    /**
     *迭代所有的键值对
     * @param {callback<K, V>} callback
     * @memberof Dictionaries
     */
    forEach(callback: callback<K, V>) {
        this.keys.forEach((key, index) => {
            const val = this.vals[index]
            callback(key, val)
        })
    }
}

const d = new Dictionaries<string, number>()
d.set('a', 1)
d.set('b', 2)

d.forEach((key, val) => {
    console.log(`${key}:${val}`);
})
// a:1
// b:2

console.log('has：a', d.has('a')); // has：a true
console.log('get: a', d.get('a')); // get: a undefined

d.remove('a')

console.log('has：a', d.has('a')); // has：a false

d.set('c', 3)
d.set('b', 4)

d.forEach((key, val) => {
    console.log(`${key}:${val}`);
})
// b:4
// c:3

console.log('size:', d.size) // size: 2