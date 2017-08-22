var path = require("path");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = {
    devtool: "inline-source-map",
    entry: "./src/App.ts",
    output: {
        filename: "bundle.client.js",
        path: path.resolve(__dirname, "dist/public")
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"] // note if using webpack 1 you'd also need a '' in the array as well
    },
    module: {
        rules: [
            // loaders will work with webpack 1 or 2; but will be renamed "rules" in future
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: "ts-loader" },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["es2015"]
                    }
                }
            }
        ]
    },
    plugins: [
        // new CopyWebpackPlugin([
        //     { from: "src/public/**/*", to: "/dist/public" }
        // ]),
        new BrowserSyncPlugin({
            // browse to http://localhost:3000/ during development,
            // ./public directory is being served
            host: "localhost",
            port: 3000,
            server: { baseDir: ["dist/public"] }
        })
    ]
};