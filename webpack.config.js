const path = require("path");
require("dotenv").config();
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  context: __dirname,
  mode: isDevelopment ? "development" : "production",
  resolve: {
    extensions: [".ts", ".tsx", "..."],
  },
  devtool: isDevelopment ? "eval-source-map" : false,
  entry: {
    main: "./src/main",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
    publicPath: "/",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              [
                "@babel/preset-react",
                { runtime: "automatic", importSource: "@emotion/react" },
              ],
              "@babel/preset-typescript",
            ],
            plugins: [
              "@emotion/babel-plugin",
              isDevelopment && "react-refresh/babel",
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./template/index.html",
      favicon: "./template/favicon.ico",
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
    new webpack.DefinePlugin({
      "process.env.API_BASE_URL": isDevelopment
        ? JSON.stringify("/api")
        : JSON.stringify(process.env.API_BASE_URL),
      "process.env.APP_NAME": JSON.stringify("log simple"),
    }),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    !isDevelopment && new MiniCssExtractPlugin(),
  ].filter(Boolean),
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
    ],
  },
  devServer: {
    static: "./dist",
    port: 3000,
    historyApiFallback: true,
    open: true,
    hot: true,
    proxy: {
      "/api": {
        target: process.env.API_BASE_URL,
        pathRewrite: { "^/api": "" },
      },
    },
  },
};
