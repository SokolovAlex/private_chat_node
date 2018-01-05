const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const env = process.env.NODE_ENV;

const entries = {
    app: path.join(__dirname, 'client/src/entry'),
    vendor: path.join(__dirname, 'client/src/vendor')
};

const output = {
    path: path.resolve(__dirname, './public'),
    filename: '[name].js'
};

// Add more files to copy to the dist folder (Eventually an assets folder)
const toCopy = [
    { from: './client/views', to: 'views' },
    { from: './client/static/images', to: 'images' },
    { from: './client/static/styles', to: 'styles' }
];

const plugins = [
    new webpack.PrefetchPlugin('react'),
    new CopyWebpackPlugin(toCopy),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: "'" + env + "'"
        }
    })
];

let devtool = '';

if (env === 'dev') {
    devtool = 'inline';
}

module.exports = {
    entry: entries,
    output: output,
    devtool: devtool,
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.css']
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /(.css$|.less$)/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader?url=false" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            }
        ]
    },
    plugins: plugins
};