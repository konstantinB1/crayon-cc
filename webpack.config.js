/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ReactRefreshTypeScript = require("react-refresh-typescript");


const isProduction = process.env.NODE_ENV == "production";
const isDevelopment = process.env.NODE_ENV !== "production";

const config = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
    },
    devServer: {
        hot: true,
        historyApiFallback: true,
        open: true,
        host: "localhost",
        port: 8000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html",
        }),
        new Dotenv(),
        isDevelopment && new ReactRefreshWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: require.resolve("ts-loader"),
                        options: {
                            getCustomTransformers: () => ({
                                before: [
                                    isDevelopment && ReactRefreshTypeScript(),
                                ].filter(Boolean),
                            }),
                            transpileOnly: isDevelopment,
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "fonts/",
                        },
                    },
                ],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: "asset",
            },
            { test: /\.json$/, type: "json" },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = "production";
    } else {
        config.mode = "development";
    }
    return config;
};
