	// 工厂方法模式:
	// 组成：抽象工厂类 产品子工厂 每一种产品有各自的产品类
	// 好处：以后不管是扩展公有方法，还是添加子类工厂， 都可以通过原型这个接口来添加，符合开闭原则

	// 抽象工厂类
	function PlaneFactory() {

	}

	// 子类工厂都可以使用的公共方法
	PlaneFactory.prototype.touch = function() {
		this.blood -= 50;
		if(this.blood == 0) {
			this.die();
		}
	}

	// 好处：扩展公有方法
	PlaneFactory.prototype.die = function() {
		alert('boomb');
	}	

	// 创建对象的接口
	PlaneFactory.create = function(type) {
		// 判断一下是否存在该类型的子类工厂
		if(PlaneFactory.prototype[type] == undefined) {
			throw 'no this constructor';
		}
		// 子类工厂继承父类工厂
		// PlaneFactory.prototype[type] 表示的是子工厂构造函数
		// 子工厂的原型的抽象工厂构造函数new 出来的一个PlaneFactory对象
		if(PlaneFactory.prototype[type].prototype._proto_ !== PlaneFactory.prototype) {
			PlaneFactory.prototype[type].prototype = new PlaneFactory();
		}

		var arg = [].slice.call(arguments, 1);

		var newPlane = new PlaneFactory.prototype[type](...arg);
		return newPlane;
	}

	// 真正定义产品子类工厂
	PlaneFactory.prototype.SmallPlane = function(x, y) {
		this.x = x;
		this.y = y;
		this.blood = 100;
		this.width = 100;
		this.height = 100;
		this.name = 'smallPlane';
		
	}
	PlaneFactory.prototype.BigPlane = function(x, y) {
		this.x = x;
		this.y = y;
		this.blood = 100;
		this.width = 990;
		this.height = 990;
		this.name = 'BigPlane';
		
	}
	PlaneFactory.prototype.AttackPlane = function(x, y) {
		this.x = x;
		this.y = y;
		this.blood = 100;
		this.width = 440;
		this.height = 440;
		this.name = 'AttackPlane';
		this.attack = function() {
			console.log('biubiubiu~~~');
		}
	}

	var oAp = PlaneFactory.create('AttackPlane', 444, 44);
	var oSp = PlaneFactory.create('SmallPlane', 1, 1);
	var oBp = PlaneFactory.create("BigPlane", 222, 990);

