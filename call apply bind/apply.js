Function.prototype.myApply = function(context) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }

  let result = null;
  context = context || window;
  context.fn = this;

  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;

  return result;
};

// 默写
Function.prototype.myA = function(self, arg) {
	const fn = this;
	const obj = self || window;
	obj.fn = fn;
	const result = obj.fn(...arg);
	return result;
}

// 默写 （全对）
Function.prototype.myApply1 = function(that, arg) {
	const fn = this;
	const obj = that || window
	obj.fn = fn;
	const result = obj.fn(...arg);
	delete obj.fn;
	return result;
}


// 默写（全对）
Function.prototype._apply = function(content) {
	if(typeof this !== 'function') {
		console.err('类型错误');
		return;
	}
	let result = null;
	content = content || window;
	content.fn = this;
	if(arguments[1]) {
		result = content.fn(...arguments[1])
	} else {
		result = content.fn();
	}
	delete content.fn;
	return result;
}

