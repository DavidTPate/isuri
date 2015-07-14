/*jslint indent: 4 */
/*global module */
module.exports = function (grunt, opts) {
    'use strict';
    return {
        options: {
            mangle: false,
            sourceMap: true,
            drop_console: true,
            sourceMapName: 'dist/isuri.min.map'
        },
        all: {
            files: {
                'dist/isuri.min.js': 'src/isuri.js'
            }
        }
    };
};