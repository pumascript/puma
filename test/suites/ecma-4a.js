/*global define, test, ok, equal */

/*
 *              PUMASCRIPT BASE TEST SUITE
 *  @file: Base expressions test suite for the language
 */
define(['pumascript', 'esprima'], function (puma, esprima) {
    //EMAC 13 Function Definition

    test("function definiton 1", function () {
        var result = puma.evalPuma("function testA (a) {return a}; var test = testA('a1'); test");
        result.makeValue();
        equal(result.value, 'a1', "Passed!");
    });
    test("function definiton 2", function () {
        var result = puma.evalPuma("function testA (a, b, c) {return {letterA: a, letterB:b, letterC : c}}; var test = testA('z', 'x', 'y'); test");
        result.makeValue();
        equal(result.value, {
            letterA: "z",
            letterB: "x",
            letterC: "y"
        }, "Passed!"); //TODO
    });

    test("Strict Mode Restrictions 1", function () {
        var errorMessage;
        try {
            var result = puma.evalPuma("\"use strict\"; var o = { p: 1, p: 2 };");
        } catch (err) {
            errorMessage = err.message;
        }
        equal(errorMessage, "Line 1: Duplicate data property in object literal not allowed in strict mode", "Passed!");
    });

    test("Strict Mode Restrictions 2", function () { //??
        var errorMessage;
        try {
            var result = puma.evalPuma("\"use strict\";(function (eval){})");
        } catch (err) {
            errorMessage = err.message;
        }
        equal(errorMessage, "Line 1: Parameter name eval or arguments is not allowed in strict mode", "Passed!");
    });

    test("Strict Mode Restrictions 3", function () {
        var errorMessage;
        try {
            var result = puma.evalPuma("(function eval(){'use strict';})");
        } catch (err) {
            errorMessage = err.message;
        }
        equal(errorMessage, "Line 1: Function name may not be eval or arguments in strict mode", "Passed!");
    });

    //13.2 Creating Function Objects
    test("Creating Function Objects", function () {
        var result = puma.evalPuma("var F = function Add(x,y){return x+y}; F(2,3)");
        result.makeValue();
        equal(result.value, '5', "Passed!");
    });

    test("Creating Function Objects 2", function () {
        var result = puma.evalPuma("function add (x, y) {return x+y;}var sum = add(2,3);sum;");
        result.makeValue();
        equal(result.value, '5', "Passed!");
    });

    test("Creates a function and uses prototype method", function () {
        var result = puma.evalPuma("function operations (x,y) {this.x = x; this.y = y;} operations.prototype.mul = function () {return this.x*this.y;};var op = new operations(2,3);op.mul();");
        //result.makeValue();
        equal(result.value, 6, "Passed!");
    });

    test("Creates a function and gets its internal value with a getter function", function () {
        var result = puma.evalPuma("function operations (x,y) {this.x = x; this.y = y;} Object.defineProperties(operations.prototype, { varX: {get: function () { return this.x; },set: function (value) {this.x = value;}},varY: {get: function () {return this.y;},set: function (value) {this.y = value;}}});operations.prototype.add = function () {return this.x+this.y;};operations.prototype.sub = function () {return this.x-this.y;};operations.prototype.div = function () {if(this.y !== 0) {return this.x/this.y;}};operations.prototype.mul = function () {return this.x*this.y;};var op = new operations(2,3);op.varX;");
        result.makeValue();
        equal(result.value, '2', "Passed!");
    });

    test("Creates a function and calls its internal method", function () {
        var result = puma.evalPuma("function Square (side) {this.side = side;this.area = function () {return this.side * this.side;}}var s1 = new Square(2);s1.area();");
        result.makeValue();
        equal(result.value, '4', "Passed!");
    });

    test("Function Object creation", function () {
        var result = puma.evalPuma("var test = new Object();");
        result.makeValue();
        equal(result.value, 'undefined', "Passed!");
    });

    //ECMA 14

});