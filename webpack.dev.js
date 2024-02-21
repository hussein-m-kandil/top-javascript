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
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "css-blank-pseudo",
                  "css-has-pseudo",
                  "postcss-focus-visible",
                  "postcss-focus-within",
                  "css-prefers-color-scheme",
                  [
                    "postcss-preset-env",
                    {
                      enableClientSidePolyfills: true,
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    ],
  },
});
