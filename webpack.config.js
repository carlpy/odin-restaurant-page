const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/template.html",
      inject: "head",
      scriptLoading: "defer"
    }),
  ],

  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    open: true,
    compress: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
