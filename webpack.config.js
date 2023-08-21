import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import { DefinePlugin } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

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
        entry: {
            main: "./src/index.tsx",
            reducer: "./src/store/reducer.ts",
        },
        output: {
            path: path.resolve(__dirname, "build"),
            filename: "[name]/[name].js",
            chunkFilename: "[name].js",
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
