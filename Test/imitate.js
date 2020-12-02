







// 外部迭代器
function outerIterator(o) {
	let curIndex = 0,
		next = () => {
		return {
			value: o[curIndex],
			done: ++ curIndex === o.length
		}
	}
	return {
		next
	}
}
let Oit = outerIterator([1, 5, 8, 9]);
