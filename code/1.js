const _ = require('lodash')
const fp = require('lodash/fp')

const cars = [
	{
		name: 'Ferrari FF',
		horsepower: 660,
		dollar_value: 700000,
		in_stock: true
	},
	{
		name: 'Spyker C12 Zagato',
		horsepower: 650,
		dollar_value: 648000,
		in_stock: false
	},
	{
		name: 'Jaguar XKR-S',
		horsepower: 550,
		dollar_value: 132000,
		in_stock: false
	},
	{
		name: 'Audo R8',
		horsepower: 525,
		dollar_value: 114200,
		in_stock: false
	},
	{
		name: 'Aston Martin One-77',
		horsepower: 750,
		dollar_value: 1850000,
		in_stock: true
	},
	{
		name: 'Pagani Huayra',
		horsepower: 700,
		dollar_value: 1300000,
		in_stock: false
	}
]

/** 练习1: 改造isLastInStock */
let isLastInStock = function(cars) {
	let last_car = fp.last(cars)
	return fp.prop('in_stock', last_car)
}
console.log('原isLastInStock ?', isLastInStock(cars))

const getProp = _.curry((prop, obj) => fp.prop(prop, obj))

let isLastInStock1 = fp.flowRight([ getProp('in_stock'), fp.last ])
console.log('改造后isLastInStock ?', isLastInStock1(cars))

/** 练习2： 用fp.flowRight, fp.prop, fp.first获取第一个car的name */
let getFirstCarName = fp.flowRight(getProp('name'), fp.first)
console.log('the name of the first car:', getFirstCarName(cars))

/** 练习3：使用帮助函数_average重构averageDollarValue,使用函数组合的方式实现 */
let _average = function(xs) {
	return fp.reduce(fp.add, 0, xs) / xs.length
}

let averageDollarValue = function(cars) {
	let dollar_values = fp.map((car) => car.dollar_value, cars)
	return _average(dollar_values)
}
console.log('原averageDollarValue:', averageDollarValue(cars))

let getAverageDollarValue = fp.flow(fp.map((car) => car.dollar_value), _average)
console.log('改造后averageDollarValue:', getAverageDollarValue(cars))

/** 
 * 练习4： 使用flowRight写一个sanitizeName函数，返回一个下划线链接的小写字符串，把数组中的name转换成这种格式
 * 比如：sanitizeName(['Hello World']) => ['hello_world']
 */
let _underscore = fp.replace(/\W+/g, '_')
const log = (v) => {
	console.log(v)
	return v
}
const sanitizeName = fp.map((car) => (car.name = fp.flow(_.lowerCase, _underscore)(car.name)))
sanitizeName(cars)
console.log(cars)
