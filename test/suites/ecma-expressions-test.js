// Copyright (c) 2013 - present UTN-LIS

/*
 *              PUMASCRIPT ECMA-11 TEST SUITE
 *  @file: Base expressions test suite for the language
 */
define(['pumascript', 'esprima'], function(puma, esprima) {

    module("11.1 Primary Expressions");

    test("The this Keyword",function () {
        var result = puma.evalPuma("this.document;");
        result.makeValue();
        deepEqual(result.value,this.document,"Passed!");
    });

    test("Array Initializer",function () {
        var result = puma.evalPuma("var a = [1, 2, ]; a;");
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

    test("Property Accessors",function () {
        var result = puma.evalPuma("var object = {}; object['property'] = 'value'; object['property'];");
        result.makeValue();
        equal(result.value,'value',"Passed!");
    });

    test("The new Operator",function () {
        var result = puma.evalPuma("function Car(make, model, year) { this.make = make; this.model = model; this.year = year; } var mycar = new Car('Eagle', 'Talon TSi', 1993);");
        ok(result.success,"Passed!");
    });

    test("Function Calls",function () {
        var result = puma.evalPuma("var square = function(number) { return number * number }; square(4)");
        result.makeValue();
        equal(result.value, 16,"Passed!");
    });


    /*11.2.4 Argument Lists

    11.2.5 Function Expressions
    */

    module("11.3 Postfix Expressions.");

    test("Postfix Increment Operator",function () {
        var result = puma.evalPuma("var x = 0; x++;");
        result.makeValue();
        equal(result.success, true);
        equal(result.value, 0);
    });

    test("Postfix Increment Operator 2",function () {
        var result = puma.evalPuma("var i = 0; var a = []; a[i++] = (function(n,a){ a[n++] = n++; return n; })(i++,a); a[2] = i; a;");
        result.makeValue();
        equal(result.success, true);
        equal(result.value.length, 3);
        equal(result.value[0], 3);
        equal(result.value[1], 2);
        equal(result.value[2], 2);
    });

    test("Postfix Decrement Operator",function () {
        var result = puma.evalPuma("var x = 0; x--;");
        result.makeValue();
        equal(result.success, true);
        equal(result.value, 0);
    });

    test("Postfix Decrement Operator 2",function () {
        var result = puma.evalPuma("var i = 1; var a = []; a[i--] = (function(n,a){ a[n--] = n--; return n; })(i--,a); a[2] = i; a;");
        result.makeValue();
        equal(result.success, true);
        equal(result.value.length, 3);
        equal(result.value[0], -1);
        equal(result.value[1], -2);
        equal(result.value[2], -1);
    });

    module("11.4 Unary Operators");

    test("Delete Operator",function () {
        var result = puma.evalPuma("var s1 = Object({Name:'LEO', Terminal:25000, Destination:'Panchaea'}); delete s1.Destination; Object.getOwnPropertyNames(s1);");
        result.makeValue();
        equal(result.value.toString(), "Name,Terminal", "Passed!");
    });

    test("Void Operator",function () {
        var result = puma.evalPuma("void 0");
        equal(result.value,undefined,"Passed!");
    });

    test("TypeOf Operator",function () {
        var result = puma.evalPuma("typeof true;");
        equal(result.value,"boolean","Passed!");
    });

    test("Prefix Increment Operator",function () {
        var result = puma.evalPuma("var x=0; ++x;");
        result.makeValue();
        equal(result.value,1,"Passed!");
    });

    test("Prefix Decrement Operator",function () {
        var result = puma.evalPuma("var x=1; --x;");
        result.makeValue();
        equal(result.value,0,"Passed!");
    });

    test("Unary + Operator",function () {
        var result = puma.evalPuma("var x=-10; +x;");
        result.makeValue();
        equal(result.value,-10,"Passed!");
    });

    test("Unary - Operator",function () {
        var result = puma.evalPuma("var x=-10; -x;");
        result.makeValue();
        equal(result.value,10,"Passed!");
    });

    test("Bitwise NOT Operator ( ~ )",function () {
        var result = puma.evalPuma("var x= 10; ~x;");
        result.makeValue();
        equal(result.value,-11,"Passed!");
    });

    test("Logical NOT Operator ( ! )",function () {
        var result = puma.evalPuma("!false;");
        equal(result.value,true,"Passed!");
    });

    module("11.5 Multiplicative Operators and 11.6 Additive Operators");

    test("Multiplicative and Additive Operators",function () {
         var result = puma.evalPuma("2 * 3 / 4 + 5 - 6 % 2;");
         result.makeValue();
         equal(result.value,6.5,"Passed!");
    });

    module("11.7 Bitwise Shift Operators");

    test("The Left Shift Operator ( << )",function () {
        var result = puma.evalPuma("8 << 2;");
        equal(result.value,32,"Passed!");
    });

    test("The Signed Right Shift Operator ( >> )",function () {
        var result = puma.evalPuma("9 >> 2;");
        equal(result.value,2,"Passed!");
    });

    test("The Unsigned Right Shift Operator ( >>> )",function () {
        var result = puma.evalPuma("19>>>2");
        equal(result.value,4,"Passed!");
    });

    module("11.8 Relational Operators");

    test("< Operator",function () {
        var result = puma.evalPuma("0 < 1;");
        ok(result.value,"Passed!");
    });

    test("> Operator",function () {
        var result = puma.evalPuma("0 > 1;");
        ok(!result.value,"Passed!");
    });

    test("<= Operator",function () {
        var result = puma.evalPuma(" 1 <= 1 && 0 <= 1;");
        ok(result.value,"Passed!");
    });

    test(">= Operator",function () {
        var result = puma.evalPuma("1 >= 1 && 1 >= 0;");
        ok(result.value,"Passed!");
    });

    test("instanceof Operator",function () {
        var result = puma.evalPuma("var x={}; x instanceof Object;");
        result.makeValue();
        equal(result.value,true,"Passed!");
    });

    test("in Operator",function () {
        var result = puma.evalPuma("1 in [0,1];");
        ok(result.value,"Passed!");
    });

    module("11.9 Equality Operators");

    test("== Operator",function () {
        var result = puma.evalPuma("1 == '1';");
        ok(result.value,"Passed!");
    });

    test("!= Operator",function () {
        var result = puma.evalPuma("1 != '1'; ");
        ok(!result.value,"Passed!");
    });

    test("=== Operator",function () {
        var result = puma.evalPuma("3 === '3';");
        ok(!result.value,"Passed!");
    });

    test("!== Operator",function () {
        var result = puma.evalPuma("3 !== '3';");
        ok(result.value,"Passed!");
    });

    module("11.10 Binary Bitwise Operators");

    test("& Operator",function () {
        var result = puma.evalPuma("14 & 9;");
        equal(result.value,8,"Passed!");
    });

    test("| Operator",function () {
        var result = puma.evalPuma("14 | 9");
        equal(result.value,15,"Passed!");
    });

    test("^ Operator",function () {
        var result = puma.evalPuma("14 ^ 9");
        equal(result.value,7,"Passed!");
    });

    module("11.11 Binary Logical Operators");

    test("&& Operator",function () {
        var result = puma.evalPuma("true  && false;");
        ok(!result.value,"Passed!");
    });

    test("|| Operator",function () {
        var result = puma.evalPuma("true || false;");
        ok(result.value,"Passed!");
    });

    module("11.12 Conditional Operators");

    test("Conditional Operator ( ? : )",function () {
        var result = puma.evalPuma("false ? 'manzana' : 'naranja'");
        strictEqual(result.value, 'naranja', "Passed!");
    });

    module("11.13 Assignment Operators");

    test("Simple Assigment",function () {
        var result = puma.evalPuma("var x = 5; var y = 10; x = y; x;");
        result.makeValue();
        equal(result.value,10,"Passed!");
    });

    test("*= Operator",function () {
        var result = puma.evalPuma("var x = 5; var y = 10; x *= y; x;");
        result.makeValue();
        equal(result.value,50,"Passed!");
    });

    test("/= Operator",function () {
        var result = puma.evalPuma("var x = 10; var y = 5; x /= y; x;");
        result.makeValue();
        equal(result.value,2,"Passed!");
    });

    test("%= Operator",function () {
        var result = puma.evalPuma("var x = 10; var y = 5; x %= y; x;");
        result.makeValue();
        equal(result.value,0,"Passed!");
    });

    test("+= Operator",function () {
        var result = puma.evalPuma("var x = 5; var y = 10; x += y; x;");
        result.makeValue();
        equal(result.value,15,"Passed!");
    });

    test("-= Operator",function () {
        var result = puma.evalPuma("var x = 10; var y = 5; x -= y; x;");
        result.makeValue();
        equal(result.value,5,"Passed!");
    });

    test("<<= Operator",function () {
        var result = puma.evalPuma("var x = 8; var y = 2; x <<= y; x;");
        result.makeValue();
        equal(result.value,32,"Passed!");
    });

    test(">>= Operator",function () {
        var result = puma.evalPuma("var x = 9; var y = 2; x >>= y; x;");
        result.makeValue();
        equal(result.value,2,"Passed!");
    });

    test(">>>= Operator",function () {
        var result = puma.evalPuma("var x = 19; var y = 2; x >>>= y; x;");
        result.makeValue();
        equal(result.value,4,"Passed!");
    });

    test("&= Operator",function () {
        var result = puma.evalPuma("var x = 14; var y = 9; x &= y; x;");
        result.makeValue();
        equal(result.value,8,"Passed!");
    });

    test("^= Operator",function () {
        var result = puma.evalPuma("var x = 14; var y = 9; x ^= y; x;");
        result.makeValue();
        equal(result.value,7,"Passed!");
    });

    test("|= Operator",function () {
        var result = puma.evalPuma("var x = 14; var y = 9; x |= y; x;");
        result.makeValue();
        equal(result.value,15,"Passed!");
    });

    module("11.14 Comma Operators");

    QUnit.skip("Comma Operators",function () {
        var result = puma.evalPuma("function myFunc () {var x = 0; return (x += 1,x*=2, x);}; myFunc();");
        result.makeValue();
        equal(result.value,2,"Passed!");
    });
});
