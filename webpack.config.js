const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const distFolder = "./babel-dist/";

const files = [];
fs.readdirSync(distFolder).forEach((file) => {
  files.push(file);
});

const entry = files.reduce(
  (entryObject, currentFile) => ({
    ...entryObject,
    [currentFile]: path.resolve(__dirname, `./babel-dist/${currentFile}`),
  }),
  {}
);

const plugins = files.reduce((pluginsList, currentFile) => {
  const newPluginsList = [...pluginsList];
  newPluginsList.push(
    new HtmlWebpackPlugin({
      title: "Regenerator test",
      template: path.resolve(__dirname, "./template.html"),
      meta: {
        viewport: "width=device-width",
      },
      chunks: [currentFile],
      filename: `${currentFile}.html`,
    })
  );
  return newPluginsList;
}, []);

module.exports = {
  entry,
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./webpack-dist"),
  },
  plugins,
};
