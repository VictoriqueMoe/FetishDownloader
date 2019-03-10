module.exports = env => {
    const CircularDependencyPlugin = require('circular-dependency-plugin');
    const path = require("path");
    const {CheckerPlugin} = require('awesome-typescript-loader');
    const webpack = require("webpack");
    const fs = require('fs');
    return {
        entry: "./src/Main.ts",
        externals: ["file-saver", "JSZip"],
        devtool: env === "development" ? 'hidden-source-map' : "none",
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: 'awesome-typescript-loader'
                        }
                    ],
                    exclude: [
                        /node_modules/
                    ]
                }
            ]
        },
        mode: env,
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            modules: ["./node_modules", "./src"]
        },
        plugins: [
            new CircularDependencyPlugin({
                failOnError: true,
                cwd: process.cwd(),
            }),
            new CheckerPlugin(),
            new webpack.BannerPlugin({
                banner : fs.readFileSync('./GM.txt', 'utf8'),
                raw: true
            })
        ],
        output: {
            path: path.join(__dirname, "dist"),
            filename: "fetishDownloader.user.js",
            libraryTarget: "umd",
            library: "Fetish",
        }
    }
};
