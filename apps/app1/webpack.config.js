const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require('webpack').container;
const path = require("path");
const deps = require('./package.json').dependencies;

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
        },
      },
      // Add other loaders here (e.g., CSS, SCSS, file-loader for images, etc.)
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app1',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          eager: true, 
          requiredVersion: deps.react 
        },
        'react-dom': {
          singleton: true,
          eager: true, 
          requiredVersion: deps['react-dom'] 
        },
        'react-router-dom': {
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      chunks: ['main'],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3001, 
    open: true, 
    hot: false,
    liveReload: true,
    headers: {
      'Access-Control-Allow-Origin': '*', // Allows access from any origin
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
};
