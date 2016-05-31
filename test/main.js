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
        './suites/integration-tests.js'
    ];

require(suites, function () {
    // Required to make it work under phantomjs environment
    QUnit.start();
});
