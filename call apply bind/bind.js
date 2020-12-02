Function.prototype.newBind = function(target) {
	var fn = this;
	var _args = [].slice.call(arguments, 1);
	var temp = function () {};
	var f = function() {
		var args = [].slice.call(arguments, 0);
		return fn.apply(this instanceof temp ? this : (target || window), _args.concat(args));
	}
	temp.prototype = fn.prototype;
	f.prototype = new temp();
	return f;
}

Function.prototype.newBind = function(target) {
	var fn = this;
	var _args = [].slice.call(arguments, 1);
	var temp = function() {};
	var f = function() {
		var args = [].slice.call(arguments, 0);
		return fn.apply(this instanceof temp ? this : (target || window), _args.concat(args));
	}
	temp.prototype = fn.prototype;
	f.prototype = new temp();
	return fn;
}

// 默写（全对））
Function.prototype.myBind = function(target) {
	var fn = this;
	var arg = [].slice.call(arguments, 1);
	var temp = function() {};
	var f = function() {
		var _arg = [].slice.call(arguments, 0);
		return fn.apply(this instanceof temp ? this : (target || window), arg.concat(_arg));
	}
	temp.prototype = fn.prototype;
	f.prototype = new temp();
	return f;
}

// 默写（全对）
Function.prototype.myBind = function(target) {
	var fn = this;
	var _arg = [].slice.call(arguments, 1);
	var temp = function() {}
	var f = function() {
		var arg = [].slice.call(arguments, 0);
		return fn.apply(this instanceof tmep ? this : (target || window), _arg.concat(arg));
	}
	temp.prototype = fn.prototype;
	f.prototype = new temp();
	return f;
}


// 默写（错一处）
Function.prototype.myBind = function(target) {
	var fn = this;
	var _arg = [].slice.call(arguments, 1);
	var temp = function() {}
	var f = function() {
		var arg = [].slice.call(arguments); //
		return fn.apply(this instanceof temp ? this : (target || window), _arg.concat(arg))
	}
	temp.prototype = fn.prototype;
	f.prototype = new temp();
	return f 
}


// 默写：（全错）
Function.prototype.myBind = function(target) {
	var fn = this;
	var _args = [].prototype.slice(1);//
	var temp = function() {};
	var f = function() {
		var arg = [].prototype.slice();//
		fn.apply(this instanceof temp ? this : (target || window), _args.concat(arg));//
	}
	temp.prototype = fn.prototype;
	f.prototype = new temp;//
	return f;
}









