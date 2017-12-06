// Copyright (c) 2013 - present UTN-LIS

/* eslint quotes: 0, no-unused-vars: 0 */

/**
 *          PUMASCRIPT BASE TEST SUITE
 * @file: Base expressions test suite for the language
 */
var test = QUnit.test;

define(['pumascript'], function (puma) {

    QUnit.module("Base-Tests");

    test("number constant test", function(assert) {
        var result = puma.evalPuma("1");
        assert.ok(result.success && 1 === result.value);
    });

    test("declaration", function(assert) {
        var result = puma.evalPuma("var u; u === undefined");
        assert.ok(result.success && true === result.value);
    });

    test("string constant test", function(assert) {
        var result = puma.evalPuma("\"Hello\"");
        assert.ok(result.success && "Hello" === result.value);
    });

    test("test division", function(assert) {
        var result = puma.evalPuma("2 / 2;");
        assert.equal(result.value, 1);
    });

    test("test instanceof", function(assert) {
        var result = puma.evalPuma("[1,2] instanceof Array;");
        assert.equal(result.value, true);
    });

    test("arithmetic operations", function(assert) {
        var result = puma.evalPuma("1 + 1 * 2 << 2 >> 2 / 2;");
        assert.equal(result.value, 1 + 1 * 2 << 2 >> 2 / 2);
    });

    test("basic function", function(assert) {
        var result = puma.evalPuma("function foo(){ return 1; } foo();");
        assert.equal(result.value, 1);
    });

    test("basic function arguments", function(assert){
        var result = puma.evalPuma("function foo(a, b){ return a + b; } foo(1, 2);");
        assert.equal(result.value, 3);
    });

    test("basic function arguments with same name than local variables", function(assert){
        var result = puma.evalPuma("var a = 2; var b = 3; function foo(a, b){ return a + b; } foo(1, 2);");
        assert.equal(result.value, 3);
    });

    test("parent variable hidden by local variable", function(assert){
        var result = puma.evalPuma("var a = 1; function foo(){ var a = 5; return a; } foo();");
        result.makeValue();
        assert.equal(result.value, 5);
    });

    test("local variable function do not alias parent scope function", function(assert){
        var result = puma.evalPuma("var a = 1; function foo(){ var a = 5; return a; } foo(); a;");
        result.makeValue();
        assert.equal(result.value, 1);
    });

    test("parent variable accessed from local function", function(assert){
        var result = puma.evalPuma("var a = 1; function foo(){ a = 5; return 2; } foo(); a;");
        result.makeValue();
        assert.equal(result.value, 5);
    });

    test("parent variable accessed from local function", function(assert){
        var result = puma.evalPuma("var a = 1; var b = 1; function foo(){ var a = 2; function foo2(){ a = 5; } foo2(); b = a; return 2; } foo(); b;");
        result.makeValue();
        assert.equal(result.value, 5);
    });

    test("recursive function call", function(assert){
        var result = puma.evalPuma("function recursive(a){ if(a>5) return a; else return recursive(a+1); } recursive(1);");
        assert.equal(result.value, 6);
    });

    test("function that returns a function", function(assert){
        var result = puma.evalPuma("function foo(){ function inner(){ return 2; } return inner; } foo()();");
        assert.equal(result.value, 2);
    });

    test("return statement", function(assert){
        var result = puma.evalPuma("function foo(){ return 1; return 2; } foo();");
        assert.equal(result.value, 1);
    });

    test("for empty", function(assert){
        var result = puma.evalPuma("for(;false;) {  }; true;");
        assert.equal(result.value, true);
    });

    test("for statement 1", function(assert){
        var result = puma.evalPuma("var j=0; for(var i=0;i<2;i=i+1) { j+=1; }");
        assert.equal(result.value, 2);
    });

    test("for statement 2", function(assert){
        var result = puma.evalPuma("var b=true; for(var i=0;b;i=i+1) { if(i>5)b=false;}");
        assert.equal(result.value, false);
    });

    test("for statement 3", function(assert){
        var result = puma.evalPuma("var b=true; var j=1; for(var i=0;b;i=i+1) { if(i>5)b=false; j+=1;}");
        assert.equal(result.value, 8);
    });

    test("for statement update test", function(assert){
        var result = puma.evalPuma("var first = true; var firstValue = -1; var j; for(var i=5;i<7;i=i+1) { if(first){ firstValue = i; first = false; }  j+=1; } firstValue;");
        result.makeValue();
        assert.equal(result.value, 5);
    });

    test("simple array access", function(assert){
        var result = puma.evalPuma("var a1 = [1,2,3]; a1[1];");
        result.makeValue();
        assert.equal(result.value, 2);
    });

    test("property access using expressions", function(assert){
        var result = puma.evalPuma("var a1 = [1,2,3,4]; var index = 2; a1[1+1];");
        result.makeValue();
        assert.equal(result.value, 3);
    });

    test("Comments testing 1", function(assert){
        var result = puma.evalPuma("var b=true; //This is a comment");
        assert.equal(result.success, true);
    });

    test("Comments testing 2", function(assert){
        var result = puma.evalPuma("//Comment\n var b=true;");
        assert.equal(result.success, true);
    });

    test("Comments testing 3", function(assert){
        var result = puma.evalPuma("/*Comment*/ var b=true;");
        assert.equal(result.success, true);
    });

    test("meta variables types counting", function(assert){
        var meta = puma.evalPuma("var a; a = 1; a = \"hola\"; a = 2;").value.meta;
        assert.equal(meta.number, 2);
        assert.equal(meta.string, 1);
    });

    test("meta parameters and return type counting", function(assert){
        var meta = puma.evalPuma("function foo(a, b){ return a + b; } foo(1,2); foo(3,4); foo;").value.value.meta;
        assert.equal(meta.parameters[0].number, 2);
        assert.equal(meta.parameters[1].number, 2);
        assert.equal(meta.returns.number, 2);
    });

    test("mixed meta parameters and return type counting", function(assert){
        var meta = puma.evalPuma("function foo(a, b){ return a + b; } foo(1,\"hola\"); foo(3,4); foo;").value.value.meta;
        assert.equal(meta.parameters[0].number, 2);
        assert.equal(meta.parameters[1].number, 1);
        assert.equal(meta.returns.number, 1);
        assert.equal(meta.returns.string, 1);
    });

    test("Unary expressions", function(assert){
        var result = puma.evalPuma("var a = '3'; var b = 1; b++; if(!false){~(+a + (-b));}");
        assert.equal(result.value, -2);
    });

    test("While statement 1", function(assert){
        var result = puma.evalPuma("var a = 0; while(a < 10) { a++; }");
        assert.equal(result.value, 9);
    });

    test("While statement 2", function(assert){
        var result = puma.evalPuma("var a = 0; var b = true; while(b) { if(a >= 9){b=false;} a++; }");
        assert.equal(result.value, 9);
    });

    test("Object expression", function(assert){
        var result = puma.evalPuma("var o1 = { a: 1, b: 3 }; o1;");
        assert.equal(result.value.value.a, 1);
        assert.equal(result.value.value.b, 3);
    });

    test("Object expression 2", function(assert){
        var result = puma.evalPuma("var o1 = { 'a': 1, 'b': 3 }; o1;");
        assert.equal(result.value.value.a, 1);
        assert.equal(result.value.value.b, 3);
    });

    test("Object expression with inner sub objects", function(assert){
        var result = puma.evalPuma("var o1 = { a: { c: 1 }, b: { d: 'hola'} }; o1;");
        assert.equal(result.value.value.a.c, 1);
        assert.equal(result.value.value.b.d, 'hola');
    });

    test("Member expression", function(assert){
        var result = puma.evalPuma("var o1 = { a: 1, b: 3 }; o1.b;");
        assert.equal(result.value.value, 3);
    });

    test("Member expression with inner sub objects", function(assert){
        var result = puma.evalPuma("var o1 = { a: { c: 1 }, b: { d: 'hola'} }; o1.b.d;");
        assert.equal(result.value.value, 'hola');
    });

    test("Function expression", function(assert){
        var result = puma.evalPuma("var a = function() { return 3; }; a();");
        assert.equal(result.value, 3);
    });

    test("Function expression with parameters", function(assert){
        var result = puma.evalPuma("var a = function(number) { return number; }; a(4);");
        assert.equal(result.value, 4);
    });

    test("Function expression recursive", function(assert){
        var result = puma.evalPuma("var a = function fact(number){ if(number > 1) { return number + fact(number - 1); } else { return number; } }; a(3);");
        assert.equal(result.value, 6);
    });

    test("Array expression", function(assert){
        var result = puma.evalPuma("var a = [1, 2, ]; a;");
        assert.equal(result.value.value[1], 2);
        assert.equal(result.value.value[2], null);
        assert.equal(result.value.value.length, 2);
    });

    test("test logical operator &&", function(assert){
        var result = puma.evalPuma("true && true;");
        assert.equal(result.value, true);
    });

    test("test logical operator && does not evaluate second arg", function(assert){
        var result = puma.evalPuma("var a1=1;false && a1++;a1;");
        assert.equal(result.value.value, 1);
    });

    test("test logical operator ||", function(assert){
        var result = puma.evalPuma("false || true;");
        assert.equal(result.value, true);
    });

    test("test logical operator || does not evaluate second arg", function(assert){
        var result = puma.evalPuma("var a1=1;true || a1++;a1;");
        assert.equal(result.value.value, 1);
    });

    test("test call to native functions", function(assert){
        var result = puma.evalPuma("var regex = /^([0-9]+)?(.[0-9]+)?$/; regex.test('1231233')");
        assert.equal(result.value, true);
    });

    test("test call to native functions using objects as arguments", function(assert){
        var result = puma.evalPuma("var regex = /^([0-9]+)?(.[0-9]+)?$/; var a1 = { value: '12.56' }; regex.test(a1.value)");
        assert.equal(result.value, true);
    });

    test("test call to native functions in native objects", function(assert){
        var result = puma.evalPuma("Math.round(7.888);");
        assert.equal(result.value, 8);
    });

    test("test for native string and property access", function(assert){
        var result = puma.evalPuma("'hola'.substr(1) === 'ola'");
        assert.equal(result.value, true);
    });

    test("New Expression: simple object", function(assert){
        var result = puma.evalPuma("function A(){ this.a = 10; } var o = new A(); o.a;");
        assert.equal(result.value.value, 10);
    });

    test("New Expression: constructor with parameters", function(assert){
        var result = puma.evalPuma("function A(a){ this.a = a; } var o = new A(5); o.a;");
        assert.equal(result.value.value, 5);
    });

    test("New Expression: object with an extended prototype", function(assert){
        var result = puma.evalPuma("function A(){ this.a = 1; } A.prototype.b = 2; var o = new A(); o.b;");
        assert.equal(result.value.value, 2);
    });

    test("array property access using reference expression", function(assert){
        var result = puma.evalPuma("var a1 = [1,2,3,4]; var index = 1; a1[index];");
        result.makeValue();
        assert.equal(result.value, 2);
    });

    test("object property access using member access and computed expression", function(assert){
        var result = puma.evalPuma("var a1 = { uno: 1, dos: 2 }; a1['uno'] + a1.dos + a1['un' + 'o'];");
        result.makeValue();
        assert.equal(result.value, 4);
    });

    /* This test is when the support for new expression added */
    QUnit.skip("test for native string and property access against object type", function(assert){
        var result = puma.evalPuma("'hola'.substr(1) === new String('ola')");
        assert.equal(result.value, false);
    });

});
