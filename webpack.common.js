const path = require("path")
const marked = require("marked")
const renderer = new marked.Renderer()

module.exports = {
  entry: {
    main: "./src/index.js",
    // vendor: "./src/vendor.js"
  },
  module: {
    rules: [
      {
        test: /.md$/,
        use: [
          "html-loader",
          {
            loader: "markdown-loader",
            options: {
              pedantic: true,
              renderer
            }
          }
        ]
      },
      {
        test: /\.(svg|png|jpg|gif|bmp)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "assets"
          }
        }
      }
    ]
  },
}