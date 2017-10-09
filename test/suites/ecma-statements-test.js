// Copyright (c) 2013 - present UTN-LIS

/* global define, test, ok, equal */

/*
 *              PUMASCRIPT BASE TEST SUITE
 *  @file: Base expressions test suite for the language
 */
define(['pumascript', 'esprima'], function (puma, esprima) {

    module('12.1 Blocks')

    test('Block Statement 1', function () {
        var result = puma.evalPuma('1;;;;;');
        equal(result.success, true);
        equal(result.value, 1);
    });

    test('Block Statement 2', function () {
        var result = puma.evalPuma('1;{}');
        result.makeValue();
        equal(result.success, true);
        equal(result.value, 1);
    });

    test('Block Statement 3', function () {
        var result = puma.evalPuma('1;var a;');
        result.makeValue();
        equal(result.success, true);
        equal(result.value, 1);
    });

    test('Block Statement 4', function () {
        var result = puma.evalPuma('1;if(false){8;};;');
        result.makeValue();
        equal(result.success, true);
        equal(result.value, 1);
    });

    QUnit.skip('Block Statement 5', function () {
        var result = puma.evalPuma('1;{var b = 2;for (var i in null) {5;}};for (var i in undefined) {6};{{;}}');
        result.makeValue();
        equal(result.success, true);
        equal(result.value, 1);
    });

    QUnit.skip('Block Statement 6', function () {
        var result = puma.evalPuma('1;for (var i in [1]){;};if(true);');
        result.makeValue();
        equal(result.success, true);
        equal(result.value, 1);
    });

    test('Block Statement 7', function () {
        var result = puma.evalPuma('3;{9;{if(true){6}}}');
        result.makeValue();
        equal(result.success, true);
        equal(result.value, 6);
    });

    module('12.2 Variables');

    test('Variable Declaration: Variables are initialised to undefined when created', function () {
        var result = puma.evalPuma('var a1; a1;');
        result.makeValue();
        equal(result.value, undefined, 'Passed!');
    });

    test('Variable Declaration: Value of AssignmentExpression on VariableStatement execution', function () {
        var result = puma.evalPuma('var a1 = 1; a1;');
        result.makeValue();
        equal(result.value, 1, 'Passed!');
    });

    test('Variable Declaration in strict mode: \'eval\' as identifier', function () {
        var exceptionMessage;
        try {
            var result = puma.evalPuma('\'use strict\';var eval;');
        } catch (e) {
            exceptionMessage = e.message;
        }
        equal(exceptionMessage, 'Line 1: Variable name may not be eval or arguments in strict mode', 'Passed!');
    });

    test('Variable Declaration in strict mode: \'arguments\' as identifier', function () {
        var exceptionMessage;
        try {
            var result = puma.evalPuma('\'use strict\'; var arguments;');
        } catch (e) {
            exceptionMessage = e.message;
        }
        equal(exceptionMessage, 'Line 1: Variable name may not be eval or arguments in strict mode', 'Passed!');
    });

    module('12.3 Empty Statement');

    test('Empty Statement', function () {
        var result = puma.evalPuma(';');
        result.makeValue();
        equal(result.success, true);
        equal(result.value, undefined, 'Passed!');
    });

    test('Empty Statement Conditional Arrest', function () {
        var result = puma.evalPuma('var a = 0, b = 4; if((a==0) || (b = 0)); b.valueOf();');
        result.makeValue();
        equal(result.success, true);
        equal(result.value, 4, 'Passed!');
    });

    test('Empty Statement For', function () {
        var result = puma.evalPuma('var a = [\'E\',\'M\',\'P\']; for(var i = 0; i < a.length; a[i++] = 0); a;');
        result.makeValue();
        equal(result.success, true);
        equal(result.value[0], 0);
        equal(result.value[1], 0);
        equal(result.value[2], 0);
    });

    // TODO testear An ExpressionStatement cannot start with an opening curly brace because that might make it ambiguous with a
    // Block. Also, an ExpressionStatement cannot start with the function keyword because that might make it ambiguous with a
    // FunctionDeclaration.
    // (como hago para que JS o PumaScript se de cuenta que estoy queriendo escribir un ExpressionStatement y no un Block o FunctionDeclaration?)

    module('12.5 If Statement');

    test('If statement: true', function () {
        var result = puma.evalPuma('if (true) 1; else 2;');
        result.makeValue();
        equal(result.value, 1, 'Passed!');
    });
    test('If statement : true with curly', function () {
        var result = puma.evalPuma('if (true) {1;} else{2;}');
        result.makeValue();
        equal(result.value, 1, 'Passed!');
    })

    test('If statement: false', function () {
        var result = puma.evalPuma('if (false) 1; else 2;');
        result.makeValue();
        equal(result.value, 2, 'Passed!');
    });

    test('If statement: false with curly', function () {
        var result = puma.evalPuma('if (false){1;} else {2;}');
        result.makeValue();
        equal(result.value, 2, 'Passed!');
    });

    module('12.6 Iteration Statements');

    test('do Statement while (Expression)', function () {
        var result = puma.evalPuma('var a = 0;  do { a++; } while (a<4); a;');
        result.makeValue();
        equal(result.success, true);
        equal(result.value, 4, 'Passed!');
    });

    test('do Statement while (Expression) 2', function () {
        var result = puma.evalPuma('var a = true; do { a=!a; } while (a); a;');
        result.makeValue();
        equal(result.success, true);
        equal(result.value, false, 'Passed!');
    });

    test('while (Expression) Statement', function () {
        var result = puma.evalPuma('var a = 0; while (a<8) { a++; } a;');
        result.makeValue();
        equal(result.success, true);
        equal(result.value, 8, 'Passed!');
    });

    test('while (Expression) Statement 2', function () {
        var result = puma.evalPuma('var a = 1; var b = true; while (b) { a++; b=!b; } a;');
        result.makeValue();
        equal(result.success, true);
        equal(result.value, 2, 'Passed!');
    });

    test('for (ExpressionNoIn ; Expression ; Expression) (Value)', function () {
        var result = puma.evalPuma('for(var i = 0; i < 10; i++) {i;}');
        ok(result.success && result.value === 9, 'Passed!');
    });

    test('for (ExpressionNoIn ; Expression ; Expression) (No Statement)', function () {
        var result = puma.evalPuma('for(var i = 0; i < 10; i++);');
        ok(result.success && result.value === undefined, 'Passed!');
    });

    test('for (ExpressionNoIn ; Expression ; Expression) Statement', function () {
        var result = puma.evalPuma('var j = 0; for(var i = 0; i < 10; i++) j+=i;');
        result.makeValue();
        equal(result.success, true);
        equal(result.value, 45, 'Passed!');
    });

    test('for (ExpressionNoIn ; Expression ; ) Expression', function () {
        var result = puma.evalPuma('for(var i = 0; i < 10; ) i++;');
        result.makeValue();
        equal(result.success, true);
        equal(result.value, 9, 'Passed!');
    });

    test('for (ExpressionNoIn ; Expression ; ) Statement', function () {
        var result = puma.evalPuma('for(var i = 0; i < 10; ) i++; i;');
        result.makeValue();
        equal(result.success, true);
        equal(result.value, 10, 'Passed!');
    });

    QUnit.skip('for (ExpressionNoIn ;  ; Expression) Statement', function () {
        var result = puma.evalPuma('for(var i = 0; ; i++) { if (i === 6) break; } i;');
        result.makeValue();
        equal(result.success, true);
        equal(result.value, 6, 'Passed!');
    });

    test('for ( ; Expression ; Expression) Statement', function () {
        var result = puma.evalPuma('var i = 6; for( ; i < 10; i++); i;');
        result.makeValue();
        equal(result.success, true);
        equal(result.value, 10, 'Passed!');
    });

    QUnit.skip('for ( ; ; Expression) Statement', function () {
        var result = puma.evalPuma('var i = 6, j = 0; for( ; ; i++) { if (i > 9) break; j+=i; } j+i;');
        result.makeValue();
        equal(result.success, true);
        equal(result.value, 10, 'Passed!');
    });

    QUnit.skip('for ( ; ; ) Statement', function () {
        var result = puma.evalPuma('var i = 2, j = 4; for( ; ; ) { if (i < 0) break; j+=i; i-- } j+i;');
        result.makeValue();
        equal(result.success, true);
        equal(result.value, 6, 'Passed!');
    });

    QUnit.skip('for ( LeftHandSideExpression in Expression ) Statement', function () {
        var result = puma.evalPuma('var person = {a:1, b:2, c:3}; var res = 0; var x; for (x in person) { res += person[x]; } res;');
        result.makeValue();
        equal(result.success, true);
        equal(result.value, 6, 'Passed!');
    });

    QUnit.skip('for ( var VariableDeclarationNoIn in Expression ) Statement', function () {
        var result = puma.evalPuma('var res = 0; var obj = {a:1, b:2, c:3}; for (var prop in obj) { res += obj[prop] } res;');
        result.makeValue();
        equal(result.success, true);
        equal(result.value, 6, 'Passed!');
    });

    module('12.7 The Continue Statement');

    QUnit.skip('continue ; (no Identifier)', function () {
        var result = puma.evalPuma('var res = 0; for(var i = 0; i < 5 ; i++) { if (i < 3) continue; res += i; } res;');
        result.makeValue();
        equal(result.success, true);
        equal(result.value, 7, 'Passed!');
    });

    QUnit.skip('continue ; (no Identifier)', function () {
        var result = puma.evalPuma('var res = 0; for(var i = 0; i < 5 ; i++) { if (i < 3) continue; res += i; } res;');
        result.makeValue();
        equal(result.success, true);
        equal(result.value, 7, 'Passed!');
    });

    test('BAD continue ; (no Identifier)', function () {
        var errorMessage;
        try {
            var result = puma.evalPuma('continue;');
        } catch (err) {
            errorMessage = err.message;
        }
        equal(errorMessage, 'Line 1: Illegal continue statement', 'Passed!');
    });

    QUnit.skip('continue [no LineTerminator here] Identifier;', function () {
        var result = puma.evalPuma('var res = 0; anIdentifier: for(var i = 0; i < 5 ; i++) { if (i < 3) continue anIdentifier; res += i; } res;');
        result.makeValue();
        equal(result.value, 7, 'Passed!');
    });

    test('BAD continue [no LineTerminator here] Identifier;', function () {
        var errorMessage;
        try {
            var result = puma.evalPuma('var res = 0; for(var i = 0; i < 5 ; i++) { if (i < 3) continue anIdentifier; res += i; } res;');
        } catch (err) {
            errorMessage = err.message;
        }
        equal(errorMessage, 'Line 1: Undefined label \'anIdentifier\'', 'Passed!');
    });

    module('12.8 The Break Statement');

    QUnit.skip('Break ; (no Identifier)', function () {
        var result = puma.evalPuma('var res = 0; for(var i = 0; i < 5 ; i++) { if (i >= 3) break; res += i; } res;');
        result.makeValue();
        equal(result.value, 3, 'Passed!');
    });

    test('BAD break ; (no Identifier)', function () {
        var errorMessage;
        try {
            var result = puma.evalPuma('break;');
        } catch (err) {
            errorMessage = err.message;
        }
        equal(errorMessage, 'Line 1: Illegal break statement', 'Passed!');
    });

    QUnit.skip('break [no LineTerminator here] Identifier;', function () {
        var result = puma.evalPuma('var res = 0; anIdentifier: for(var i = 0; i < 5 ; i++) { if (i >= 3) break anIdentifier; res += i; } res;');
        result.makeValue();
        equal(result.value, 3, 'Passed!');
    });

    test('BAD break [no LineTerminator here] Identifier;', function () {
        var errorMessage;
        try {
            var result = puma.evalPuma('var res = 0; for(var i = 0; i < 5 ; i++) { if (i >= 3) break anIdentifier; res += i; } res;');
        } catch (err) {
            errorMessage = err.message;
        }
        equal(errorMessage, 'Line 1: Undefined label \'anIdentifier\'', 'Passed!');
    });

    module('12.9 The Return Statement');

    test('Return ; (no Expression)', function () {
        var result = puma.evalPuma('function a() { return; } a();');
        result.makeValue();
        equal(result.value, undefined, 'Passed!');
    });

    test('BAD return ; (no Expression)', function () {
        var errorMessage;
        try {
            var result = puma.evalPuma('return;');
        } catch (err) {
            errorMessage = err.message;
        }
        equal(errorMessage, 'Line 1: Illegal return statement', 'Passed!');
    });

    test('return [no LineTerminator here] Expression;', function () {
        var result = puma.evalPuma('function a() { return 3; } a()');
        result.makeValue();
        equal(result.value, 3, 'Passed!');
    });

    test('BAD return [no LineTerminator here] Expression;', function () {
        var errorMessage;
        try {
            var result = puma.evalPuma('return 3;');
        } catch (err) {
            errorMessage = err.message;
        }
        equal(errorMessage, 'Line 1: Illegal return statement', 'Passed!');
    });

    module('12.10 The With Statement');

    //revisar
    QUnit.skip('With (Expression) read property inside Expression', function () {
        var result = puma.evalPuma('var a = 5; var obj = { a : 10 }; with (obj) { a }');
        result.makeValue();
        equal(result.value, 10, 'Passed!');
    });
    //revisar
    QUnit.skip('With (Expression) read property outside Expression', function () {
        var result = puma.evalPuma('var b = 5; var obj = { a : 10 }; with (obj) { b }');
        result.makeValue();
        equal(result.value, 5, 'Passed!');
    });

    test('With (Expression) in strict mode', function () {
        var errorMessage;
        try {
            var result = puma.evalPuma('\'use strict\'; var obj = { a : 10 }; with (obj) { a }');
        } catch (err) {
            errorMessage = err.message;
        }
        equal(errorMessage, 'Line 1: Strict mode code may not include a with statement', 'Passed!');
    });

    module('12.11 The Switch Statement');

    test('Switch (Expression) no CaseBlock', function () {
        var result = puma.evalPuma('var a; switch (a) {}');
        result.makeValue();
        equal(result.value, undefined, 'Passed!');
    });

    test('Switch (Expression) with CaseBlock', function () {
        var result = puma.evalPuma('var n = 1; switch (\'Apples\') { case \'Oranges\': n = n*2; case \'Apples\': n = n*3; case \'Bananas\': n = n*6; }');
        result.makeValue();
        equal(result.value, 18, 'Passed!');
    });

    test('Switch (Expression) null', function () {
        var result = puma.evalPuma('var n = 2; switch (null) { case undefined: n = n*0; case null: n = n*-1;}');
        result.makeValue();
        equal(result.value, -2, 'Passed!');
    });

    test('Switch (Expression) undefined', function () {
        var result = puma.evalPuma('var n = 2; switch (undefined) { case undefined: n = n*0; case null: n = n*-1;}');
        result.makeValue();
        equal(result.value, 0, 'Passed!');
    });

    test('Switch (Expression) expr', function () {
        var result = puma.evalPuma('switch (typeof u) { case \'undefined\': -1;}');
        result.makeValue();
        equal(result.value, -1, 'Passed!');
    });

    test('Switch (Expression) expr 2', function () {
        var result = puma.evalPuma('switch (typeof Math.E) { case \'number\': 0;}');
        result.makeValue();
        equal(result.value, 0, 'Passed!');
    });

    QUnit.skip('Switch (Expression) case with break', function () {
        var result = puma.evalPuma('var a = 1; switch (a) { case 1: 1; break; case 2: 2; }');
        result.makeValue();
        equal(result.value, 1, 'Passed!');
    });

    test('Switch (Expression) case without break', function () {
        var result = puma.evalPuma('var a = 1; var b = 0; switch (a) { case 1: b += 1; case 2: b += 2; } b;');
        result.makeValue();
        equal(result.value, 3, 'Passed!');
    });

    QUnit.skip('Switch (Expression) case default', function () {
        var result = puma.evalPuma('var a = 0; switch (a) { case 1: 1; break; default: 2; }');
        result.makeValue();
        equal(result.value, 2, 'Passed!');
    });

    test('Switch (Expression) case default no break', function () {
        var result = puma.evalPuma('var a = 4; var b = 0; switch (a) { default: b += 3; case 1: b += 1; case 2: b += 2; } b;');
        result.makeValue();
        equal(result.value, 6, 'Passed!');
    });

    test('Switch (Expression) empty case', function () {
        var result = puma.evalPuma('var a = 4; var b = 0; switch (a) { default: case 1: b += 1; case 2: case 3: b += 3; } b;');
        result.makeValue();
        equal(result.value, 4, 'Passed!');
    });

    module('12.12 Labeled Statements');

    QUnit.skip('LabelledStatement : Identifier : Statement', function () {
        var result = puma.evalPuma('anIdentifier: for(var i = 0; i < 5 ; i++) { } i;');
        result.makeValue();
        equal(result.value, 5, 'Passed!');
    });

    QUnit.skip('Nested labels with different identifiers', function () {
        var result = puma.evalPuma('anIdentifier: for(var i = 0; i < 5; i++) { anIdentifier2: for (var j = 0; j < 5; j++) {} } i + j;');
        result.makeValue();
        equal(result.value, 10, 'Passed!');
    });

    test('Nested labels with the same identifiers', function () {
        var errorMessage;
        try {
            var result = puma.evalPuma('anIdentifier: for(var i = 0; i < 5; i++) { anIdentifier: for (var j = 0; j < 5; j++) {} } i + j;');
        } catch (err) {
            errorMessage = err.message;
        }
        equal(errorMessage, 'Line 1: Label \'anIdentifier\' has already been declared', 'Passed!');
    });

    module('12.13 The Throw Statement');

    QUnit.skip('throw string', function () {
        var errorMessage;
        try {
            var result = puma.evalPuma('throw \'someString\'');
        } catch (err) {
            errorMessage = err.message;
        }
        equal(errorMessage, 'someString', 'Passed!');
    });
    //PumaScript no evalua los throw
    QUnit.skip('throw number', function () {
        var errorMessage = null;
        try {
            var result = puma.evalPuma('throw 42');
        } catch (err) {
            console.log(err);
            errorMessage = err;
        }
        equal(errorMessage, 42, 'Passed!');
    });

    QUnit.skip('throw true', function () {
        var errorMessage;
        try {
            var result = puma.evalPuma('throw true');
        } catch (err) {
            errorMessage = err.message;
        }
        equal(errorMessage, true, 'Passed!');
    });

});