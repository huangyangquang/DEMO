Function.prototype.myCall = function(context) {
  if (typeof this !== "function") {
    console.error("type error");
  }
  let args = [...arguments].slice(1),
      result = null;

  context = context || window;
  context.fn = this;

  result = context.fn(...args);

  delete context.fn;
  return result;
};

// 2020.5.19 默写（全对）
Function.prototype.myCall = function(obj, ...arg) {
  obj = obj || window;
  let fn = this;
  obj.fn = fn;
  let returnVal = obj.fn(...arg);
  delete obj.fn;
  return returnVal;
}

// 默写（全对）
Function.prototype._call = function(content) {
  if(typeof this !== 'function') {
    console.err("type error");
    return;
  }
  content = content || window;
  content.fn = this;
  let result = content.fn(...[].slice.call(arguments, 1));
  delete content.fn;
  return result;
}
