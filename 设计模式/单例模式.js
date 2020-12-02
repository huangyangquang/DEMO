// 单例模式封装
var getSingle = function(func) {
	var result;
	return function() {
		if(!result) {
			result = func.apply(this, arguments);
		}
		return result;
	}
}

// 默写（全对）
function single(func) {
	let result = null;
	return function() {
		if(result == null) {
			result = result.apply(this, arguments);
		}
		return result;
	}
}

//  罚写1： 全对
function single(func) {
	let result = null;
	return function() {
		if(result === null) {
			result = func.apply(this, arguments);
		}
		return result;
	}
}


// 默写 2020.05.20 错误
function single(func) {
	var obj = null;
	var self = this; //
	return function() {
		if(obj === null) {
			obj = func.apply(self, arguments); //
		}
		return obj;
	}
}


// 默写（全对）
var  getSingle = function(func) {
	var result = null;
	return function() {
		if(result == null) {
			result = func.apply(this, arguments);
		}
		return result;
	}
}


// eg: 弹窗功能
	var CreateAlert = function(text) {
		var oDiv = document.createElement('div');
		oDiv.style.display = 'none';
		oDiv.innerText = text || 'hahhs';
		document.body.appendChild(oDiv);
		return oDiv;
	}
		
	var SingleAlert = getSingle(CreateAlert);

	btn.onclick = function() {
		// div元素只是创建一次
		var oDiv = SingleAlert('hello, hihi');
		oDiv.style.display = 'block';
	}

