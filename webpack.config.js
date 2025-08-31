const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],
  // devServer: {
  //   static: path.join(__dirname, 'dist'),
  //   compress: true,
  //   port: 9000,
  //   open: true,
  // },
  devServer: {
    host: '0.0.0.0', // Penting agar bisa diakses dari luar container
    port: 3000,
    open: true
  },
  mode: 'development',
};