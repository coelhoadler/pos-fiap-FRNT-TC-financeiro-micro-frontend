const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');
const path = require('path');
const webpack = require('webpack'); // 🔹 Import necessário para usar o DefinePlugin

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'financeiro',
    projectName: 'transfers',
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    externals: ["@financeiro/ui"],

    // ✅ Garante que os source maps são externos, e não embutidos
    devtool: 'source-map',

    // ✅ Resolve os caminhos corretamente para debug
    output: {
      devtoolModuleFilenameTemplate: (info) =>
        path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
    },

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

    // ✅ Injeta variáveis de ambiente no bundle do navegador
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify({
          // 🔹 Você pode alterar essa URL conforme o ambiente
          REACT_APP_ENDPOINT: process.env.REACT_APP_ENDPOINT,
        }),
      }),
    ],
  });
};
