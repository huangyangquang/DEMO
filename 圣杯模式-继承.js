
function inherit(Target, Origin) {
	function F() {};
	F.prototype = Origin.prototype;
	Target.prototype = new F();
	//重点强调：上面两行 千万要按顺序写，原型指向问题。
	// 如果颠倒，那么new的时候用的是原来的原型，你后来改已经晚了，人家已经new完了。
	Target.prototype.constructor = Target;//使构造器归位
	Target.prototype.uber = Origin.prototype;//超类，真正继承自谁
}


// 默写（全对）
function inherit(Target, Origin) {
	function F() {}
	F.prototype = Origin.prototype;
	Target.prototype = new F();
	Target.prototype.constructor = Target;
	Target.prototype.uber = Origin.prototype;
}


// 默写
function inherit(Target, Origin) {
	function F() {}
	F.prototype = Origin.prototype;
	Target.prototype = new F();
	Target.prototype.constructor = Target;
	Target.prototype.uber = Origin.prototype;
}

// 默写 （错一处）
function inherit(Target, Origin) {
	function F() {};
	F.prototype = Origin.prototype;
	Target.prototype = new F();
	Target.prototype.constructor = Target;
	Target.prototype.uber = Origin; //
}

// 全对 （2020.09.06）
function inherit(Target, Origin) {
	function F() {}
	F.prototype = Origin.prototype;
	Target.prototype = new F();
	Target.prtotype.constructor = Target;
	Target.prototype.uber = Origin.prototype；
}
