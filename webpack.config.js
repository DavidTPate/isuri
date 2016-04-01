var webpack = require('webpack');
module.exports = {
    entry: './index.js',
    target: 'web',
    output: {
        path: __dirname + '/dist',
        filename: 'rfc-3986.min.js',
        library: [
            'window'
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.ProvidePlugin({
            'isUri': './index'
        })
    ]
};