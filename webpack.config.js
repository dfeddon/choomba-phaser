var path = require("path");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var BrowserSyncPlugin = require("browser-sync-webpack-plugin");
var HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

module.exports = [{
    devtool: "inline-source-map",
    entry: "./src/App.ts",
    // context: path.resolve(__dirname, './src/'),
    output: {
        filename: "bundle.client.js",
        path: path.resolve(__dirname, "dist/public")
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js", ".ejs", ".json"], // note if using webpack 1 you'd also need a '' in the array as well
        modules: ["node_modules"]
    },
    watch: true,
    // node: { /* This hack resolves fs issue in fantasy-names modules */
    //     fs: "empty"
    // },
    module: {
        rules: [
            // loaders will work with webpack 1 or 2; but will be renamed "rules" in future
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: "ts-loader" },
            // { test: /\.json$/, loader: 'json-loader' },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["es2015"]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [{
                        loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    },
                    {
                        loader: "sass-loader" // compiles Sass to CSS
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Choomba.io",
            template: "src/public/index.ejs"
        }),
        // new HtmlWebpackIncludeAssetsPlugin({
        //     assets: ['css/index.css'],
        //     append: false
        // }),
        // new CopyWebpackPlugin([
        //     { from: "src/public/**/*", to: "/dist/public" }
        // ]),
        new BrowserSyncPlugin({
            host: "localhost",
            port: 3001,
            server: { baseDir: ["dist/public"] }
        })
    ]
}];