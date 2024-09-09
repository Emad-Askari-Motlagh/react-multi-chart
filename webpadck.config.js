// webpack.config.js
const path = require("path");

module.exports = {
  // other configuration...
  entry: "./src/ReactWeekChart/index.ts",
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "ReactWeekChart.js",
    library: "ReactWeekChart",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // other loaders...
    ],
  },
};
