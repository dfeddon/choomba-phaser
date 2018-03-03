const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
var BitBarWebpackProgressPlugin = require("bitbar-webpack-progress-plugin");

module.exports = [{
    devtool: "#cheap-module-eval-source-map",
    entry: {
        client: "./src/App.ts",
        // server: "./src/Server.ts"
    },
    // context: path.resolve(__dirname, './src/'),
    output: {
        filename: "bundle.[name].js",
        path: path.resolve(__dirname, "dist/public")
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js", ".ejs", ".html", ".json"], // note if using webpack 1 you'd also need a '' in the array as well
        modules: ["node_modules"]
    },
    node: {
        fs: "empty",
        tls: "empty"
    },
    watch: true,
    watchOptions: {
        poll: true
    },
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
        new HtmlWebpackPlugin({
            filename: "section-pulse.html",
            template: "src/public/html/section-pulse.html"
        }),
        new HtmlWebpackPlugin({
            filename: "section-crew.html",
            template: "src/public/html/section-crew.html"
        }),
        new HtmlWebpackPlugin({
            filename: "section-territory.html",
            template: "src/public/html/section-territory.html"
        }),
        new HtmlWebpackPlugin({
            filename: "section-biz.html",
            template: "src/public/html/section-biz.html"
        }),
        new HtmlWebpackPlugin({
            filename: "section-directives.html",
            template: "src/public/html/section-directives.html"
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
        // new BrowserSyncPlugin({
        //     host: "localhost",
        //     port: 3001,
        //     server: { baseDir: ["dist/public"] }
        // })
        new BitBarWebpackProgressPlugin()
    ]
}];