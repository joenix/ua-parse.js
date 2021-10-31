const Path = require("path");

const Package = require("./package.json");

function resolve(path) {
  return Path.resolve(__dirname, path);
}

module.exports = {
  mode: `production`,
  entry: resolve(`src`),
  output: {
    path: resolve(`dist`),
    filename: `${Package.name}.js`,
    libraryTarget: `commonjs2`
  },
  optimization: {
    minimize: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules|bower_components/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    esmodules: false
                  }
                }
              ]
            ]
          }
        }
      }
    ]
  }
};
