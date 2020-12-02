var str = "aaa++==bbbtrArr";

String.prototype.reserve = reserve;

function reserve() {
	let strArr = Array.prototype.slice.call(this),
		len = strArr.length;
	for(let i = 0; i < len / 2; i ++) {
		let temp = strArr[i];
		strArr[i] = strArr[len - i - 1];
		strArr[len - i - 1] = temp;
	}
	return strArr.join("");	
}

console.log( str.reserve() );
