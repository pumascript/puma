// Copyright (c) 2013 - present UTN-LIS

/* eslint quotes: 0, no-unused-vars: 0 */

/**
 *      PUMASCRIPT ECMA-13 TEST SUITE
 * @file: Function Definition Test Suite
 */
define(['pumascript', 'esprima'], function (puma, esprima) {


    module("13 Function Definition");

    test("function definiton 1", function () {
        var result = puma.evalPuma("function testA (a) {return a}; var test = testA('a1'); test");
        result.makeValue();
        equal(result.value, 'a1');
    });
    test("function definiton 2", function () {
        var result = puma.evalPuma("function testA (a, b, c) {return {letterA: a, letterB:b, letterC : c}}; var test = testA('z', 'x', 'y'); test.letterA;");
        result.makeValue();
        equal(result.value, "z");
    });

    module("13.1 Strict Mode Restrictions");

    test("Strict Mode Restriction 1", function () {
        var errorMessage;
        try {
            var result = puma.evalPuma("\"use strict\"; var o = { p: 1, p: 2 };");
        } catch (err) {
            errorMessage = err.message;
        }
        equal(errorMessage, "Line 1: Duplicate data property in object literal not allowed in strict mode");
    });

    test("Strict Mode Restriction 2", function () {
        var errorMessage;
        try {
            var result = puma.evalPuma("\"use strict\";(function (eval){})");
        } catch (err) {
            errorMessage = err.message;
        }
        equal(errorMessage, "Line 1: Parameter name eval or arguments is not allowed in strict mode");
    });

    test("Strict Mode Restriction 3", function () {
        var errorMessage;
        try {
            var result = puma.evalPuma("(function eval(){'use strict';})");
        } catch (err) {
            errorMessage = err.message;
        }
        equal(errorMessage, "Line 1: Function name may not be eval or arguments in strict mode");
    });

    module("13.2 Creating Function Objects");

    test("Creating Function Objects", function () {
        var result = puma.evalPuma("var F = function Add(x,y){return x+y}; F(2,3)");
        result.makeValue();
        equal(result.value, '5');
    });

    test("Creating Function Objects 2", function () {
        var result = puma.evalPuma("function add (x, y) {return x+y;}var sum = add(2,3);sum;");
        result.makeValue();
        equal(result.value, '5');
    });

    //result.value == NaN
    QUnit.skip("Creates a function and uses prototype method", function () {
        var result = puma.evalPuma("function operations (x,y) {this.x = x; this.y = y;} operations.prototype.mul = function () {return this.x*this.y;};var op = new operations(2,3); op.mul();");
        result.makeValue();
        equal(result.value, 6);
    });

    //Uncaught TypeError: Getter must be a function
    QUnit.skip("Creates a function and gets its internal value with a getter function", function () {
        var result = puma.evalPuma("function operations(x) {this._x = x;}Object.defineProperty(operations.prototype, 'x', {get: function () {return this._x;}});var op = new operations(2);op.x;");
        result.makeValue();
        equal(result.value, 2);
    });

    //result.value == NaN
    QUnit.skip("Creates a function and calls its internal method", function () {
        var result = puma.evalPuma("function Square (side) {this.side = side;this.area = function () {return this.side * this.side;}}var s1 = new Square(2);s1.area();");
        equal(result.value, '4');
    });

    test("Function Object creation", function () {
        var result = puma.evalPuma("var test = {};test;");
        result.makeValue();
        equal(typeof result.value, "object");
    });
});