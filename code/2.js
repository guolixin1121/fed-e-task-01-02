const fp = require('lodash/fp')
const _ = require('lodash')
const { Maybe, Container } = require('./support')

/** 练习1：使用fp.add和fp.map创建一个能让Functor里的值增加的函数 */
let maybe = Maybe.of([ 5, 6, 1 ])
let ex1 = (n) => maybe.map(fp.map((v) => fp.add(v, n)))
console.log('增加2', ex1(2))

/**
 * 练习2： 用fp.first获取列表的第一个元素
 */
let xs = Container.of([ 'do', 'ray', 'me', 'fa', 'so', 'la', 'si' ])
let ex2 = xs.map(fp.first)
console.log('第一个元素', ex2)

/**
 * 练习3；使用safeProp和fp.first找到user的名字的首字母
 */
let safeProp = fp.curry((x, o) => Maybe.of(o[x]))
let user = { id: 2, name: 'Albert' }
let ex3 = (obj) => safeProp('name')(obj).map(fp.first)
console.log('获取首字母', ex3(user))

/**
 * 练习4：使用Maybe重写ext4， 不要有if
 */
// let ex4 = function(n) {
// 	if (n) return parseInt(n)
// }

let ex4 = (n) => Maybe.of(n).map(parseInt)
console.log('转换int:', ex4('100'))
console.log('转换int:', ex4(null))
