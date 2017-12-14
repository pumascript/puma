// Copyright (c) 2013 - present UTN-LIS

/* eslint quotes: 0, no-unused-vars: 0 */

/**
 *      PUMASCRIPT ECMA-13 TEST SUITE
 * @file: Function Definition Test Suite
 */
define(['pumascript'], function (puma) {

    QUnit.module("13 Function Definition");

    test("function definiton 1", function (assert) {
        var result = puma.evalPuma("function testA (a) {return a}; var test = testA('a1'); test");
        result.makeValue();
        assert.equal(result.value, 'a1');
    });

    test("function definiton 2", function (assert) {
        var result = puma.evalPuma("function testA (a, b, c) {return {letterA: a, letterB:b, letterC : c}}; var test = testA('z', 'x', 'y'); test.letterA;");
        result.makeValue();
        assert.equal(result.value, "z");
    });

    QUnit.module("13.1 Strict Mode Restrictions");

    // This is now accepted on ECMA6 - See BABEL issue on transpiling https://github.com/babel/babel/issues/2462
    test("Strict Mode Restriction Duplicate Keys", function (assert) {
        var result = puma.evalPuma("\"use strict\"; var o = { p: 1, p: 2 };");
        assert.equal(result.success,true);
        assert.equal(result.value, "use strict");
    });

    test("Strict Mode Restriction 2", function (assert) {
        var errorMessage;
        try {
            var result = puma.evalPuma("\"use strict\";(function (eval){})");
        } catch (err) {
            errorMessage = err.message;
        }
        assert.equal(errorMessage, "Line 1: Parameter name eval or arguments is not allowed in strict mode");
    });

    test("Strict Mode Restriction 3", function (assert) {
        var errorMessage;
        try {
            var result = puma.evalPuma("(function eval(){'use strict';})");
        } catch (err) {
            errorMessage = err.message;
        }
        assert.equal(errorMessage, "Line 1: Function name may not be eval or arguments in strict mode");
    });

    QUnit.module("13.2 Creating Function Objects");

    test("Creating Function Objects", function (assert) {
        var result = puma.evalPuma("var F = function Add(x,y){return x+y}; F(2,3)");
        result.makeValue();
        assert.equal(result.value, '5');
    });

    test("Creating Function Objects 2", function (assert) {
        var result = puma.evalPuma("function add (x, y) {return x+y;}var sum = add(2,3);sum;");
        result.makeValue();
        assert.equal(result.value, '5');
    });

    QUnit.skip("Creates a function and uses prototype method", function (assert) {
        var result = puma.evalPuma("function operations (x,y) {this.x = x; this.y = y;} operations.prototype.mul = function () {return this.x*this.y;};var op = new operations(2,3); op.mul();");
        result.makeValue();
        assert.equal(result.value, 6);
    });

    QUnit.skip("Creates a function and gets its internal value with a getter function", function (assert) {
        var result = puma.evalPuma("function operations(x) {this._x = x;}Object.defineProperty(operations.prototype, 'x', {get: function () {return this._x;}});var op = new operations(2);op.x;");
        result.makeValue();
        assert.equal(result.value, 2);
    });

    QUnit.skip("Creates a function and calls its internal method", function (assert) {
        var result = puma.evalPuma("function Square (side) {this.side = side;this.area = function () {return this.side * this.side;}}var s1 = new Square(2);s1.area();");
        assert.equal(result.value, '4');
    });

    test("Function Object creation", function (assert) {
        var result = puma.evalPuma("var test = {};test;");
        result.makeValue();
        assert.equal(typeof result.value, "object");
    });

});
