// Copyright (c) 2013 - present UTN-LIS

/* eslint quotes: 0, no-unused-vars: 0 */

/**
 *          PUMASCRIPT BASE TEST SUITE
 * @file: Base expressions test suite for the language
 */
define(['pumascript', 'esprima'], function (puma, esprima) {

    test('number constant test', function () {
        var result = puma.evalPuma('1');
        ok(result.success && 1 === result.value);
    });

    test('declaration', function () {
        var result = puma.evalPuma('var u; u === undefined');
        ok(result.success && true === result.value);
    });

    test('string constant test', function () {
        var result = puma.evalPuma('\'Hello\'');
        ok(result.success && 'Hello' === result.value);
    });

    test('test division', function () {
        var result = puma.evalPuma('2 / 2;');
        equal(result.value, 1);
    });

    test('test instanceof', function () {
        var result = puma.evalPuma('[1,2] instanceof Array;');
        equal(result.value, true);
    });

    test('arithmetic operations', function () {
        var result = puma.evalPuma('1 + 1 * 2 << 2 >> 2 / 2;');
        equal(result.value, 1 + 1 * 2 << 2 >> 2 / 2);
    });

    test('basic function', function () {
        var result = puma.evalPuma('function foo(){ return 1; } foo();');
        equal(result.value, 1);
    });

    test('basic function arguments', function () {
        var result = puma.evalPuma('function foo(a, b){ return a + b; } foo(1, 2);');
        equal(result.value, 3);
    });

    test('basic function arguments with same name than local variables', function () {
        var result = puma.evalPuma('var a = 2; var b = 3; function foo(a, b){ return a + b; } foo(1, 2);');
        equal(result.value, 3);
    });

    test('parent variable hidden by local variable', function () {
        var result = puma.evalPuma('var a = 1; function foo(){ var a = 5; return a; } foo();');
        result.makeValue();
        equal(result.value, 5);
    });

    test('local variable function do not alias parent scope function', function () {
        var result = puma.evalPuma('var a = 1; function foo(){ var a = 5; return a; } foo(); a;');
        result.makeValue();
        equal(result.value, 1);
    });

    test('parent variable accessed from local function', function () {
        var result = puma.evalPuma('var a = 1; function foo(){ a = 5; return 2; } foo(); a;');
        result.makeValue();
        equal(result.value, 5);
    });

    test('parent variable accessed from local function', function () {
        var result = puma.evalPuma('var a = 1; var b = 1; function foo(){ var a = 2; function foo2(){ a = 5; } foo2(); b = a; return 2; } foo(); b;');
        result.makeValue();
        equal(result.value, 5);
    });

    test('recursive function call', function () {
        var result = puma.evalPuma('function recursive(a){ if(a>5) return a; else return recursive(a+1); } recursive(1);');
        equal(result.value, 6);
    });

    test('function that returns a function', function () {
        var result = puma.evalPuma('function foo(){ function inner(){ return 2; } return inner; } foo()();');
        equal(result.value, 2);
    });

    test('return statement', function () {
        var result = puma.evalPuma('function foo(){ return 1; return 2; } foo();');
        equal(result.value, 1);
    });

    test('for empty', function () {
        var result = puma.evalPuma('for(;false;) {  }; true;');
        equal(result.value, true);
    });

    test('for statement 1', function () {
        var result = puma.evalPuma('var j=0; for(var i=0;i<2;i=i+1) { j+=1; }');
        equal(result.value, 2);
    });

    test('for statement 2', function () {
        var result = puma.evalPuma('var b=true; for(var i=0;b;i=i+1) { if(i>5)b=false;}');
        equal(result.value, false);
    });

    test('for statement 3', function () {
        var result = puma.evalPuma('var b=true; var j=1; for(var i=0;b;i=i+1) { if(i>5)b=false; j+=1;}');
        equal(result.value, 8);
    });

    test('for statement update test', function () {
        var result = puma.evalPuma('var first = true; var firstValue = -1; var j; for(var i=5;i<7;i=i+1) { if(first){ firstValue = i; first = false; }  j+=1; } firstValue;');
        result.makeValue();
        equal(result.value, 5);
    });

    test('simple array access', function () {
        var result = puma.evalPuma('var a1 = [1,2,3]; a1[1];');
        result.makeValue();
        equal(result.value, 2);
    });

    test('property access using expressions', function () {
        var result = puma.evalPuma('var a1 = [1,2,3,4]; var index = 2; a1[1+1];');
        result.makeValue();
        equal(result.value, 3);
    });

    test('Comments testing 1', function () {
        var result = puma.evalPuma('var b=true; //This is a comment');
        equal(result.success, true);
    });

    test('Comments testing 2', function () {
        var result = puma.evalPuma('//Comment\n var b=true;');
        equal(result.success, true);
    });

    test('Comments testing 3', function () {
        var result = puma.evalPuma('/*Comment*/ var b=true;');
        equal(result.success, true);
    });

    test('meta variables types counting', function () {
        var meta = puma.evalPuma('var a; a = 1; a = \'hola\'; a = 2;').value.meta;
        equal(meta.number, 2);
        equal(meta.string, 1);
    });

    test('meta parameters and return type counting', function () {
        var meta = puma.evalPuma('function foo(a, b){ return a + b; } foo(1,2); foo(3,4); foo;').value.value.meta;
        equal(meta.parameters[0].number, 2);
        equal(meta.parameters[1].number, 2);
        equal(meta.returns.number, 2);
    });

    test('mixed meta parameters and return type counting', function () {
        var meta = puma.evalPuma('function foo(a, b){ return a + b; } foo(1,\'hola\'); foo(3,4); foo;').value.value.meta;
        equal(meta.parameters[0].number, 2);
        equal(meta.parameters[1].number, 1);
        equal(meta.returns.number, 1);
        equal(meta.returns.string, 1);
    });

    test('Unary expressions', function () {
        var result = puma.evalPuma('var a = \'3\'; var b = 1; b++; if(!false){~(+a + (-b));}');
        equal(result.value, -2);
    });

    test('While statement 1', function () {
        var result = puma.evalPuma('var a = 0; while(a < 10) { a++; }');
        equal(result.value, 9);
    });

    test('While statement 2', function () {
        var result = puma.evalPuma('var a = 0; var b = true; while(b) { if(a >= 9){b=false;} a++; }');
        equal(result.value, 9);
    });

    test('Object expression', function () {
        var result = puma.evalPuma('var o1 = { a: 1, b: 3 }; o1;');
        equal(result.value.value.a, 1);
        equal(result.value.value.b, 3);
    });

    test('Object expression 2', function () {
        var result = puma.evalPuma('var o1 = { \'a\': 1, \'b\': 3 }; o1;');
        equal(result.value.value.a, 1);
        equal(result.value.value.b, 3);
    });

    test('Object expression with inner sub objects', function () {
        var result = puma.evalPuma('var o1 = { a: { c: 1 }, b: { d: \'hola\'} }; o1;');
        equal(result.value.value.a.c, 1);
        equal(result.value.value.b.d, 'hola');
    });

    test('Member expression', function () {
        var result = puma.evalPuma('var o1 = { a: 1, b: 3 }; o1.b;');
        equal(result.value.value, 3);
    });

    test('Member expression with inner sub objects', function () {
        var result = puma.evalPuma('var o1 = { a: { c: 1 }, b: { d: \'hola\'} }; o1.b.d;');
        equal(result.value.value, 'hola');
    });

    test('Function expression', function () {
        var result = puma.evalPuma('var a = function() { return 3; }; a();');
        equal(result.value, 3);
    });

    test('Function expression with parameters', function () {
        var result = puma.evalPuma('var a = function(number) { return number; }; a(4);');
        equal(result.value, 4);
    });

    test('Function expression recursive', function () {
        var result = puma.evalPuma('var a = function fact(number){ if(number > 1) { return number + fact(number - 1); } else { return number; } }; a(3);');
        equal(result.value, 6);
    });

    test('Array expression', function () {
        var result = puma.evalPuma('var a = [1, 2, ]; a;');
        equal(result.value.value[1], 2);
        equal(result.value.value[2], null);
        equal(result.value.value.length, 2);
    });

    test('test logical operator &&', function () {
        var result = puma.evalPuma('true && true;');
        equal(result.value, true);
    });

    test('test logical operator && does not evaluate second arg', function () {
        var result = puma.evalPuma('var a1=1;false && a1++;a1;');
        equal(result.value.value, 1);
    });

    test('test logical operator ||', function () {
        var result = puma.evalPuma('false || true;');
        equal(result.value, true);
    });

    test('test logical operator || does not evaluate second arg', function () {
        var result = puma.evalPuma('var a1=1;true || a1++;a1;');
        equal(result.value.value, 1);
    });

    test('test call to native functions', function () {
        var result = puma.evalPuma('var regex = /^([0-9]+)?(\.[0-9]+)?$/; regex.test(\'1231233\')');
        equal(result.value, true);
    });

    test('test call to native functions using objects as arguments', function () {
        var result = puma.evalPuma('var regex = /^([0-9]+)?(\.[0-9]+)?$/; var a1 = { value: \'12.56\' }; regex.test(a1.value)');
        equal(result.value, true);
    });

    test('test call to native functions in native objects', function () {
        var result = puma.evalPuma('Math.round(7.888);');
        equal(result.value, 8);
    });

    test('test for native string and property access', function () {
        var result = puma.evalPuma('\'hola\'.substr(1) === \'ola\'');
        equal(result.value, true);
    });

    test('New Expression: simple object', function () {
        var result = puma.evalPuma('function A(){ this.a = 10; } var o = new A(); o.a;');
        equal(result.value.value, 10);
    });

    test('New Expression: constructor with parameters', function () {
        var result = puma.evalPuma('function A(a){ this.a = a; } var o = new A(5); o.a;');
        equal(result.value.value, 5);
    });

    test('New Expression: object with an extended prototype', function () {
        var result = puma.evalPuma('function A(){ this.a = 1; } A.prototype.b = 2; var o = new A(); o.b;');
        equal(result.value.value, 2);
    });

    test('array property access using reference expression', function () {
        var result = puma.evalPuma('var a1 = [1,2,3,4]; var index = 1; a1[index];');
        result.makeValue();
        equal(result.value, 2);
    });

    test('object property access using member access and computed expression', function () {
        var result = puma.evalPuma('var a1 = { uno: 1, dos: 2 }; a1[\'uno\'] + a1.dos + a1[\'un\' + \'o\'];');
        result.makeValue();
        equal(result.value, 4);
    });

    test('test for native string and property access against object type', function () {
        var result = puma.evalPuma('\'hola\'.substr(1) === new String(\'ola\')');
        equal(result.value, false);
    });
});