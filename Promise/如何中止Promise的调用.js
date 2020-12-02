// 1.throw new Error("");
// 2.Promise.reject();


let op = new Promise((res, rej) => {
	res(123);
})

// 1.
op.then(val => {
	console.log(val);
	return val;
}, err => {
	console.log(err);
}).then(val => {
	throw new Error(val)
}).then(val => {
	return val;
}, err => {
	console.log(err);
}).then(val => {
	return val;
}, err => {
	console.log(err);
}).catch(err => {
	console.log(err);
})

// 2.
op.then(val => {
	console.log(val);
	return val;
}, err => {
	console.log(err);
}).then(val => {
	return Promise.reject(val);
}).then(val => {
	return val;
}, err => {
	console.log(err);
}).then(val => {
	return val;
}, err => {
	console.log(err);
}).catch(err => {
	console.log(err);
})