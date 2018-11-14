const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const HtmlWebPackPlugin = require('html-webpack-plugin');
const dev = process.env.NODE_ENV === 'development'

// HMR source path
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (dev = false, relativePath) => {
  const src_path = path.resolve(appDirectory, relativePath)
  return dev ? ['webpack-dev-server/client?http://localhost:8080', 'webpack/hot/dev-server', src_path] : src_path
}

module.exports = {

  mode: process.env.NODE_ENV,

  devtool: dev ? 'inline-source-map' : false,
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    publicPath: '/',
    port: 8080,
    hot: true,
    open:true
  },

  entry: { 
    app:resolveApp(dev, './src/js/main.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'public/'),
    publicPath: '/'
  },
  
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" }
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          { 
            loader: 'css-loader', 
            options: {
              url: false,
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }
      }
    ]
  },
  // optimization: {
  //   splitChunks: {
  //     name: 'vendor',
  //     chunks: 'initial',
  //   }
  // },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      // chunks: ['vendor', 'app'],
      template: "./src/template.html"
    }),
  ]
}