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

    // ✅ Garante que os source maps são externos, e não embutidos
    devtool: 'source-map',

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['postcss-loader'],
        },
      ],
    },

    watchOptions: {
      poll: true,
      ignored: /node_modules/,
    },

  });
};
