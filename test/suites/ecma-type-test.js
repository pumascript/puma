// Copyright (c) 2013 - present UTN-LIS

/* eslint quotes: 0 */

/**
 * PUMASCRIPT ECMA-8 TEST SUITE
 * @file: Types Test Suite
 */

define(['pumascript', 'esprima'], function (puma, esprima) {

    QUnit.module("8.1 The Undefined Type");

    test("undefined 1", function(assert){
        var result = puma.evalPuma("var b = typeof(a); b;");
        result.makeValue();
        assert.ok(result.success && "undefined" === result.value, "Passed!");
    });

    test("undefined 2", function(assert){
        var result = puma.evalPuma("var a; typeof a");
        result.makeValue();
        assert.ok(result.success && "undefined" === result.value, "Passed!");
    });

    QUnit.module("8.2 The Null Type");

    test("null", function(assert){
        var result = puma.evalPuma("var a = null; typeof a");
        result.makeValue();
        assert.ok(result.success && "object" === result.value, "Passed!");
    });

    QUnit.module("8.3 The Boolean Type");

    test("boolean, true", function(assert){
        var result = puma.evalPuma("var a = true; typeof a");
        result.makeValue();
        assert.ok(result.success && "boolean" === result.value, "Passed!");
    });

    test("boolean, false", function(assert){
        var result = puma.evalPuma("var a = false; typeof a");
        result.makeValue();
        assert.ok(result.success && "boolean" === result.value, "Passed!");
    });

    test("boolean, false not equals true", function(assert){
        var result = puma.evalPuma("var a = true; var b = false; if (a === b) true; else false;");
        result.makeValue();
        assert.ok(result.success && false === result.value, "Passed!");
    });

    test("boolean, not false equals true", function(assert){
        var result = puma.evalPuma("if (!false === true) true; else false;");
        result.makeValue();
        assert.ok(result.success && true === result.value, "Passed!");
    });

    test("boolean, not true equals false", function(assert){
        var result = puma.evalPuma("if (!true === false) true; else false;");
        result.makeValue();
        assert.ok(result.success && true === result.value, "Passed!");
    });

    QUnit.module("8.6.1 Property attributes");

    test("writable ", function(assert){
        var result = puma.evalPuma("var obj = {}; obj.key = 1; Object.defineProperty(obj, 'key', { writable: false ,}); obj.key = 2; var a = obj.key");
        result.makeValue();
        assert.ok(result.success && 1 === result.value, "Passed!");
    });

    test("configurable", function(assert){
        try {
            puma.evalPuma("var obj = {}; Object.defineProperty(obj, 'key', { value: 1, configurable: false, writable: false}); Object.defineProperty(obj, 'key', { writable: true });");
        }
        catch (e) {
            if (e instanceof TypeError) {
                assert.equal(true, true);
            }
        }
    });
});
