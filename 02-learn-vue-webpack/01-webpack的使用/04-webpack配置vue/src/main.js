// 使用commonJs的模块化规范
const {add, mul} = require('./js/mathUtils')

console.log(add(20, 30));
console.log(mul(20, 30));

// 使用es6的模块化规范
import {name, age, height} from "./js/info";

console.log(name);
console.log(age);
console.log(height);

// 都需要webpack处理一下    webpack src/main.js dist/bundle.js

// 3. 依赖css文件
require('./css/normal.css')

// 4. 依赖less文件
require('./css/special.less')

document.writeln('<h2>hello world</h2>')

// 5. 使用vue开发
import Vue from 'vue'
// import App from './vue/app'
import App from './vue/App.vue'

const app = new Vue({
  el: '#app',
  template: '<App/>',
  components: {
    App
  }
})