	// 举个例子：
	// Event
	// 1.Event on emmit remove once（面试）
	// 2.有助于了解 观察者模式
	// 3.node里面有

	function Event() {
		// 存储 不同事件类型对应的不同处理函数
		this.cache = {};
	}

	Event.prototype.on = function(type, handle) {
		if(!this.cache[type]) {
			this.cache[type] = [handle];
		} else {
			this.cache[type].push(handle);
		}
	}

	Event.prototype.emmit = function() {
		var type = arguments[0];
		var arg = [].slice.call(arguments, 1);
		for(var i = 0; i < this.cache[type].length; i ++) {
			this.cache[type][i].apply(this, arg);
		}
	}

	Event.prototype.empty = function(type) {
		this.cache[type] = [];
	}

	Event.prototype.remove = function(type, handle) {
		this.cache[type] = this.cache[type].filter(function(ele) {
			return !(ele == handle)
		})
	}

	Event.prototype.once = function(type, handle) {
		let wrapFun = function(...args) {
	      handle(...args);
	      this.remove(type, wrapFun);
	    };
	    this.on(type, wrapFun);
	}

	// 测试
	var oE = new Event();
	function deal1(time) {
		console.log('overtime0111111111:' + time);
	}
	function deal2(time) {
		console.log('overtime22222222222:' + time)
	}
	oE.on('over', deal1)
	oE.on('over', deal2)
	oE.once('over', function(time) {
		console.log('一次就好' + time);
	})
	
	oE.emmit('over', '2019-09-25');

	oE.remove('over', deal2);

	oE.emmit('over', '2019-09-25');

	// 默写 两处错误 this指向 参数问题
function Event() {
	this.cache = {};
}

Event.prototype.on = function(type, handle) {
	if(this.cache[type]) {
		this.cache[type].push(handle);
	} else {
		this.cache[type] = [handle];
	}
}

Event.prototype.emmit = function(type) {
	var self = this;
	var arg = [].slice.call(arguments, 1);
	this.cache[type].forEach(function(ele) {
		ele.apply(self, arg); // this指向 参数
	})
}

Event.prototype.remove = function(type, handle) {
	this.cache[type] = this.cache[type].filter(function(ele) {
		return ele != handle;
	})
}

Event.prototype.empty = function(type) {
	this.cache[type] = [];
}

Event.prototype.once = function(type, handle) {
	var fn = function() {
		handle(...arguments); 
		this.remove(type, fn);
	}
	this.on(type, fn);
}

var oe = new Event();
oe.once('over', function(a) {
	console.log('once', a)
})

oe.emmit('over', 'hhahhha')
oe.emmit('over', 'hhahhha')


// 默写 错三处 函数没有写在原型上 没有写handle的参数
// 	function Event() {
// 	this.cache = {};
// 	this.on = function(type, handle) { // 原型上
// 		if(this.cache[type]) {
// 			this.cache[type].push(handle)
// 		} else {
// 			this.cache[type] = [handle];
// 		}
// 	}
// 	this.emmit = function(type) { // 原型上 参数
// 		this.cache[type].forEach(function(ele) {
// 			ele();
// 		})
// 	}
// 	this.remove = function(type, handle) { // 原型上
// 		this.cache[type] = this.cache[type].filter(function(ele) {
// 			ele !== handle
// 		})
// 	}
// 	this.empty = function(type) { // 原型上
// 		this.cache[type] = [];
// 	}
// 	this.once = function(type, handle) { // 原型上
// 		var wrapFun = fucntion() { // 参数
// 			handle();
// 			this.remove(type, handle);
// 		}
// 		this.on(type, wrapFun);
// 	}

// 	this.emmit()
// }


// 默写 （2020.09.06）
function Event() {
	this.cache = {}
}

Event.prototype.on = function(type, handle) {
	if(this.cache[type]) {
		this.cache[type].push(handle)
	} else {
		this.cache[type] = [handle]
	}
}

Event.prototype.emmit = function(type) {
	if(!this.cache[type]) {
		return 'no type handle'
	}
	var len = this.cache[type].length;
	var arg = arguments.slice(1); // 错误· var arg = [].slice.call(arguments, 1);
	for(var i = 0; i < len; i ++) {
		this.cache[type][i].apply(this, arg);
	}
}

Event.prototype.remove = function(type) { // 错误 是解绑某一个函数
	this.cache[type] = [];
}

Event.prototype.once = function(type, ...arg) { // 绑定时确定只能执行一次
	this.emmit(type, ...arg);
	this.remove(type);
}


// 全对（2020.09.06）
function Event() {
	this.cache = {}
}

Event.prototype.on = function(type, handle) {
	if(this.cache[type]) {
		this.cache[type].push(handle);
	} else {
		this.cache[type] = [handle];
	}
}

Event.prototype.emmit = function(type, ...arg) {
	var len = this.cache[type].length;
	for(var i = 0; i < len; i ++) {
		this.cache[type][i].apply(this, arg);
	}
}

Event.prototype.remove = function(type, handle) {
	this.cache[type] = this.cache[type].filter(ele => !(ele == handle))
}

Event.prototype.once = function(type, handle) {
	var self = this;
	var wrapFn = function(...arg) {
		handle.call(self, ...arg);
		self.remove(type, wrapFn);
	}
	self.on(type, wrapFn)
}

Event.prototype.empty = function(type) {
	this.cache[type] = [];
}

var oE = new Event();
function deal1(time) {
	console.log('overtime0111111111:' + time);
}
function deal2(time) {
	console.log('overtime22222222222:' + time)
}