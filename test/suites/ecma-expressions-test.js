// Copyright (c) 2013 - present UTN-LIS

/* eslint quotes: 0 */

/**
 * PUMASCRIPT ECMA-11 TEST SUITE
 * @file: Expressions Test Suite
 */
define(['pumascript'], function(puma) {

    QUnit.module("11.1 Primary Expressions");

    test("The this Keyword", function (assert) {
        var result = puma.evalPuma("this.document;");
        result.makeValue();
        assert.deepEqual(result.value, this.document);
    });

    test("Array Initializer", function (assert) {
        var result = puma.evalPuma("var a = [1, 2, ]; a;");
        assert.equal(result.value.value[1], 2);
        assert.equal(result.value.value[2], null);
        assert.equal(result.value.value.length, 2);
    });

    test("Object Initializer", function (assert) {
        var result = puma.evalPuma("var x = {property : 'value', other_property : 'value'};");
        assert.ok(result.success);
    });

    test("The Grouping Operator", function (assert) {
        var result = puma.evalPuma("(2 + 2) * 5;");
        assert.equal(result.value, 20);
    });

    test("Array Initializer", function (assert) {
        var result = puma.evalPuma("var a = [1, 2, ]");
        assert.equal(result.value.value[1], 2, "Passed!");
        assert.equal(result.value.value[2], null, "Passed!");
        assert.equal(result.value.value.length, 2, "Passed!");
    });

    QUnit.module("11.2 Left-Hand-Side Expressions");

    test("Property Accessors", function (assert) {
        var result = puma.evalPuma("var object = {}; object['property'] = 'value'; object['property'];");
        result.makeValue();
        assert.equal(result.value, 'value');
    });

    test("The new Operator", function (assert) {
        var result = puma.evalPuma("function Car(make, model, year) { this.make = make; this.model = model; this.year = year; } var mycar = new Car('Eagle', 'Talon TSi', 1993);");
        assert.ok(result.success);
    });

    test("Function Calls", function (assert) {
        var result = puma.evalPuma("var square = function(number) { return number * number }; square(4)");
        result.makeValue();
        assert.equal(result.value, 16);
    });

    /**
    * TODO: Complete the following
    *    11.2.4 Argument Lists
    *    11.2.5 Function Expressions
    */

    QUnit.module("11.3 Postfix Expressions.");

    test("Postfix Increment Operator", function (assert) {
        var result = puma.evalPuma("var x = 0; x++;");
        result.makeValue();
        assert.equal(result.success, true);
        assert.equal(result.value, 0);
    });

    test("Postfix Increment Operator 2", function (assert) {
        var result = puma.evalPuma("var i = 0; var a = []; a[i++] = (function(n,a){ a[n++] = n++; return n; })(i++,a); a[2] = i; a;");
        result.makeValue();
        assert.equal(result.success, true);
        assert.equal(result.value.length, 3);
        assert.equal(result.value[0], 3);
        assert.equal(result.value[1], 2);
        assert.equal(result.value[2], 2);
    });

    test("Postfix Decrement Operator", function (assert) {
        var result = puma.evalPuma("var x = 0; x--;");
        result.makeValue();
        assert.equal(result.success, true);
        assert.equal(result.value, 0);
    });

    test("Postfix Decrement Operator 2", function (assert) {
        var result = puma.evalPuma("var i = 1; var a = []; a[i--] = (function(n,a){ a[n--] = n--; return n; })(i--,a); a[2] = i; a;");
        result.makeValue();
        assert.equal(result.success, true);
        assert.equal(result.value.length, 3);
        assert.equal(result.value[0], -1);
        assert.equal(result.value[1], -2);
        assert.equal(result.value[2], -1);
    });

    QUnit.module("11.4 Unary Operators");

    test("Delete Operator", function (assert) {
        var result = puma.evalPuma("var s1 = Object({Name:'LEO', Terminal:25000, Destination:'Panchaea'}); delete s1.Destination; Object.getOwnPropertyNames(s1);");
        result.makeValue();
        assert.equal(result.value.toString(), "Name,Terminal");
    });

    test("Void Operator", function (assert) {
        var result = puma.evalPuma("void 0");
        assert.equal(result.value, undefined);
    });

    test("TypeOf Operator", function (assert) {
        var result = puma.evalPuma("typeof true;");
        assert.equal(result.value, "boolean");
    });

    test("Prefix Increment Operator", function (assert) {
        var result = puma.evalPuma("var x=0; ++x;");
        result.makeValue();
        assert.equal(result.value, 1);
    });

    test("Prefix Decrement Operator", function (assert) {
        var result = puma.evalPuma("var x=1; --x;");
        result.makeValue();
        assert.equal(result.value, 0);
    });

    test("Unary + Operator", function (assert) {
        var result = puma.evalPuma("var x=-10; +x;");
        result.makeValue();
        assert.equal(result.value, -10);
    });

    test("Unary - Operator", function (assert) {
        var result = puma.evalPuma("var x=-10; -x;");
        result.makeValue();
        assert.equal(result.value, 10);
    });

    test("Bitwise NOT Operator ( ~ )", function (assert) {
        var result = puma.evalPuma("var x= 10; ~x;");
        result.makeValue();
        assert.equal(result.value, -11);
    });

    test("Logical NOT Operator ( ! )", function (assert) {
        var result = puma.evalPuma("!false;");
        assert.equal(result.value, true);
    });

    QUnit.module("11.5 Multiplicative Operators and 11.6 Additive Operators");

    test("Multiplicative and Additive Operators", function (assert) {
        var result = puma.evalPuma("2 * 3 / 4 + 5 - 6 % 2;");
        result.makeValue();
        assert.equal(result.value, 6.5);
    });

    QUnit.module("11.7 Bitwise Shift Operators");

    test("The Left Shift Operator ( << )", function (assert) {
        var result = puma.evalPuma("8 << 2;");
        assert.equal(result.value, 32);
    });

    test("The Signed Right Shift Operator ( >> )", function (assert) {
        var result = puma.evalPuma("9 >> 2;");
        assert.equal(result.value, 2);
    });

    test("The Unsigned Right Shift Operator ( >>> )", function (assert) {
        var result = puma.evalPuma("19>>>2");
        assert.equal(result.value, 4);
    });

    QUnit.module("11.8 Relational Operators");

    test("< Operator", function (assert) {
        var result = puma.evalPuma("0 < 1;");
        assert.ok(result.value);
    });

    test("> Operator", function (assert) {
        var result = puma.evalPuma("0 > 1;");
        assert.ok(!result.value);
    });

    test("<= Operator", function (assert) {
        var result = puma.evalPuma(" 1 <= 1 && 0 <= 1;");
        assert.ok(result.value);
    });

    test(">= Operator", function (assert) {
        var result = puma.evalPuma("1 >= 1 && 1 >= 0;");
        assert.ok(result.value);
    });

    test("instanceof Operator", function (assert) {
        var result = puma.evalPuma("var x={}; x instanceof Object;");
        result.makeValue();
        assert.equal(result.value, true);
    });

    test("in Operator", function (assert) {
        var result = puma.evalPuma("1 in [0,1];");
        assert.ok(result.value);
    });

    QUnit.module("11.9 Equality Operators");

    test("== Operator", function (assert) {
        var result = puma.evalPuma("1 == '1';");
        assert.ok(result.value);
    });

    test("!= Operator", function (assert) {
        var result = puma.evalPuma("1 != '1'; ");
        assert.ok(!result.value);
    });

    test("=== Operator", function (assert) {
        var result = puma.evalPuma("3 === '3';");
        assert.ok(!result.value);
    });

    test("!== Operator", function (assert) {
        var result = puma.evalPuma("3 !== '3';");
        assert.ok(result.value);
    });

    QUnit.module("11.10 Binary Bitwise Operators");

    test("& Operator", function (assert) {
        var result = puma.evalPuma("14 & 9;");
        assert.equal(result.value, 8);
    });

    test("| Operator", function (assert) {
        var result = puma.evalPuma("14 | 9");
        assert.equal(result.value, 15);
    });

    test("^ Operator", function (assert) {
        var result = puma.evalPuma("14 ^ 9");
        assert.equal(result.value, 7);
    });

    QUnit.module("11.11 Binary Logical Operators");

    test("&& Operator", function (assert) {
        var result = puma.evalPuma("true  && false;");
        assert.ok(!result.value);
    });

    test("|| Operator", function (assert) {
        var result = puma.evalPuma("true || false;");
        assert.ok(result.value);
    });

    QUnit.module("11.12 Conditional Operators");

    test("Conditional Operator ( ? : )", function (assert) {
        var result = puma.evalPuma("false ? 'manzana' : 'naranja'");
        assert.strictEqual(result.value, 'naranja');
    });

    QUnit.module("11.13 Assignment Operators");

    test("Simple Assigment", function (assert) {
        var result = puma.evalPuma("var x = 5; var y = 10; x = y; x;");
        result.makeValue();
        assert.equal(result.value, 10);
    });

    test("*= Operator", function (assert) {
        var result = puma.evalPuma("var x = 5; var y = 10; x *= y; x;");
        result.makeValue();
        assert.equal(result.value, 50);
    });

    test("/= Operator", function (assert) {
        var result = puma.evalPuma("var x = 10; var y = 5; x /= y; x;");
        result.makeValue();
        assert.equal(result.value, 2);
    });

    test("%= Operator", function (assert) {
        var result = puma.evalPuma("var x = 10; var y = 5; x %= y; x;");
        result.makeValue();
        assert.equal(result.value, 0);
    });

    test("+= Operator", function (assert) {
        var result = puma.evalPuma("var x = 5; var y = 10; x += y; x;");
        result.makeValue();
        assert.equal(result.value, 15);
    });

    test("-= Operator", function (assert) {
        var result = puma.evalPuma("var x = 10; var y = 5; x -= y; x;");
        result.makeValue();
        assert.equal(result.value, 5);
    });

    test("<<= Operator", function (assert) {
        var result = puma.evalPuma("var x = 8; var y = 2; x <<= y; x;");
        result.makeValue();
        assert.equal(result.value, 32);
    });

    test(">>= Operator", function (assert) {
        var result = puma.evalPuma("var x = 9; var y = 2; x >>= y; x;");
        result.makeValue();
        assert.equal(result.value, 2);
    });

    test(">>>= Operator", function (assert) {
        var result = puma.evalPuma("var x = 19; var y = 2; x >>>= y; x;");
        result.makeValue();
        assert.equal(result.value, 4);
    });

    test("&= Operator", function (assert) {
        var result = puma.evalPuma("var x = 14; var y = 9; x &= y; x;");
        result.makeValue();
        assert.equal(result.value, 8);
    });

    test("^= Operator", function (assert) {
        var result = puma.evalPuma("var x = 14; var y = 9; x ^= y; x;");
        result.makeValue();
        assert.equal(result.value, 7);
    });

    test("|= Operator", function (assert) {
        var result = puma.evalPuma("var x = 14; var y = 9; x |= y; x;");
        result.makeValue();
        assert.equal(result.value, 15);
    });

    QUnit.module("11.14 Comma Operators");

    QUnit.skip("Comma Operators", function (assert) {
        var result = puma.evalPuma("function myFunc () {var x = 0; return (x += 1,x*=2, x);}; myFunc();");
        result.makeValue();
        assert.equal(result.value, 2);
    });
});
