	// 节流
	function throttle(fn, wait) {
		var lastTime = 0;
		return function() {
			var nowTime = new Date().getTime();
			if(nowTime - lastTime > wait) {
				fn.apply(this, arguments);
				lastTime = nowTime;
			}
		}
	}

	// 防抖
	function debounce(fn, delay) {
		var timer = null;
		return function() {
			clearTimeout(timer);
			var self = this;
			var args = arguments;
			timer = setTimeout(function() {
				fn.apply(self, args);
			}, delay)
		}
	}





function th(fn, wait) {
	var lastTime = 0;
	return function() {
		var newTime = new Date().getTime();
		if(newTime - lastTime > wait) {
			fn.apply(this, arguments);
			lastTime = newTime;
		}
	}
}




function thron(fn, delay) {
	var timer = null;
	return function(...arg) {
		clearTimeout(timer);
		var self = this;
		timer = setTimeout(function() {
			fn.apply(self, arg);
		}, delay);
	}
}

function throttle(fn, delay) {
	var timer = null;
	return function() {
		clearTimeout(timer);
		var self = this;
		var args = arguments;
		timer = setTimeout(function() {
			fn.apply(self, args);
		}, delay);
	}
}

function throttle(fn, wait) {
	var lastTime = 0;
	return function() {
		var nowTime = new Date().getTime();
		if(nowTime - lastTime > wait) {
			fn.apply(this, arguments);
			lastTime = nowTime;
		}
	}
}


function throttle(fn, wait) {
	var lastTime = 0;
	return function() {
		var nowTime = new Date().getTime();
		if(nowTime - lastTime > wait) {
			fn.apply(this, arguments);
			lastTime = nowTime;
		}
	}
}


function throttle(fn, wait) {
	var lastTime = 0;
	return function() {
		var nowTime = new Date().getTime();
		if(nowTime - lastTime > wait) {
			fn.apply(this, arguments);
			lastTime = nowTime;
		}
	}
}


// 2020.11.05 默写 全对
// 节流
function jieliu(fn, wait) {
	var curTime = 0

	return fucntion(...arg) {
		var lastTime = new Date().getTime()
		var self = this
		if(lastTime - curTime > wait) {
			fn.call(self, ...arg)
			curTime = lastTime
		}
	}
}


// 防抖
function fandou(fn, delay) {
	var timer = null
	return function(...arg) {
		clearTimeout(timer)
		var self = this
		timer = setTimeout(function() {
			fn.call(self, ...arg)
		}, delay);
	}
}
