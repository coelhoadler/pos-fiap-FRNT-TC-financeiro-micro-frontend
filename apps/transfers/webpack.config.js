const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const path = require("path");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "financeiro",
    projectName: "transfers",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // ✅ Garante que os source maps são externos, e não embutidos
    devtool: "source-map",

    // ✅ Resolve os caminhos corretamente para debug
    output: {
      devtoolModuleFilenameTemplate: info =>
        path.resolve(info.absoluteResourcePath).replace(/\\/g, "/"),
    },

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["postcss-loader"],
        },
      ],
    },

    watchOptions: {
      poll: true,
      ignored: /node_modules/,
    },
  });
};
