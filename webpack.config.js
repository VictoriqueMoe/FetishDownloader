module.exports = env => {
    const CircularDependencyPlugin = require('circular-dependency-plugin');
    const path = require("path");
    const webpack = require("webpack");
    const fs = require('fs');
    const METADATA = fs.readFileSync('./GM.txt', 'utf8');
    const development = env["development"] === true;
    const mode = development ? "development" : "production";
    const retObj = {
        entry: "./src/Main.ts",
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
            ]
        },
        mode,
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            modules: ["./node_modules", "./src"]
        },
        plugins: [
            new CircularDependencyPlugin({
                failOnError: false,
                cwd: process.cwd(),
            }),
            new webpack.BannerPlugin({
                banner: METADATA,
                raw: true,
                entryOnly: true
            })
        ],
        output: {
            path: path.join(__dirname, "dist"),
            filename: `fetishDownloader.user${development === false ? ".min" : ""}.js`,
            libraryTarget: "umd",
            library: "Fetish",
            globalObject: 'this'
        }
    }
    if (development) {
        retObj["devtool"] = "eval-source-map";
    }
    return retObj;
};
