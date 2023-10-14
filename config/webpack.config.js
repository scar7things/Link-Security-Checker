'use strict';

const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const PATHS = require('./paths');

// Merge webpack configuration files
const config = merge(common, {
  entry: {
    popup: PATHS.src + '/popup.js',
    contentScript: PATHS.src + '/contentScript.js',
    background: PATHS.src + '/background.js',
  },
});

module.exports = {
   mode: 'development', // Or 'production'
  entry: './index.js',  // Update this to your actual entry file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

