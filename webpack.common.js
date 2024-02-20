const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ODIN_LIBRARY_NAME = "odin-library";
const ODIN_TIC_TAC_TOE_NAME = "odin-tic-tac-toe";

module.exports = {
  entry: {
    [ODIN_LIBRARY_NAME]: "./odin-library/index.js",
    [ODIN_TIC_TAC_TOE_NAME]: "./odin-tic-tac-toe/assets/js/main.js",
  },
  output: {
    filename: "[contenthash].[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: ODIN_LIBRARY_NAME + ".html",
      chunks: [ODIN_LIBRARY_NAME],
      title: "Odin Library",
      template: "./template.html",
    }),
    new HtmlWebpackPlugin({
      filename: ODIN_TIC_TAC_TOE_NAME + ".html",
      chunks: [ODIN_TIC_TAC_TOE_NAME],
      title: "Odin Tic Tac Toe",
      template: "./template.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  /* 
    No need for runtime chunk optimization,
    because i don't use multiple entries (chunks) for single html output,
    but instead with 'html-webpack-plugin', 
    i am creating multiple html outputs (single output (html) per entry (chunk)). 
  */
  // optimization: {
  //   runtimeChunk: "single",
  // },
};
