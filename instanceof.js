
// instanceof 运算符用于判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。
// 实现：

function myInstanceof(obj, constructor) {
  let obj_proto = Object.getPrototypeOf(obj), // 获取对象的原型
      prototype = constructor.prototype; // 获取构造函数的 prototype 对象

  // 判断构造函数的 prototype 对象是否在对象的原型链上
  while (true) {
    if (!obj_proto) return false;
    if (obj_proto === prototype) return true;

    obj_proto = Object.getPrototypeOf(obj_proto);
  }
}

// 默写 （2020.06.10） 全对
function myInstanceof(obj, constructor) {
	let obj_proto = Object.getPrototypeOf(obj),
		prototype = constructor.prototype;

	while(true) {
		if(!obj_proto) return false;
		if(obj_proto === prototype) return true;

		obj_proto = Object.getPrototypeOf(obj_proto);
	}
}


//  test
function D() {};
function C() {};
F .prototype = new C();
function F() {};
var f = new F();
var flag1 = myInstanceof(f, C);
var flag2 = myInstanceof(f, D);
console.log(flag1, flag2);

// 2020.11.05(抄写)
function _instanceof(obj, constructor) {
  let obj_proto = Object.getPrototypeOf(obj),
    prototype = constructor.prototype

  while(true) {
    if(!obj_proto) return false
    if(obj_proto === prototype) return true

    obj_proto = Object.getPrototypeOf(obj_proto)
  }
}





