const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    index: ['babel-polyfill', './src/index.js'],
    // 'production-dependencies': ['phaser'],
  },
  output: {
    filename: 'bundle.js',
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendor',
  //         chunks: 'all',
  //       },
  //     },
  //   },
  // },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(png|jp(e*)g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(wav)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'sounds/',
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Cagarweyne FPS',
      template: './src/assets/index.html',
    }),
    new FaviconsWebpackPlugin({
      logo: './src/assets/images/logo.png',
      mode: 'webapp',
      devMode: 'webapp',
      favicons: {
        appName: 'Cagarweyne-FPS',
        appDescription: 'Be the best of the best in this simple FPS game',
        developerName: 'Sharmarke Ahmed',
        developerURL: null,
        background: '#3498db',
        theme_color: '#ecf0f1',
        icons: {
          coast: false,
          yandex: false,
        },
      },
    }),
    new webpack.DefinePlugin({
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true),
    }),
  ],
};
