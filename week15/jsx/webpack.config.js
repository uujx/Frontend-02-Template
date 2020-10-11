const path = require('path')

module.exports = {
  entry: './main.js',

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },

  mode: 'development',

  devtool: 'sourcemap',

  devServer: {
    contentBase: './dist',
    publicPath: '/',
    port: 3000,
    open: true
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [
                '@babel/plugin-transform-react-jsx',
                {
                  pragma: 'createElement'
                }
              ]
            ]
          }
        }
      }
    ]
  }
}
