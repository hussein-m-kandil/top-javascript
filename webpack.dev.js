const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    static: ".",
    port: 3000,
    liveReload: false,
    hot: true,
    client: {
      progress: true,
      reconnect: 3,
    },
    open: {
      target: "/",
      app: {
        name: "google-chrome",
        arguments: ["--incognito"],
      },
    },
  },
});
