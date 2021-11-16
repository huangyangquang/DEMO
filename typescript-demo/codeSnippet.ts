/**
 *查找某个日期位于一年中的第几天
 *
 * @param {Date} date
 * @return {*}  {number}
 */
const dayOfYear = (date:Date):number => Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
// example:
const day = dayOfYear(new Date());
console.log('day: ', day);


/**
 *判断一个数是不是偶数
 *
 * @param {number} num
 * @return {*}  {boolean}
 */
const isEven = (num:number):boolean => num % 2 === 0;
// example:
const iseven = isEven(997); 
console.log('iseven: ', iseven);


/**
 *获取两个整数之间的随机整数
 *
 * @param {number} min
 * @param {number} max
 * @return {*}  {number}
 */
const random = (min:number, max:number):number => Math.floor(Math.random() * (max - min + 1) + min);
// example:
const randomNum = random(1, 50);
console.log('randomNum: ', randomNum);


/**
 *判断日期是不是今天
 *
 * @param {Date} date
 * @return {*}  {boolean}
 */
const isToday = (date:Date):boolean => date.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10);
// example:
console.log('isToday: ', isToday(new Date()));
console.log('isToday: ', isToday(new Date(2021, 1, 2)));