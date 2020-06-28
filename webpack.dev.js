const path = require("path")
const common = require("./webpack.common")
const merge = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    host: '0.0.0.0'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/templates/index.html"
    })
  ]
})