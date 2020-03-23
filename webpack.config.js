module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './client/index.tsx',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist/client',
  },
  resolve: {
    extensions: ['.tsx', 'ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.client.json',
            },
          },
        ],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
  devServer: {
    contentBase: __dirname + '/dist/client',
    compress: true,
    port: 9000,
    historyApiFallback: true,
  },
};
