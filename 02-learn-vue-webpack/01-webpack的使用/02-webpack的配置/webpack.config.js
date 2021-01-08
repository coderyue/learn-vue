// 项目中依赖于node 一般都需要一个package.json
const path = require('path')
module.exports = {
  // 入口
  entry: './src/main.js',
  // 出口
  output: {
    // 这里path要求绝对路径， 所以这里进行一个动态获取， 使用node的一个语法
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};