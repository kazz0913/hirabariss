const path = require('path');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

const MODE = 'development';

const enabledSourceMap = (MODE === 'development');

module.exports = {
  mode: MODE,
  entry: './dev/index.js',
  output: {
    filename: './assets/js/main.js',
    path: path.resolve(__dirname)
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          miniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              minimize: false,
              sourceMap: enabledSourceMap,
              importLoading: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: enabledSourceMap,
              plugins: [
                require('autoprefixer')({ grid: true })
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: enabledSourceMap
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets:  [
                '@babel/preset-env'
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new miniCssExtractPlugin({
      filename: './style.css'
    })
  ]

}