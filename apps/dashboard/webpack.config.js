const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "financeiro",
    projectName: "dashboard",
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
  });
};
