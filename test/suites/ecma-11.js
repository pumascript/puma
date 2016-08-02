/**
 * Created by Leo on 10/7/2016.
 */

/*global define, test, ok, equal */

/*
 *              PUMASCRIPT ECMA-11 TEST SUITE
 *  @file: Base expressions test suite for the language
 */
define(['pumascript', 'esprima'], function(puma, esprima) {

/*
 *                      Expressions
 */

    /*

     test("",function () {
     var result = puma.evalPuma("");
     ok(result.success,"Passed!");
     equal(result.value(),,"Passed!");
     });

    */
    module("11.1 Primary Expressions");

    test("The this Keyword",function () {
        var result = puma.evalPuma("this.document;");
        equal(result.value,this.document,"Passed!");
    });

    test("Array Initializer",function () {
        var result = puma.evalPuma("var a = [1, 2, ]");
        equal(result.value.value[1], 2, "Passed!");
        equal(result.value.value[2], null, "Passed!");
        equal(result.value.value.length, 2, "Passed!");
    });

    test("Object Initializer",function () {
        var result = puma.evalPuma("var x = {property : 'value', other_property : 'value'};");
        ok(result.success,"Passed!");
    });

    test("The Grouping Operator",function () {
        var result = puma.evalPuma("(2 + 2) * 5;");
        equal(result.value,20,"Passed!");
    });

    module("11.2 Left-Hand-Side Expressions");
    module("11.3 Postfix Expressions.");
    module("11.4 Unary Operators");
    module("11.5 Multiplicative Operators and 11.6 Additive Operators");
    module("11.7 Bitwise Shift Operators");
    module("11.8 Relational Operators");
    module("11.9 Equality Operators");
    module("11.10 Binary Bitwise Operators");
    module("11.11 Binary Logical Operators");
    module("11.12 Conditional Operators");
    module("11.13 Assignment Operators");
    module("11.14 Comma Operators");
});