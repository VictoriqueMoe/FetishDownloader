module.exports = env => {
    const CircularDependencyPlugin = require('circular-dependency-plugin');
    const path = require("path");
    const {CheckerPlugin} = require('awesome-typescript-loader');
    return {
        entry: "./src/Main.ts",
        externals: ["file-saver", "JSZip"],
        devtool: env === "development" ? 'source-map' : "none",
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
        ],
        output: {
            path: path.join(__dirname, "dist"),
            filename: "bundle.js",
            libraryTarget: "umd",
            library: "Fetish",
        }
    }
};
