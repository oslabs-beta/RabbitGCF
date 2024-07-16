const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env', '@babel/preset-react'
              ],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: ['file-loader']
      },
    ],
  },
  devServer: {
    // required for docker to work with dev server
    host: '0.0.0.0',
    // host: localhost
    port: 8080,
    // enable HMR on dev server
    hot: true,
    // fallback to root for other urls
    historyApiFallback: true,
    static: {
      // match output path
      directory: path.resolve(__dirname, 'dist'),
      // match output 'publicPath'
      publicPath: '/'
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
    // proxy is required in order to make api calls to express server while using hot-reload webpack server
    // routes api fetch requests from localhost:8080/api/* (webpack dev server) to localhost:3000/api/* (where our express server is running)
    proxy: [
      {
        '/api/**': {
          target: 'http://localhost:3000',
          secure: false
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: '/src/client/index.html',
    })
  ]
};