module.exports = {
    mode: "development",
    entry: "./app.js",
    output: {
        filename: "bundle.js",
        path: __dirname,
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },
};
