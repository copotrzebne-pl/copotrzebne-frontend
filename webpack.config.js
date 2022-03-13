/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const ENTRY_FILE = './src/index.tsx';
const OUTPUT_FILE = 'index.js';
const MODE_PRODUCTION = 'production';
const MODE_DEVELOPMENT = 'development';

module.exports = (env, { mode } = { mode: MODE_PRODUCTION }) => ({
  entry: ENTRY_FILE,
  output: {
    filename: OUTPUT_FILE,
    publicPath: '/',
    path: path.resolve(__dirname, 'build'),
  },
  optimization: {
    runtimeChunk: false,
    splitChunks: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [mode === MODE_DEVELOPMENT && require('react-refresh/babel')].filter(Boolean),
          },
        },
      },
      {
        test: /\.(jpeg|jpg|png|gif|woff2?|ttf|eot)$/,
        use: {
          loader: 'file-loader',
          options: {
            limit: 10000,
            name: '[name].[contenthash].[ext]',
            outputPath: 'static/assets',
          },
        },
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'file-loader'],
      },
    ].filter(Boolean),
  },
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
      }),
    ].filter(Boolean),
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
  },
  plugins: [
    new Dotenv(),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    mode === MODE_DEVELOPMENT && new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ].filter(Boolean),
  devServer: {
    port: 3000,
    hot: true
  },
  devtool: mode === MODE_DEVELOPMENT ? 'cheap-module-source-map' : false,
});
