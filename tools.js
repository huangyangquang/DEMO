//判断类型
function type (target) {
		var ret = typeof(target);
			f = Object.prototype.toString;
			obj = {
			'[object Array]' : 'array',
			'[object Object]' : 'object',
			'[object Number]' : 'number - object',
			'[object String]' : 'string - object',
			'[object Boolean]' : 'boolean - object'
		}
		if(target === null) return 'null';
		if(ret == 'object') {
			var str = f.call(target);
			return obj[str];
		}else return ret;
	}
	

//数组去重
	Object.prototype.unique = function () {
		var temp = {},
			arr = [];
			len = this.length;
		for(var i = 0; i < len; i ++){
			if(!temp[this[i]]){
				temp[this[i]] = 'abnm';
				arr.push(this[i]);
			}
		}
		return arr;
	}


//查看滚动条的滚动距离
function getScrollOffset() {
		if(window.pageXOffset){
			return {
				x : window.pageXOffset,
				y : window.pageYOffset
			}
		}else{
			return{
				x : document.body.scrollLeft + document.documentElement.scrollLeft,
				y : document.body.scrollTop + document.documentElement.scrollTop
			}
		}
	}

// 查看视口的尺寸
function getViewportOffset() {
		if(window.innerWidth) {
			return {
				w : window.innerWidth,
				h : window.innerHeight
			}
		}else{
			if(document.compatMode === "BackCompat"){
				return {
					w : document.body.clientWidth,
					h : document.body.clientHeight
				}
			}else{
				return {
					w : document.documentElement.clientWidth,
					h : document.documentElement.clientHeight
				}
			}
		}
	}


//查询CSS样式
function getStyle(elem, prop) {
		if(window.getComputedStyle) {
			return window.getComputedStyle[prop];
		}else{
			return elem.currentStyle[prop];//IE
		}
	}

//封装兼容性的 addEvent(elem, type, handle);方法。
//给一个dom对象添加该事件类型的事件处理函数：
	function addEvent(elem, type, handle) {//type 要字符串形式输入
		if (elem.addEventListener) {
			elem.addEventListener(type, handle, false);
		}else if (elem.attachEvent) {
			elem.attachEvent("on" + type, function () {
				handle.call(elem);
			})
		}else {
			elem['on' + type] = handle;//中括号形式
		}
	}


// 封装取消冒泡的函数 stopBubble(event)
	function stopBubble (event) {
		if(event.stopPropagation) {
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
	}

//封装阻止默认事件的函数 cancelHandler(event);
	function cancelHandler(event) {
		if(event.preventDefault) {
			event.preventDefault(event);
		}else {
			event.returnValue = false;
		}
	}


//异步加载，
function loadScript(url, callback) {
		var script = document.createElement('script');
		script.text = 'text/javascript';
		if(script.readyState){
			script.onreadystatechange = function () {
				if (script.readtState == 'complete' || script.readtState == 'loaded') {
					callback();//也可以配合js文件一起写;多个回调函数可以传一个数组。
				}
			}
		}else{
			script.onload = function() {
				callback();
			}
		}//事件先绑定，然后在去加载文件
		script.src = url;//兼容
		document.head.appendChild(script);
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


// 动态加载脚本等资源
// url，请求资源的路径
// callback，全部资源加载完成之后的回调
function LoadScript(url, callback) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	// IE 浏览器下
	if (script.readyState) {
		script.onreadystatechange = function () {
			if (script.readyState == 'loaded' || script.readyState =='complete') {
				// 确保执行两次
				script.onreadystatechange = null;
				// todo 执行要执行的代码
				callback()
			}
		}
	} else {
		script.onload = function () {
			callback();
		}
	}
	script.src = url;
	document.getElementsByTagName('head')[0].appendChild(script);
}
