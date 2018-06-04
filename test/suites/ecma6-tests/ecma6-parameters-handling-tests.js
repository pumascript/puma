// Copyright (c) 2013 - present UTN-LIS

/* eslint quotes: 0, no-unused-vars: 0 */

/**
    *          PUMASCRIPT ECMA 6 PARAMETERS HANDLING SUITE
    * @file: Ecma6 Parameters handling expressions test suite for the language
*/
var test = QUnit.test;
var skip = QUnit.skip;

define(['pumascript'], function (puma) {

    QUnit.module("Ecma6-Parameters-Handling-Tests");

    skip("Rest parameter", function(assert) {
        var result = puma.evalPuma("function f (x, y, ...a){return (x + y) * a.length} f(1, 2, 'hello', true, 7) === 9;");
        assert.ok(result.success && result.value === true);
    });

    skip("Spread operator", function(assert) {
        var result = puma.evalPuma("let params = [ 'hello', true, 7 ]; let other = [ 1, 2, ...params ]; other.length;");
        result.makeValue();
        assert.ok(result.success && result.value === 5);
    });

    skip("Spread operator, alternative case", function(assert) {
        var result = puma.evalPuma("let str = 'foo'; let chars = [ ...str ]; chars.length;");
        result.makeValue();
        assert.ok(result.success && result.value === 3);
    });

});