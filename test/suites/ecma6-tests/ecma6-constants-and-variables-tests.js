// Copyright (c) 2013 - present UTN-LIS

/* eslint quotes: 0, no-unused-vars: 0 */

/**
*          PUMASCRIPT ECMA 6 CONSTANTS AND VARIABLES SUITE
* @file: Ecma6 Constants and variables expressions test suite for the language
*/
var test = QUnit.test;
var skip = QUnit.skip;

define(['pumascript'], function (puma) {

    QUnit.module("Ecma6-Constants-And-Variables-Tests");

    skip("Constant", function(assert) {
        var result = puma.evalPuma("const PI = 3.141593; PI;");
        result.makeValue();
        assert.ok(result.success && result.value === 3.141593);
    });

    skip("Constant principal scope", function(assert) {
        var result = puma.evalPuma("const PI = 3.141593; if(true){const PI = 3.14;} PI;");
        result.makeValue();
        assert.ok(result.success && result.value === 3.141593);
    });

    skip("Constant block scope", function(assert) {
        var result = puma.evalPuma("const PI = 3.141593; if(true){const PI = 3.14; PI}");
        result.makeValue();
        assert.ok(result.success && result.value === 3.14);
    });

    skip("Constant principal scope not defined with block scope constant", function(assert) {
        var result = puma.evalPuma("if(true){const PI = 3.141593;} typeof(PI);");
        result.makeValue();
        assert.ok(result.success && result.value === 'undefined');
    });

    skip("Change of a property from a constant as an object", function(assert) {
        var result = puma.evalPuma("const p = {first: 'john', last: 'smith'}; p.first = 'bob'; p.first;");
        result.makeValue();
        assert.ok(result.success && result.value === 'bob');
    });

    skip("Variable let", function(assert) {
        var result = puma.evalPuma("let a = 2; a;");
        assert.ok(result.success && result.value === 2);
    });

    skip("Variable let principal scope", function(assert) {
        var result = puma.evalPuma("let a = 2; if(true){let a = 3;} a;");
        result.makeValue();
        assert.ok(result.success && result.value === 2);
    });

    skip("Variable let block scope", function(assert) {
        var result = puma.evalPuma("let a = 2; if(true){let a = 3; a;}");
        result.makeValue();
        assert.ok(result.success && result.value === 3);
    });

    skip("Variable let principal scope not defined with block scope constant", function(assert) {
        var result = puma.evalPuma("if(true){let a = 3;} typeof(a);");
        result.makeValue();
        assert.ok(result.success && result.value === 'undefined');
    });

});