/**
	url: string 地址
	params: obj 参数
	cb: function 回调函数
	cbN: string 回调函数名字
**/
function jsonp(url, params, cb, cbN) {
	let queryString = url.indexOf('?') === -1 ? '?' : '&';
	for(let k in params) {
		if(params.hasOwnProperty(k)) {
			queryString += `${k}=${params[k]}&`;
		}
	}
	const cbName = 'jsonp' + Math.random().toString().replace('.', '');
	const oScript = document.createElement('script');
	oScript.src = `${url}${queryString}${cbN}=${cbName}`;
	window[cbName] = function() {
		cb(...arguments);
		document.body.removeChild(oScript)
	}
	document.body.appendChild(oScript);
}


// 默写（全对）
function jsonp(url, params, cb, cbN) {
	let queryString = url.indexOf('?') === -1 ? '?' : '&';

	for(let k in params) {
		if(params.hasOwnProperty(k)) {
			queryString += `${k}=${params[k]}&`;
		}
	}

	const cbName = `jsonp${Math.random().toString().replace('.', '')}`;
	url += `${queryString}${cbN}=${cbName}`;
	const oS = document.createElement('script');
	oS.scr = url;

	window[cbName] = function(...arg) {
		cb(...arg);
		document.body.removeChild(oS);
	}
	document.body.appendChild(oS);
}


// 默写 （错一处）
function jsnop(url, params, cb, cbN) {
	const queryString = url.indexOf('?') !== -1 ? '&' : '?'; // const

	for(let k in params) {
		if(params.hasOwnProperty(k)) {
			queryString += `${k}=${params[k]}&`
		}
	}

	const cbName = `jsnop${Math.random().toString().replace('.', '')}`

	url += `${url}${queryString}${cbN}=${cbName}`
	const oS = document.createElement('script');
	oS.src = url;

	window[cbName] = function() {
		cb(res); // 参数
		document.body.removeChild(oS);
	}

	document.body.appendChild(oS)
}


// 默写（错了三处，已经修改）
function jsonp(url, params, cb, cbN) {
	let queryString = url.indexOf('?') === -1 ? '?' : '&';
	for(key in params) {
		if(params.hasOwnProperty(key)) {
			queryString += `${key}=${params[key]}&`
		}
	}
	const cbName = 'jsonp' + Math.random().toString().replace('.', '');
	url = url + `${queryString}${cbN}=${cbName}`;
	const oScript = document.createElement('script');
	oScript.scr = url;
	window[cbName] = function() {
		cb(...arguments);
		document.body.removeChild(oScript);
	}
	document.body.appendChild(oScript);
}


//默写 （6处）
function jsonp(url, params, cb, cbN) {
	const queryString = url.indexOf('?') === -1 ? '&' : '?'; //
	Object.keys(params).forEach((ele, index, self) =>  {
		queryString += `${ele}=${self[ele]}`;//
	}) 
	const cbName = cbN + Math.random().toString().replace('.', ''); //
	url += `${queryString}&${cbN}=${cbName}`;//
	const oS = document.createElement('script');
	oS.src = url;
	
	window.cbN = function(res) {//
		cb(res);//
		document.body.removeChild(oS);
	}
	document.body.appendChild(oS)；
}












