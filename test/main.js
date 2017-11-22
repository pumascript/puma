// Copyright (c) 2013 - present UTN-LIS

/**
 *              PUMASCRIPT MAIN ENTRY FILE FOR TEST
 * @file: file that includes the dependencies and executions fof RequireJS.
 */

require.config({
    paths: {
        'pumascript': '../src/pumascript',
        'esprima': '../thirdparty/esprima/esprima',
        'escodegen': '../thirdparty/escodegen/escodegen.browser'
    }
});

/**
 * @enum containing the list of test suites to execute
 */
var suites = [
    './suites/base-tests.js',
    './suites/runtime-tests.js',
    './suites/integration-tests.js',
    './suites/ecma-lexical-conventions-test.js',
    './suites/ecma-type-test.js',
    './suites/ecma-type-conversion-and-testing.js',
    './suites/ecma-executable-code-and-execution-contexts-test.js',
    './suites/ecma-expressions-test.js',
    './suites/ecma-statements-test.js',
    './suites/ecma-function-definition-test.js',
    './suites/ecma-standard-built-in-ecmascript-objects-test.js'
];

require(suites, function () {
    QUnit.start();
});
