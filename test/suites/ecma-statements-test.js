// Copyright (c) 2013 - present UTN-LIS

/* eslint quotes: 0, no-unused-vars: 0 */

/**
 * PUMASCRIPT ECMA-12 TEST SUITE
 * @file: Statements Test Suite
 */
define(['pumascript'], function (puma) {

    QUnit.module("12.1 Blocks");

    test("Block Statement 1", function (assert) {
        var result = puma.evalPuma("1;;;;;");
        assert.equal(result.success, true);
        assert.equal(result.value, 1);
    });

    test("Block Statement 2", function (assert) {
        var result = puma.evalPuma("1;{}");
        result.makeValue();
        assert.equal(result.success, true);
        assert.equal(result.value, 1);
    });

    test("Block Statement 3", function (assert) {
        var result = puma.evalPuma("1;var a;");
        result.makeValue();
        assert.equal(result.success, true);
        assert.equal(result.value, 1);
    });

    test("Block Statement 4", function (assert) {
        var result = puma.evalPuma("1;if(false){8;};;");
        result.makeValue();
        assert.equal(result.success, true);
        assert.equal(result.value, 1);
    });

    //ForInStatement visitor not implemented yet
    QUnit.skip("Block Statement 5", function (assert) {
        var result = puma.evalPuma("1;{var b = 2;for (var i in null) {5;}};for (var i in undefined) {6};{{;}}");
        result.makeValue();
        assert.equal(result.success, true);
        assert.equal(result.value, 1);
    });

    //ForInStatement visitor not implemented yet
    QUnit.skip("Block Statement 6", function (assert) {
        var result = puma.evalPuma("1;for (var i in [1]){;};if(true);");
        result.makeValue();
        assert.equal(result.success, true);
        assert.equal(result.value, 1);
    });

    test("Block Statement 7", function (assert) {
        var result = puma.evalPuma("3;{9;{if(true){6}}}");
        result.makeValue();
        assert.equal(result.success, true);
        assert.equal(result.value, 6);
    });

    QUnit.module("12.2 Variables");

    test("Variable Declaration: Variables are initialised to undefined when created", function (assert) {
        var result = puma.evalPuma("var a1; a1;");
        result.makeValue();
        assert.equal(result.value, undefined);
    });

    test("Variable Declaration: Value of AssignmentExpression on VariableStatement execution", function (assert) {
        var result = puma.evalPuma("var a1 = 1; a1;");
        result.makeValue();
        assert.equal(result.value, 1);
    });

    test("Variable Declaration in strict mode: 'eval' as identifier", function (assert) {
        var exceptionMessage;
        try {
            var result = puma.evalPuma("'use strict';var eval;");
        } catch (e) {
            exceptionMessage = e.message;
        }
        assert.equal(exceptionMessage, "Line 1: Variable name may not be eval or arguments in strict mode");
    });

    test("Variable Declaration in strict mode: 'arguments' as identifier", function (assert) {
        var exceptionMessage;
        try {
            var result = puma.evalPuma("\"use strict\"; var arguments;");
        } catch (e) {
            exceptionMessage = e.message;
        }
        assert.equal(exceptionMessage, "Line 1: Variable name may not be eval or arguments in strict mode");
    });

    QUnit.module("12.3 Empty Statement");

    test("Empty Statement", function (assert) {
        var result = puma.evalPuma(";");
        result.makeValue();
        assert.equal(result.success, true);
        assert.equal(result.value, undefined);
    });

    test("Empty Statement Conditional Arrest", function (assert) {
        var result = puma.evalPuma("var a = 0, b = 4; if((a==0) || (b = 0)); b.valueOf();");
        result.makeValue();
        assert.equal(result.success, true);
        assert.equal(result.value, 4);
    });

    test("Empty Statement For", function (assert) {
        var result = puma.evalPuma("var a = ['E','M','P']; for(var i = 0; i < a.length; a[i++] = 0); a;");
        result.makeValue();
        assert.equal(result.success, true);
        assert.equal(result.value[0], 0);
        assert.equal(result.value[1], 0);
        assert.equal(result.value[2], 0);
    });

    // TODO testear An ExpressionStatement cannot start with an opening curly brace because that might make it ambiguous with a
    // Block. Also, an ExpressionStatement cannot start with the function keyword because that might make it ambiguous with a
    // FunctionDeclaration.
    // (como hago para que JS o PumaScript se de cuenta que estoy queriendo escribir un ExpressionStatement y no un Block o FunctionDeclaration?)

    QUnit.module("12.5 If Statement");

    test("If statement: true", function (assert) {
        var result = puma.evalPuma("if (true) 1; else 2;");
        result.makeValue();
        assert.equal(result.value, 1);
    });

    test("If statement : true with curly", function (assert) {
        var result = puma.evalPuma("if (true) {1;} else{2;}");
        result.makeValue();
        assert.equal(result.value, 1);
    });

    test("If statement: false", function (assert) {
        var result = puma.evalPuma("if (false) 1; else 2;");
        result.makeValue();
        assert.equal(result.value, 2);
    });

    test("If statement: false with curly", function (assert) {
        var result = puma.evalPuma("if (false){1;} else {2;}");
        result.makeValue();
        assert.equal(result.value, 2);
    });

    QUnit.module("12.6 Iteration Statements");

    test("do Statement while (Expression)", function (assert) {
        var result = puma.evalPuma("var a = 0;  do { a++; } while (a<4); a;");
        result.makeValue();
        assert.equal(result.success, true);
        assert.equal(result.value, 4);
    });

    test("do Statement while (Expression) 2", function (assert) {
        var result = puma.evalPuma("var a = true; do { a=!a; } while (a); a;");
        result.makeValue();
        assert.equal(result.success, true);
        assert.equal(result.value, false);
    });

    test("while (Expression) Statement", function (assert) {
        var result = puma.evalPuma("var a = 0; while (a<8) { a++; } a;");
        result.makeValue();
        assert.equal(result.success, true);
        assert.equal(result.value, 8);
    });

    test("while (Expression) Statement 2", function (assert) {
        var result = puma.evalPuma("var a = 1; var b = true; while (b) { a++; b=!b; } a;");
        result.makeValue();
        assert.equal(result.success, true);
        assert.equal(result.value, 2);
    });

    test("for (ExpressionNoIn ; Expression ; Expression) (Value)", function (assert) {
        var result = puma.evalPuma("for(var i = 0; i < 10; i++) {i;}");
        assert.ok(result.success && result.value === 9);
    });

    test("for (ExpressionNoIn ; Expression ; Expression) (No Statement)", function (assert) {
        var result = puma.evalPuma("for(var i = 0; i < 10; i++);");
        assert.ok(result.success && result.value === undefined);
    });

    test("for (ExpressionNoIn ; Expression ; Expression) Statement", function (assert) {
        var result = puma.evalPuma("var j = 0; for(var i = 0; i < 10; i++) j+=i;");
        result.makeValue();
        assert.equal(result.success, true);
        assert.equal(result.value, 45);
    });

    test("for (ExpressionNoIn ; Expression ; ) Expression", function (assert) {
        var result = puma.evalPuma("for(var i = 0; i < 10; ) i++;");
        result.makeValue();
        assert.equal(result.success, true);
        assert.equal(result.value, 9);
    });

    test("for (ExpressionNoIn ; Expression ; ) Statement", function (assert) {
        var result = puma.evalPuma("for(var i = 0; i < 10; ) i++; i;");
        result.makeValue();
        assert.equal(result.success, true);
        assert.equal(result.value, 10);
    });

    //BreakStatement visitor not implemented yet
    QUnit.skip("for (ExpressionNoIn ;  ; Expression) Statement", function (assert) {
        var result = puma.evalPuma("for(var i = 0; ; i++) { if (i === 6) break; } i;");
        result.makeValue();
        assert.equal(result.success, true);
        assert.equal(result.value, 6);
    });

    test("for ( ; Expression ; Expression) Statement", function (assert) {
        var result = puma.evalPuma("var i = 6; for( ; i < 10; i++); i;");
        result.makeValue();
        assert.equal(result.success, true);
        assert.equal(result.value, 10);
    });

    //BreakStatement visitor not implemented yet
    QUnit.skip("for ( ; ; Expression) Statement", function (assert) {
        var result = puma.evalPuma("var i = 6, j = 0; for( ; ; i++) { if (i > 9) break; j+=i; } j+i;");
        result.makeValue();
        assert.equal(result.success, true);
        assert.equal(result.value, 10);
    });

    //BreakStatement visitor not implemented yet
    QUnit.skip("for ( ; ; ) Statement", function (assert) {
        var result = puma.evalPuma("var i = 2, j = 4; for( ; ; ) { if (i < 0) break; j+=i; i-- } j+i;");
        result.makeValue();
        assert.equal(result.success, true);
        assert.equal(result.value, 6);
    });

    //ForInStatement visitor not implemented yet
    QUnit.skip("for ( LeftHandSideExpression in Expression ) Statement", function (assert) {
        var result = puma.evalPuma("var person = {a:1, b:2, c:3}; var res = 0; var x; for (x in person) { res += person[x]; } res;");
        result.makeValue();
        assert.equal(result.success, true);
        assert.equal(result.value, 6);
    });

    //ForInStatement visitor not implemented yet
    QUnit.skip("for ( var VariableDeclarationNoIn in Expression ) Statement", function (assert) {
        var result = puma.evalPuma("var res = 0; var obj = {a:1, b:2, c:3}; for (var prop in obj) { res += obj[prop] } res;");
        result.makeValue();
        assert.equal(result.success, true);
        assert.equal(result.value, 6);
    });

    QUnit.module("12.7 The Continue Statement");

    //ContinueStatement visitor not implemented yet
    QUnit.skip("continue ; (no Identifier)", function (assert) {
        var result = puma.evalPuma("var res = 0; for(var i = 0; i < 5 ; i++) { if (i < 3) continue; res += i; } res;");
        result.makeValue();
        assert.equal(result.success, true);
        assert.equal(result.value, 7);
    });

    //ContinueStatement visitor not implemented yet
    QUnit.skip("continue ; (no Identifier)", function (assert) {
        var result = puma.evalPuma("var res = 0; for(var i = 0; i < 5 ; i++) { if (i < 3) continue; res += i; } res;");
        result.makeValue();
        assert.equal(result.success, true);
        assert.equal(result.value, 7);
    });

    test("BAD continue ; (no Identifier)", function (assert) {
        var errorMessage;
        try {
            var result = puma.evalPuma("continue;");
        } catch (err) {
            errorMessage = err.message;
        }
        assert.equal(errorMessage, "Line 1: Illegal continue statement");
    });

    //ContinueStatement visitor not implemented yet
    QUnit.skip("continue [no LineTerminator here] Identifier;", function (assert) {
        var result = puma.evalPuma("var res = 0; anIdentifier: for(var i = 0; i < 5 ; i++) { if (i < 3) continue anIdentifier; res += i; } res;");
        result.makeValue();
        assert.equal(result.value, 7);
    });

    test("BAD continue [no LineTerminator here] Identifier;", function (assert) {
        var errorMessage;
        try {
            var result = puma.evalPuma("var res = 0; for(var i = 0; i < 5 ; i++) { if (i < 3) continue anIdentifier; res += i; } res;");
        } catch (err) {
            errorMessage = err.message;
        }
        assert.equal(errorMessage, "Line 1: Undefined label 'anIdentifier'");
    });

    QUnit.module("12.8 The Break Statement");

    //BreakStatement visitor not implemented yet
    QUnit.skip("Break ; (no Identifier)", function (assert) {
        var result = puma.evalPuma("var res = 0; for(var i = 0; i < 5 ; i++) { if (i >= 3) break; res += i; } res;");
        result.makeValue();
        assert.equal(result.value, 3);
    });

    test("BAD break ; (no Identifier)", function (assert) {
        var errorMessage;
        try {
            var result = puma.evalPuma("break;");
        } catch (err) {
            errorMessage = err.message;
        }
        assert.equal(errorMessage, "Line 1: Illegal break statement");
    });

    //LabeledStatement visitor not implemented yet and BreakStatement visitor not implemented yet
    QUnit.skip("break [no LineTerminator here] Identifier;", function (assert) {
        var result = puma.evalPuma("var res = 0; anIdentifier: for(var i = 0; i < 5 ; i++) { if (i >= 3) break anIdentifier; res += i; } res;");
        result.makeValue();
        assert.equal(result.value, 3);
    });

    test("BAD break [no LineTerminator here] Identifier;", function (assert) {
        var errorMessage;
        try {
            var result = puma.evalPuma("var res = 0; for(var i = 0; i < 5 ; i++) { if (i >= 3) break anIdentifier; res += i; } res;");
        } catch (err) {
            errorMessage = err.message;
        }
        assert.equal(errorMessage, "Line 1: Undefined label 'anIdentifier'");
    });

    QUnit.module("12.9 The Return Statement");

    test("Return ; (no Expression)", function (assert) {
        var result = puma.evalPuma("function a() { return; } a();");
        result.makeValue();
        assert.equal(result.value, undefined);
    });

    test("BAD return ; (no Expression)", function (assert) {
        var errorMessage;
        try {
            var result = puma.evalPuma("return;");
        } catch (err) {
            errorMessage = err.message;
        }
        assert.equal(errorMessage, "Line 1: Illegal return statement");
    });

    test("return [no LineTerminator here] Expression;", function (assert) {
        var result = puma.evalPuma("function a() { return 3; } a()");
        result.makeValue();
        assert.equal(result.value, 3);
    });

    test("BAD return [no LineTerminator here] Expression;", function (assert) {
        var errorMessage;
        try {
            var result = puma.evalPuma("return 3;");
        } catch (err) {
            errorMessage = err.message;
        }
        assert.equal(errorMessage, "Line 1: Illegal return statement");
    });

    QUnit.module("12.10 The With Statement");

    //WithStatement visitor not implemented yet
    QUnit.skip("With (Expression) read property inside Expression", function (assert) {
        var result = puma.evalPuma("var a = 5; var obj = { a : 10 }; with (obj) { a }");
        result.makeValue();
        assert.equal(result.value, 10);
    });
    //WithStatement visitor not implemented yet
    QUnit.skip("With (Expression) read property outside Expression", function (assert) {
        var result = puma.evalPuma("var b = 5; var obj = { a : 10 }; with (obj) { b }");
        result.makeValue();
        assert.equal(result.value, 5);
    });

    test("With (Expression) in strict mode", function (assert) {
        var errorMessage;
        try {
            var result = puma.evalPuma("\"use strict\"; var obj = { a : 10 }; with (obj) { a }");
        } catch (err) {
            errorMessage = err.message;
        }
        assert.equal(errorMessage, "Line 1: Strict mode code may not include a with statement");
    });

    QUnit.module("12.11 The Switch Statement");

    test("Switch (Expression) no CaseBlock", function (assert) {
        var result = puma.evalPuma("var a; switch (a) {}");
        result.makeValue();
        assert.equal(result.value, undefined);
    });

    test("Switch (Expression) with CaseBlock", function (assert) {
        var result = puma.evalPuma("var n = 1; switch ('Apples') { case 'Oranges': n = n*2; case 'Apples': n = n*3; case 'Bananas': n = n*6; }");
        result.makeValue();
        assert.equal(result.value, 18);
    });

    test("Switch (Expression) null", function (assert) {
        var result = puma.evalPuma("var n = 2; switch (null) { case undefined: n = n*0; case null: n = n*-1;}");
        result.makeValue();
        assert.equal(result.value, -2);
    });

    test("Switch (Expression) undefined", function (assert) {
        var result = puma.evalPuma("var n = 2; switch (undefined) { case undefined: n = n*0; case null: n = n*-1;}");
        result.makeValue();
        assert.equal(result.value, 0);
    });

    test("Switch (Expression) expr", function (assert) {
        var result = puma.evalPuma("switch (typeof u) { case 'undefined': -1;}");
        result.makeValue();
        assert.equal(result.value, -1);
    });

    test("Switch (Expression) expr 2", function (assert) {
        var result = puma.evalPuma("switch (typeof Math.E) { case 'number': 0;}");
        result.makeValue();
        assert.equal(result.value, 0);
    });

    //BreakStatement visitor not implemented yet
    QUnit.skip("Switch (Expression) case with break", function (assert) {
        var result = puma.evalPuma("var a = 1; switch (a) { case 1: 1; break; case 2: 2; }");
        result.makeValue();
        assert.equal(result.value, 1);
    });

    test("Switch (Expression) case without break", function (assert) {
        var result = puma.evalPuma("var a = 1; var b = 0; switch (a) { case 1: b += 1; case 2: b += 2; } b;");
        result.makeValue();
        assert.equal(result.value, 3);
    });

    test("Switch (Expression) case default", function (assert) {
        var result = puma.evalPuma("var a = 0; switch (a) { case 1: 1; break; default: 2; }");
        result.makeValue();
        assert.equal(result.value, 2);
    });

    test("Switch (Expression) case default no break", function (assert) {
        var result = puma.evalPuma("var a = 4; var b = 0; switch (a) { default: b += 3; case 1: b += 1; case 2: b += 2; } b;");
        result.makeValue();
        assert.equal(result.value, 6);
    });

    test("Switch (Expression) empty case", function (assert) {
        var result = puma.evalPuma("var a = 4; var b = 0; switch (a) { default: case 1: b += 1; case 2: case 3: b += 3; } b;");
        result.makeValue();
        assert.equal(result.value, 4);
    });

    QUnit.module("12.12 Labeled Statements");

    //LabeledStatement visitor not implemented yet
    QUnit.skip("LabelledStatement : Identifier : Statement", function (assert) {
        var result = puma.evalPuma("anIdentifier: for(var i = 0; i < 5 ; i++) { } i;");
        result.makeValue();
        assert.equal(result.value, 5);
    });

    //LabeledStatement visitor not implemented yet
    QUnit.skip("Nested labels with different identifiers", function (assert) {
        var result = puma.evalPuma("anIdentifier: for(var i = 0; i < 5; i++) { anIdentifier2: for (var j = 0; j < 5; j++) {} } i + j;");
        result.makeValue();
        assert.equal(result.value, 10);
    });

    test("Nested labels with the same identifiers", function (assert) {
        var errorMessage;
        try {
            var result = puma.evalPuma("anIdentifier: for(var i = 0; i < 5; i++) { anIdentifier: for (var j = 0; j < 5; j++) {} } i + j;");
        } catch (err) {
            errorMessage = err.message;
        }
        assert.equal(errorMessage, "Line 1: Label 'anIdentifier' has already been declared");
    });

    QUnit.module("12.13 The Throw Statement");

    //ThrowStatement visitor not implemented yet
    QUnit.skip("throw string", function (assert) {
        var errorMessage;
        try {
            var result = puma.evalPuma("throw \"someString\"");
        } catch (err) {
            errorMessage = err.message;
        }
        assert.equal(errorMessage, "someString");
    });

    //ThrowStatement visitor not implemented yet
    QUnit.skip("throw number", function (assert) {
        var errorMessage = null;
        try {
            var result = puma.evalPuma("throw 42");
        } catch (err) {
            errorMessage = err;
        }
        assert.equal(errorMessage, 42);
    });

    //ThrowStatement visitor not implemented yet
    QUnit.skip("throw true", function (assert) {
        var errorMessage;
        try {
            var result = puma.evalPuma("throw true");
        } catch (err) {
            errorMessage = err.message;
        }
        assert.equal(errorMessage, true);
    });

});
