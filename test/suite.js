/*global require, QUnit */

require.config({
    paths: {
        'pumascript': '../src/pumascript',
        'esprima': '../thirdparty/esprima/esprima'
    }
});

var tests = [
        './test.js'
    ];

require(tests, function () {
    // required to make it work under phantomjs environment
    QUnit.start();
});
