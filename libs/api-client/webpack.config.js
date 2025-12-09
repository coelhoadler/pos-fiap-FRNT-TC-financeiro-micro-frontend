const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "financeiro",
    projectName: "api-client",
    webpackConfigEnv,
    argv,
    outputSystemJS: false,
  });

  return merge(defaultConfig, {
    externals: ["react", "react-dom"],

    devtool: "source-map",

    output: {
      devtoolModuleFilenameTemplate: (info) =>
        path.resolve(info.absoluteResourcePath).replace(/\\/g, "/"),
    },

    watchOptions: {
      poll: true,
      ignored: /node_modules/,
    },
  });
};
