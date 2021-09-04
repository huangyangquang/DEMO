// javaScript 高级程序设计

// 1.工厂模式
function createPerson(name, age, job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        alert(this.name);
    };
    return o;
}

var person1 = createPerson("james"，9，"student");
var person2 = createPerson("kobe"，9，"student");


// 2.构造函数模式
function createPerson(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function(){
        alert(this.name);
    };
}

var person1 = new createPerson("james"，9，"student");
var person2 = new createPerson("kobe"，9，"student");


// 3.原型模式
function Person(){

}

Person.prototype.name = "james";
Person.prototype.age = 9;
Person.prototype.job = "student";
Person.prototype.sayName = function(){
    alert(this.name);
}

var person1 = new Person();
person1.sayName(); // "james"

var person2 = new Person();
person2.sayName(); // "james"


console.log(person1.sayName === person2.sayName) // true


// 4.组合使用构造函数模式和原型模式
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
}

Person.prototype = {
    constructor: Person,
    sayName: function(){
        alert(this.name);
    }
}

var person1 = new createPerson("james"，9，"student");

var person2 = new createPerson("kobe"，9，"student");

console.log(person1.name); // "james"
console.log(person2.name); // "kobe"
console.log(person1.sayName === person2.sayName); // true


// 5.动态原型模式
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;

    if(typeof this.sayName !== "function" ){

        Person.prototype.sayName: function(){
            alert(this.name);
        } 
    } 
}

var person1 = new createPerson("james"，9，"student");

person1.sayName(); // "james"


// 6.寄生构造函数模式
function Person(name, age, job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        alert(this.name);
    };
    return o;
}

var person1 = new Person("james", 9, "student");
console.log(person1);


// 7.稳妥构造模式
function Person(name) {
  var o = new Object()
  o.say = function() {
    console.log(name)
  }
  return o
}
var person1 = new Person('hanmeimei');
person1.name  // undefined
person1.say() //hanmeimei



// 题目：
// 寄生式组合继承的实现？
function Person(name) {
  this.name = name;
}

Person.prototype.sayName = function() {
  console.log("My name is " + this.name + ".");
};

function Student(name, grade) {
	// 寄生
  Person.call(this, name);
  this.grade = grade;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.sayMyGrade = function() {
  console.log("My grade is " + this.grade + ".");
};

var stu =  new Student('sjkl', 'sak;');



