/*jslint indent: 4 */
/*global module */
module.exports = function (grunt, opts) {
    'use strict';
    return {
        all: {
            expand: true,
            cwd: 'src/',
            dest: './dist/',
            src: ['**/*.js']
        }
    };
};