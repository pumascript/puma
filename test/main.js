/*global require, QUnit */

/*
 *      PUMASCRIPT MAIN ENTRY FILE FOR TEST
 *  @file: file that includes the dependencies and executions fof RequireJS.
 */

require.config({
    paths: {
        'pumascript': '../src/pumascript',
        'esprima': '../thirdparty/esprima/esprima'
    }
});


/**
 * @enum containing the list of test suites to execute
 */
var suites = [
        './suites/base-tests.js',
        './suites/runtime-tests.js',
        './suites/integration-tests.js',
        './suites/Tests-7-ECMA.js',
        './suites/Tests-8-ECMA.js',
        './suites/test-9-ecma.js',
        './suites/test-10-ecma.js',
        './suites/test-12-ecma.js',
        './suites/test-13-ecma.js',
        './suites/Tests-15-ECMA.js'
];

require(suites, function () {
    // Required to make it work under phantomjs environment
    QUnit.start();
});
