const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { DefinePlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
    const mode = argv.mode || process.env.NODE_ENV || "development";
    return {
        mode,
        module: {
            rules: [
                {
                    test: /\.(js|jsx|ts|tsx)$/,
                    exclude: /node_modules/,
                    use: ["babel-loader"],
                },
                {
                    test: /\.css$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: require.resolve("css-loader"),
                            options: {
                                url: false, // Required as image imports should be handled via JS/TS import statements
                            },
                        },
                    ],
                },
                {
                    test: /\.svg$/i,
                    type: "asset",
                    resourceQuery: /url/, // *.svg?url
                },
                {
                    test: /\.(gif|jpg|png)$/,
                    type: "asset/resource",
                },
            ],
        },
        entry: "./src/reducer.ts",
        output: {
            path: path.resolve(__dirname, "build"),
            filename: "index.js",
            library: {
                name: "redux-dispute-poc",
                type: "module",
            },
        },
        resolve: {
            extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html",
            }),

            new DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify(mode),
            }),
            new MiniCssExtractPlugin(),
        ],
        devServer: {
            static: {
                directory: path.join(__dirname, "dist"),
            },
            hot: true,
        },
    };
};
