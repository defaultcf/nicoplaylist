const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const banner = require("./userscript");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: false,
        output: {
          beautify: true,
        },
      },
    }),
    new webpack.BannerPlugin({
      raw: true,
      entryOnly: true,
      banner,
    }),
  ],
};
