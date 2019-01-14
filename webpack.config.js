module.exports = env => {
    const CircularDependencyPlugin = require('circular-dependency-plugin');
    const path = require("path");
/*    function createEntryPoint(){
        console.log("creating entry point...");
        const glob = require("glob");
        let typeScriptConfigFile = require("./tsconfig");
        let baseUrl = typeScriptConfigFile.compilerOptions.baseUrl;
        if(!baseUrl){
            throw new Error("Unable to find baseUrl in tsconfig");
        }
        let list = glob.sync(baseUrl+"/!**!/!*.ts");
        const fs = require('fs');
        let num = 0;
        fs.writeFileSync(baseUrl+'/main.ts', (function () {
            let strToReturn = "";
            for (let file of list) {
                num++;
                let content = fs.readFileSync(file, "utf8");
                if(content.length === 0){
                    continue;
                }
                let fromBaseUrl = file.replace(baseUrl+"/", "");
                fromBaseUrl = fromBaseUrl.replace(".ts", "");
                if(fromBaseUrl === "main"){
                    continue;
                }
                strToReturn += `export * from '${fromBaseUrl}'; \n`;
            }
            return strToReturn;
        }()));

        console.log("Entry point created: " +num + " modules exported");
    }
    createEntryPoint();*/
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
