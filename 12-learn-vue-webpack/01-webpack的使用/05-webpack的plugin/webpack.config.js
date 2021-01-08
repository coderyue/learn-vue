// 项目中依赖于node 一般都需要一个package.json
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  // 入口
  entry: './src/main.js',
  // 出口
  output: {
    // 这里path要求绝对路径， 所以这里进行一个动态获取， 使用node的一个语法
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
    // publicPath: 'dist/'
  },
  module: {
    rules: [
      {
        // css-loader只负责将css文件进行加载
        // style-loader负责将样式添加到DOM中
        // 使用多个loader时，是从右向左
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader" // compiles Less to CSS
        }]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 当加载的图片， 小于limit时，会将图片编译成base64字符串形式
              // 当加载的图片， 大于limit时，需要使用file-loader模块进行加载
              // 一般大小配置为8kb   8196， 处理后图片名称时计算出来的一个hash值， 防止文件重复
              limit: 13000,
              // 可以自定义图片明明方式， 可以在这里写路径
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        //  include 包含,  exclude： 排除
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            // presets: ['@babel/preset-env']
            presets: ['es2015']
          }
        }
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ]
  },
  resolve: {
    // 引入vue组件不用写后面的vue，其他文件类似
    extensions: ['.js', '.css', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new webpack.BannerPlugin('最终版权归coderyue所有！！！'),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new UglifyWebpackPlugin()
  ],
  devServer: {
    contentBase: './dist',
    inline: true
  }
};