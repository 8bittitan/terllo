const webpack = require('webpack')
const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const config = {
  entry: {
    app: path.join(__dirname, 'src/index.js'),
    react: ['react', 'react-dom'],
    router: ['react-router-dom'],
    redux: ['redux', 'react-redux', 'redux-logger', 'redux-thunk', 'react-router-redux'],
    apollo: ['react-apollo'],
  },
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['react', 'redux', 'router', 'apollo'],
      minChunks: 'infinity',
    }),
  ],
  devtool: 'eval',
}

if (process.env.NODE_ENV !== 'production') {
  config.plugins.push(new BundleAnalyzerPlugin())
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
  }))
}

module.exports = config
