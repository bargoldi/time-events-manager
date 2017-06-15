const
    webpack = require('webpack'),
    fs = require('fs-extra'),
    copy = require('copy'),
    path = require('path'),
    dts = require('dts-bundle');
    UnminifiedWebpackPlugin = require('unminified-webpack-plugin');


function percentage_handler(percentage) {
    if (percentage === 0) {
        console.log('Build started... Good luck!');
    } else if (percentage === 1) {
        dts.bundle({
            name: 'time-events-manager',
            main: './src/main.d.ts',
            out: '../dist/main.d.ts'
        });
    }
}

module.exports = {
    entry: './src/main.ts',

    output: {
        filename: './dist/main.min.js',
        libraryTarget: 'umd',
        sourceMapFilename: './dist/main.min.js.map'
    },

    // Currently we need to add '.ts' to the resolve.extensions array.
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', 'd.ts']
    },

    // Source maps support ('inline-source-map' also works)
    devtool: 'source-map',

    // Add the loader for .ts files.
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap:true
        }),
        new UnminifiedWebpackPlugin({
            postfix: ''
        }),
        new webpack.ProgressPlugin(percentage_handler)
    ]
};

// module.exports = {
//     entry: './src/app.ts',
//     output: {
//         filename: 'dist/bundle.js'
//     },
//     resolve: {
//         extensions: ['.ts', '.js', '.tsx', '.jsx', '']
//     },
//     module: {
//         loaders: [
//             {
//                 test: /\.tsx?$/,
//                 exclude: /node_modules/,
//                 loader: 'ts-loader'
//             }
//         ]
//     }
// };