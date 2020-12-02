// 说一下javascrip继承方式有哪一些？
// 答：















// 有哪些继承的方式呢？
// 答：
// 1. 原型链继承： 
// 本质是利用原型让一个引用类型继承另一个引用类型的属性和方法
	function Super() {
		this.name = 'huang'
		this.color = []
	}

	Super.prototype.getName = function() {
		return this.name
	}

	function Sub() {
		this.sex = 'boy'
	}

	Sub.prototype.getSex = function() {
		return this.sex
	} 

	Sub.prototype = new Super()

	var sub = new Sub()
	console.log( sub.getName() )
	console.log( Object.getPrototypeOf(sub).constructor === Super)
	// console.log( sub.getSex() ) // 原型被改写了吗
	
	// 实例1：
	var sub1 = new Sub()
	sub1.name = 'huang' // 新增属性
	sub1.color.push('red') // 原型上包含引用类型值的属性始终都会被所有实例共享
	console.log(sub1.getName(), sub1.color) // 引用类型值的属性一旦被修改，所有实例会继承这一修改

	// 实例2：
	var sub2 = new Sub()
	sub2.name = '随会'
	sub2.color.push('blue') // 原型上包含引用类型值的属性始终都会被所有实例共享
	console.log(sub2.getName(), sub2.color) // 引用类型值的属性一旦被修改，所有实例会继承这一修改
	console.log(sub1.getName(), sub1.color)
	console.log(sub1.hasOwnProperty('name'))
	console.log(sub1.hasOwnProperty('color'))
	console.log('=====================================')

// 缺点：
	// 1. 原型上包含引用类型值的属性始终都会被所有实例共享，引用类型值的属性一旦被修改，所有实例会继承这一修改
	// 2. 创建子类实例的时候，不能向父类的构造函数传递参数
	// 3. 少用

// 2. 借用构造函数：
// 本质就是在子类构造函数的内部调用父类构造函数
	function Super(name) {
		this.color = []
		this.name = name
	}

	function Sub(name) {
		Super.call(this, name) // 借用构造函数
	}

	var sub = new Sub()
	sub.color.push('huang')
	console.log(sub.color)

	var sub1 = new Sub('fengqna')
	console.log(sub1.color)
	console.log(sub1.name)
// 优点：
	// 	1. 解决了原型链中共享一个原型的问题
	// 	2. 可以在子类的构造函数中向父类传递参数
// 缺点：
	// 1.函数属性都是在构造函数里定义的，也就是每一个生成的实例都有自己的方法属性，就不能实现函数复用，同时也浪费了内存


// 3. 组合继承（原型链继承 + 借用构造函数继承）
// 本质是就是使用原型链实现对原型属性和方法继承，而通过借用构造函数来实现对实例属性的继承
	function Super(name) {
		this.name = name
		this.color = []
	}

	Super.prototype.getName = function() {
		console.log(this.name)
	}

	function Sub(name, age) {
		// 继承父类上的属性，使其成为自身属性
		Super.call(this, name) // 第二次调用
		this.age = age
	}

	Sub.prototype = new Super() // 第一次调用

	Sub.prototype.getAge = function() {
		console.log(this.age) 
	}

	// 实例1：
	var sub = new Sub('huang', 18)
	sub.color.push('fehuqna')
	console.log(sub.color)
	sub.getName()
	sub.getAge()

	// 实例2：
	var sub1 = new Sub('shui', 28)
	sub1.color.push('kjkl')
	console.log(sub1.color)
	sub1.getName()
	sub1.getAge()

// 优点：
	// 1. 避免了原型链和借用构造函数的缺陷。通过原型上定义的方法实现了函数的复用，同时保证每一个实例都有它自己的属性
// 缺点：
	// 1. 无论什么情况下,都会调用两次父类构造函数：一次是在创建子类原型时，一次时在子类构造函数内部（寄生组合式可以解决）


// 4. 原型式继承：
// 思想： 借助原型可以基于已有的对象创建对象，同时还不必因此创建自定义类型。
// 所以： 这样方式要求你必须有一个对象可以作为另外一个对象（即返回值）的原型
	function object(obj) {
		function F() {} // 每一次都是一个新的函数，只是函数名一样
		F.prototype = obj
		return new F()
	} // 本质上，object函数对参数obj进行了潜复制

	var person = {
		name: 'huang',
		color: []
	}

	var sub1 = object(person)
	sub1.name = 'per'
	sub1.color.push('red')

	var sub2 = object(person)
	sub2.name = 'ooopppooo'
	sub2.color.push('yellow', 'blue')

	console.log(person.color)
	console.log(person.name)
	console.log(sub1.name)
	console.log(sub2.name)
// 注意：ES5中的Object.create()方法式对原型式继承的规范
// 缺点：
	// 1. 原型上包含引用类型值的属性始终都会被所有实例共享，和原型链继承一样

// 5. 寄生式继承：
// 思想： 创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，
// 最后再像真地是它做了所有工作一样返回对象。（他与原型式继承紧密相关）
	function object(obj) {
		function F() {} // 每一次都是一个新的函数，只是函数名一样
		F.prototype = obj
		return new F()
	}

	function createObject(origin) {
		var clone = object(origin)
		clone.say = function() { // 增强对象
			console.log('hi')
		}
		return clone
	}

	var person = {
		name: 'sjai',
		color: []
	}

	var per1 = createObject(person)
	per1.color.push('saj')
	per1.say()
	console.log(per1.color)

	var per2 = createObject(person)
	per2.color.push('saiosa')
	per2.say()
	console.log(per2.color)
// 注意： object函数不是必须的；任何能够返回新对象都适用于此模式
// 缺点：
	// 1. 原型上包含引用类型值的属性始终都会被所有实例共享，和原型链继承一样

// 6. 寄生组合模式： (圣杯模式)
// 本质： 通过借用构造函数来继承属性，通过原型的混成形式来继承方法
	function inherit(Sub, Super) {
		function F() {}
		F.prototype = Super.prototype
		Sub.prototype = new F()
		Sub.prototype.constructor = Sub
		Sub.prototype.uber = Super.prototype
	} 

	function Super(name) {
		this.name = name
		this.color = []
	}

	Super.prototype.sayName = function() {
		console.log(this.name)
	}

	function Sub(name, age) {
		Super.call(this, name)
		this.age = age
	}

	inherit(Sub, Super)

	Sub.prototype.sayAge = function() {
		console.log(this.age)
	}

	// 实例1：
	var sub1 = new Sub('hang', 18)
	sub1.color.push('res', 'iioi') // 通过： Super.call(this, name)； 使color是自身的属性
	console.log(sub1.color)
	sub1.sayName()
	sub1.sayAge()

	// 实例2：
	var sub2 = new Sub('hghui', 78)
	sub2.color.push('buke')
	console.log(sub2.color)
	sub2.sayName()
	sub2.sayAge()

// 优点：
	// 1. 高效率得只调用了一次Super函数



// 参考：
// 《javascript高级程序设计》第三版