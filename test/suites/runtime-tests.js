// Copyright (c) 2013 - present UTN-LIS

/* eslint quotes: 0, no-unused-vars: 0 */

/**
 *      PUMASCRIPT RUNTIME TEST SUITE
 * @file: Runtime specific functionality tests
 */
define(['pumascript', 'esprima'], function (puma, esprima) {

    QUnit.module("Runtime-Tests");

    test("Meta Function testing 1", function (assert) {
        var result = puma.evalPuma("/*@meta*/ function funcion(){}; function foo() {}; funcion;");
        assert.equal(result.success, true);
        assert.equal(result.value._value.isMeta, true);
    });

    test("Meta Function testing 2", function (assert) {
        var result = puma.evalPuma("/*@meta*/ function funcion(){}; function foo() {}; foo;");
        assert.equal(result.success, true);
        assert.equal(result.value._value.isMeta, false);
    });

    test("Meta Function in function expressions", function (assert) {
        var result = puma.evalPuma("var f1 = /*@meta*/function(){}; f1;");
        assert.equal(result.success, true);
        assert.equal(result.value._value.isMeta, true);
    });

    test("Meta Function evalPumaAst intrinsic function", function (assert) {
        var result = puma.evalPuma("var result; /*@meta*/function sum(a, b){result = evalPumaAst(a).value + evalPumaAst(b).value;return null;}sum(4,5);result;");
        assert.equal(result.success, true);
        assert.equal(result.value.value, 9);
    });

    test("Basic Meta Function that rewrite itself", function (assert) {
        var result = puma.evalPuma("/*@meta*/ function sumar(a,b){ return " +
            '{"type":"BinaryExpression","operator":"+","left": a,"right":b };' +
            " } sumar(5, 6);");
        result = puma.evalPumaAst(result.pumaAst);
        assert.equal(result.success, true);
        assert.equal(result.value, 11);
    });

    test("Basic Meta Function that returns null do not rewrite itself", function (assert) {
        var result = puma.evalPuma("/*@meta*/ function sumar(a,b){ return null; } sumar(5, 6);");
        assert.equal(result.success, true);
        assert.equal(result.value, null);
        assert.equal(result.pumaAst.body[0].expression.callee.name, 'sumar');
    });

    test("Call AST Construction Function", function (assert) {
        var result = puma.evalPuma("pumaAst('hola');");
        assert.equal(result.success, true);
        assert.equal(result.value.value, 'hola');
    });

    test("Call AST Construction Function - trivial id replace", function (assert) {
        var result = puma.evalPuma("var id = { type: 'Identifier', id:'bla' }; pumaAst($id);");
        assert.equal(result.success, true);
        assert.equal(result.value.id, 'bla');
    });

    test("Basic Meta Function that rewrite itself using pumaAst", function (assert) {
        var result = puma.evalPuma("/*@meta*/ function sumar(a,b){ return pumaAst(6 + 5); } sumar(5, 6);");
        result = puma.evalPumaAst(result.pumaAst);
        assert.equal(result.success, true);
        assert.equal(result.value, 11);
    });

    test("Basic Meta Function that rewrite itself using pumaAst and parameters", function (assert) {
        var result = puma.evalPuma("/*@meta*/ function sumar(a,b){ return pumaAst( $a +  $b); } sumar(5, 6);");
        result = puma.evalPumaAst(result.pumaAst);
        assert.equal(result.success, true);
        assert.equal(result.value, 11);
    });

    test("Puma Find by Type", function (assert) {
        var ast = esprima.parse("1 + 2; 5+4; a = 2;");
        var result = puma.pumaFindByType(ast, "BinaryExpression");

        assert.equal(result.length, 2);
    });

    test("Puma Find by Properties", function (assert) {
        var ast = esprima.parse("1 + 2; 5+4; a = 2;");
        var result = puma.pumaFindByProperty(ast, "expression.left.name", "a");

        assert.equal(result.length, 1);
    });

    test("Puma Find by Properties with custom comparator", function (assert) {
        var ast = esprima.parse("a = 2; b = 3; cc = 1;");
        var result = puma.pumaFindByProperty(ast, "left.name", 1, function (value1, value2) {
            return value1.length === value2;
        });

        assert.equal(result.length, 2);
    });

    test("Basic Meta Function that rewrite itself using pumaAst and parameters 2", function (assert) {
        var result = puma.evalPuma("/*@meta*/ function sumar(a,b){ var ast = pumaAst( $a +  $b); return ast; } sumar(5, 6);");
        result = puma.evalPumaAst(result.pumaAst);
        assert.equal(result.success, true);
        assert.equal(result.value, 11);
    });

    test("Meta function merge evaluation", function (assert) {
        var result = puma.evalPuma("/*@meta*/ function parseInt (valueExp) {var ast = pumaAst($valueExp | 0);return ast;}var n1 = parseInt('97');n1 + 2;");
        assert.equal(result.value, 99);
    });

    test("check that pumaFindByProperty ends", function (assert) {
        var result = puma.evalPuma("var puma = require('pumascript'); /* @meta */ function findInnerHTML(){ var final = puma.pumaFindByProperty(puma.pumaFindByType(pumaProgram, 'AssignmentExpression'), 'left.property.name', 'innerHTML'); final[0].right.name = 'pepe'; return null;} function test1(){ divVacio.innerHTML = textoHtml;} findInnerHTML(); true;");
        result.makeValue();
        assert.equal(result.value, true);
    });

    test("test prune phase", function (assert) {
        var result = puma.evalPuma("/*@meta*/ function parseInt (valueExp) {var ast = pumaAst($valueExp | 0);return ast;}var n1 = parseInt('97');n1 + 2;");
        var metaNodeCount = 0;
        for (var i = 0; i < result.pumaAst.body.length; i++) {
            if (result.pumaAst.body[i].isMeta) {
                metaNodeCount++;
            }
        }
        assert.equal(metaNodeCount, 0);
    });
});
