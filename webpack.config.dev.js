let path = require('path');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, '/dist'),
    filename: 'index.js',
    publicPath: '/dist'
  },
  devServer: {
    port: 9000,
  },
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components|build)/,
        use: ['babel-loader'],
      }
    ]
  }
};
