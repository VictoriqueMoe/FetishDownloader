module.exports = env => {
    const CircularDependencyPlugin = require('circular-dependency-plugin');
    const path = require("path");
    const {CheckerPlugin} = require('awesome-typescript-loader');
    const webpack = require("webpack");
    const fs = require('fs');
    const METADATA = fs.readFileSync('./GM.txt', 'utf8');

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
                failOnError: false,
                cwd: process.cwd(),
            }),
            new CheckerPlugin(),
            new webpack.BannerPlugin({
                banner: METADATA,
                raw: true,
                entryOnly: true
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
