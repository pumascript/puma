// Copyright (c) 2013 - present UTN-LIS

/* eslint quotes: 0 */

/**
 *      PUMASCRIPT ECMA-9 TEST SUITE
 *  @file: Type Conversion and Testing Test Suite
 */
define(['pumascript', 'esprima'], function (puma, esprima) {

    module("9.2 ToBoolean");

    test("toBoolean(undefined) conversion test", function () {
        var result = puma.evalPuma("Boolean(undefined)");
        ok(result.success && false === result.value, "Pass!");
    });

    test("toBoolean(null) conversion test", function () {
        var result = puma.evalPuma("Boolean(null)");
        ok(result.success && false === result.value, "Pass!");
    });

    test("toBoolean(true) conversion test", function () {
        var result = puma.evalPuma("Boolean(true)");
        ok(result.success && true === result.value, "Pass!");
    });

    test("toBoolean(false) conversion test", function () {
        var result = puma.evalPuma("Boolean(false)");
        ok(result.success && false === result.value, "Pass!");
    });

    test("toBoolean(number) conversion test", function () {
        var result = puma.evalPuma("Boolean(2)");
        ok(result.success && true === result.value, "Pass!");
    });

    test("toBoolean(string) conversion test", function () {
        var result = puma.evalPuma("Boolean('hola')");
        ok(result.success && true === result.value, "Pass!");
    });

    test("toBoolean(object) conversion test", function () {
        var result = puma.evalPuma("Boolean(Object())");
        ok(result.success && true === result.value, "Pass!");
    });

    module("9.3 ToNumber");

    test("toNumber(undefined) conversion test", function () {
        var result = puma.evalPuma("Number(undefined)");
        ok(result.success && typeof NaN === typeof result.value, "Pass!");
    });

    test("toNumber(null) conversion test", function () {
        var result = puma.evalPuma("Number(null)");
        ok(result.success && 0 === result.value, "Pass!");
    });

    test("toNumber(true) conversion test", function () {
        var result = puma.evalPuma("Number(true)");
        ok(result.success && 1 === result.value, "Pass!");
    });

    test("toNumber(false) conversion test", function () {
        var result = puma.evalPuma("Number(false)");
        ok(result.success && 0 === result.value, "Pass!");
    });

    test("toNumber(1) conversion test", function () {
        var result = puma.evalPuma("Number(1)");
        ok(result.success && 1 === result.value, "Pass!");
    });

    test("toNumber(string) conversion test", function () {
        var result = puma.evalPuma("Number('hi')");
        ok(result.success && typeof NaN === typeof result.value, "Pass!");
    });

    test("toNumber(Object()) conversion test", function () {
        var result = puma.evalPuma("Number(Object())");
        ok(result.success && typeof NaN === typeof result.value, "Pass!");
    });

    module("9.4 ToInteger");

    test("parseInt(0) conversion test", function () {
        var result = puma.evalPuma("parseInt(0)");
        ok(result.success && 0 === result.value, "Pass!");
    });

    test("parseInt(NaN) conversion test", function () {
        var result = puma.evalPuma("parseInt(NaN)");
        ok(result.success && typeof NaN === typeof result.value, "Pass!");
    });

    module("9.8 ToString");

    QUnit.skip("toString(undefined) conversion test", function () {
        var result = puma.evalPuma("toString(undefined)");
        ok(result.success && typeof 'object' === result.value, "Pass!");
    });

    QUnit.skip("toString(null) conversion test", function () {
        var result = puma.evalPuma("toString(null)");
        ok(result.success && '[object Undefined]' === result.value, "Pass!");
    });

});