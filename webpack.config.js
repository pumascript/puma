// Copyright (c) 2013 - present UTN-LIS

var webpack = require('webpack');

var LIBRARY_NAME = 'pumascript',
    OUTPUT_DIR = './dist/',
    OUTPUT_FILENAME = OUTPUT_DIR + LIBRARY_NAME + '.js',
    OUTPUT_SOURCEMAP = OUTPUT_DIR + LIBRARY_NAME + '.map';

module.exports = {
    entry: './src/runtime.js',
    devtool: 'source-map',
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.js'],
        alias: {
            'esprima': './thirdparty/esprima/esprima',
            'escodegen': './thirdparty/escodegen/escodegen.browser'
        }
    },
    output: {
        filename: OUTPUT_FILENAME,
        library: LIBRARY_NAME,
        libraryTarget: 'umd',
        sourceMapFilename: OUTPUT_SOURCEMAP
    },
    externals: {
        esprima: 'esprima',
        escodegen: 'escodegen'
    }
};
