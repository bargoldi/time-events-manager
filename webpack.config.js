const
    webpack = require('webpack'),
    fs = require('fs-extra'),
    copy = require('copy'),
    path = require('path'),
    dts = require('dts-bundle');

function percentage_handler(percentage, msg) {
    if (0 === percentage) {
        console.log('Build started... Good luck!');
    } else if (1 === percentage) {
        dts.bundle({
            name: 'time-events-manager',
            main: './src/main.d.ts',
            out: './dist/main.d.ts'
        });
    }
}

module.exports = {
    entry: './src/main.ts',

    output: {
        filename: './dist/main.js',
        libraryTarget: 'umd'
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
        new webpack.ProgressPlugin(percentage_handler)
    ]
};