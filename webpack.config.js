const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = [{
    devtool: "#inline-source-map",
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
                        loader: "css-loader", // translates CSS into CommonJS
                        options: { sourceMap: true }
                    },
                    {
                        loader: "sass-loader", // compiles Sass to CSS
                        options: { sourceMap: true }
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
        new UglifyJSPlugin({
            // parallel: {
            //     cache: true,
            //     workers: 1
            // },
            // output: {
            //     comments: false,
            //     beautify: false
            // }
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