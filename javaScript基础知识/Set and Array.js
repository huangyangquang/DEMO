let o = {
	name: 'cst'
}
let arr = [11, o, 11, 12, 33, o, 33, 44, 55, 44, {name: 'hfq'}];

	// 用Set来实现去重
	let os = new Set(arr);
	let newArr = [...os];
	console.log(newArr);

let arr1 = [1, 2, 3, 4, 5, 3];
let arr2 = [1, 3, 4, 6, 7, 8];

	// 交集
	let osj1 = new Set(arr1);
	let osj2 = new Set(arr2);
	let newarrj = [...osj1].filter(ele => osj2.has(ele));
	console.log(newarrj);

	// 并集
	let osbing = new Set([...arr1, ...arr2]);
	console.log([...osbing]);

	// 差集
	let oscj1 = new Set(arr1);
	let oscj2 = new Set(arr2);
	let newarrc1 = [...oscj1].filter(ele => !oscj2.has(ele));
	console.log(newarrc1);

	let newarrc2 = [...oscj2].filter(ele => !oscj1.has(ele));
	console.log(newarrc2);
