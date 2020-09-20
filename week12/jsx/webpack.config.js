module.exports = {
  entry: './carousel.js',

  mode: 'development',

  devtool: 'sourcemap',

  devServer: {
    contentBase: './dist',
    publicPath: '/'
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
