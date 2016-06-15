/*var es6ify = require('es6ify');
 var brfs = require('brfs');*/
var istanbul = require('browserify-istanbul');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai', 'sinon', 'browserify'],
        files: [
            'app/**/*.js',
            // Angular-mocks moet na app.js geladen worden omdat daar angular in zit
            'node_modules/angular-mocks/angular-mocks.js',
            'tests/*.spec.js',
            'app/**/*.html'
        ],

        reporters: ['progress', 'coverage'],

        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'app/**/*.js': ['coverage', 'browserify'],
            'app/**/*.html' : ['ng-html2js']
        },

        ngHtml2JsPreprocessor: {
            // setting this option will create only a single module that contains templates
            // from all the files, so you can load them all with module('foo')
            stripPrefix: "app/"
        },

        browserify: {
            debug: true,
            transform: [/*es6ify, brfs, 'browserify-shim',*/ istanbul({
                ignore: ['**/node_modules/**', '**/test/**'],
            })],
        },

        // optionally, configure the reporter
        coverageReporter: {
            type : 'html',
            dir : 'coverage/'
        },

        port: 9876,
        colors: true,
        autoWatch: true,
        singleRun: false,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        browsers: ['Chrome']

    });
};