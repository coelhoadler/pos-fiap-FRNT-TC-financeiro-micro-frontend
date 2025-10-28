const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'shared-api.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      type: 'system', // output como módulo que SystemJS consegue importar nativamente
    },
    publicPath: '/',
  },
  resolve: { extensions: ['.ts', '.js'] },
  module: {
    rules: [{ test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ }],
  },
  devServer: {
    static: { directory: path.join(__dirname, 'dist') },
    port: 8510,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  experiments: { outputModule: true },
};
