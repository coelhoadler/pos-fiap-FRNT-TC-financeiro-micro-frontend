const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "financeiro",
    projectName: "login",
    webpackConfigEnv,
    argv,
    outputSystemJS: false,
  });

  return merge(defaultConfig, {
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            "postcss-loader",
          ],
        },
      ]
    },
    watchOptions: {
      poll: true, // Enable polling to detect file changes
      ignored: /node_modules/, // Ignore node_modules for performance
    }
  });

};
