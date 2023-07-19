const path = require("path");
const HtmlBundlerPlugin = require("html-bundler-webpack-plugin");

module.exports = {
  mode: "development",
  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        // define templates here
        index: "./index.html",
      },
      js: {
        // output filename of JS extracted from source script specified in `<script>`
        filename: "js/[name].[contenthash:8].js",
      },
      css: {
        // output filename of CSS extracted from source file specified in `<link>`
        filename: "css/[name].[contenthash:8].css",
      },
      minify: "auto", // minify html in production mode only
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["css-loader"],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
  },
  devServer: {
    static: path.resolve(__dirname, "./dist"),
    compress: true,
    port: 9000,
    // enable live reload after changes in source files
    watchFiles: {
      paths: ['./**/*.*'],
      options: {
        usePolling: true,
      },
    },
  },
};
