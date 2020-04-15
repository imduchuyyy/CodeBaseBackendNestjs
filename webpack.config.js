const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');
const Webpackbar = require('webpackbar')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = {
  entry: ['webpack/hot/poll?100', './src/main.ts'],
  watch: true,
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?100'],
    }),
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'development',
  resolve: {
    alias: {
      '@auth': path.resolve(__dirname, './src/auth'),
      '@common': path.resolve(__dirname, './src/common'),
      '@config': path.resolve(__dirname, './src/config'),
      '@environments': path.resolve(__dirname, './src/environments'),
      '@models': path.resolve(__dirname, './src/models'),
      '@resolvers': path.resolve(__dirname, './src/resolvers'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
    // new StartServerPlugin({ name: 'server.js' }),
    // new BundleAnalyzerPlugin({
    // 	analyzerMode: 'static',
    // 	analyzerHost: '127.0.0.1',
    // 	analyzerPort: '8888',
    // 	// reportFilename: process.env.NODE_ENV === 'development' && 'report.html',
    // 	openAnalyzer: false,
    // 	generateStatsFile: false,
    // 	statsFilename: 'stats.json'
    // }),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    }),
    new Webpackbar()
  ],
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false
  },
  output: {
    pathinfo: false
    // path: path.join(__dirname, 'dist'),
    // filename: 'server.js',
  },
};