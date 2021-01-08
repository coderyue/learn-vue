// 使用commonJs的模块化规范
const {add, mul} = require('./mathUtils')

console.log(add(20, 30));
console.log(mul(20, 30));

// 使用es6的模块化规范
import {name, age, height} from "./info";

console.log(name);
console.log(age);
console.log(height);

// 都需要webpack处理一下    webpack src/main.js dist/bundle.js

