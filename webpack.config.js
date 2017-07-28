var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var publicPath = 'http://localhost:4000/';
var env = process.env.MIX_ENV || 'dev';
var prod = env === 'prod';

var entry = [
  './web/static/css/index.scss',
  './web/static/js/index.js',
];

// var hot = 'webpack-hot-middleware/client?path=' +
//  publicPath + '__webpack_hmr';

var plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new ExtractTextPlugin('css/app.css'),
  new CopyWebpackPlugin([{ from: './web/static/assets' }]),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.DefinePlugin({
    __PROD: prod,
    __DEV: env === 'dev',
  }),
];

// if (env === 'dev') {
//   plugins.push(new webpack.HotModuleReplacementPlugin());
// }

module.exports = {
  entry: entry, // prod ? entry : [hot, ...entry],
  devtool: prod ? null : 'cheap-module-eval-source-map',
  output: {
    path: __dirname + '/priv/static',
    filename: 'js/bundle.js',
    publicPath: publicPath,
  },
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['stage-2', 'es2015'],
        },
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: [{
            loader: 'style-loader',
          }],
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            }, {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('autoprefixer'),
                ],
              },
            },
            'sass-loader',
          ],
        }),
      },
    ],
  },
  resolve: {
    modules: ['deps', 'node_modules', __dirname + '/web/static/js'],
    extensions: ['*', '.js', '.jsx'],
  },
};
