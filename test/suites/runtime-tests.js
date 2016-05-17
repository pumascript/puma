/*global define, test, ok, equal */

/*
 *          PUMASCRIPT RUNTIME TEST SUITE
 *  @file: Runtime specific functionality tests
 */
define(['pumascript', 'esprima'], function(puma, esprima) {

    test("Meta Function testing 1", function(){
        var result = puma.evalPuma("/*@meta*/ function funcion(){}; function foo() {}; funcion;");
        equal( result.success, true, "Passed!");
        equal( result.value._value.isMeta, true, "Passed!");
    });

    test("Meta Function testing 2", function(){
        var result = puma.evalPuma("/*@meta*/ function funcion(){}; function foo() {}; foo;");
        equal( result.success, true, "Passed!");
        equal( result.value._value.isMeta, false, "Passed!");
    });

    test("Meta Function in function expressions", function(){
        var result = puma.evalPuma("var f1 = /*@meta*/function(){}; f1;");
        equal( result.success, true, "Passed!");
        equal( result.value._value.isMeta, true, "Passed!");
    });

    test("Meta Function evalPumaAst intrinsic function", function(){
        var result = puma.evalPuma("var result; /*@meta*/function sum(a, b){result = evalPumaAst(a).value + evalPumaAst(b).value;return null;}sum(4,5);result;");
        equal( result.success, true, "Passed!");
        equal( result.value.value, 9, "Passed!");
    });

    test("Basic Meta Function that rewrite itself", function(){
        var result = puma.evalPuma("/*@meta*/ function sumar(a,b){ return "+
        '{"type":"BinaryExpression","operator":"+","left": a,"right":b };' +
                                   " } sumar(5, 6);");
        result = puma.evalPumaAst(result.pumaAst);
        equal( result.success, true, "Passed!");
        equal( result.value, 11, "Passed!");
    });

    test("Basic Meta Function that returns null do not rewrite itself", function(){
        var result = puma.evalPuma("/*@meta*/ function sumar(a,b){ return null; } sumar(5, 6);");
        equal( result.success, true, "Passed!");
        equal( result.value, null, "Passed!");
        equal( result.pumaAst.body[0].expression.callee.name, 'sumar', "Passed!");
    });

    test("Call AST Construction Function", function(){
        var result = puma.evalPuma("pumaAst('hola');");
        equal( result.success, true, "Passed!");
        equal( result.value.value, 'hola', "Passed!");
    });

    test("Call AST Construction Function - trivial id replace", function(){
        var result = puma.evalPuma("var id = { type: 'Identifier', id:'bla' }; pumaAst($id);");
        equal( result.success, true, "Passed!");
        equal( result.value.id, 'bla', "Passed!");
    });

    test("Basic Meta Function that rewrite itself using pumaAst", function(){
        var result = puma.evalPuma("/*@meta*/ function sumar(a,b){ return pumaAst(6 + 5); } sumar(5, 6);");
        result = puma.evalPumaAst(result.pumaAst);
        equal( result.success, true, "Passed!");
        equal( result.value, 11, "Passed!");
    });

    test("Basic Meta Function that rewrite itself using pumaAst and parameters", function(){
        var result = puma.evalPuma("/*@meta*/ function sumar(a,b){ return pumaAst( $a +  $b); } sumar(5, 6);");
        result = puma.evalPumaAst(result.pumaAst);
        equal( result.success, true, "Passed!");
        equal( result.value, 11, "Passed!");
    });

    test("Puma Find by Type", function(){
        var ast = esprima.parse("1 + 2; 5+4; a = 2;");
        var result = puma.pumaFindByType(ast, "BinaryExpression");

        equal( result.length, 2, "Passed!");
    });

    test("Puma Find by Properties", function(){
        var ast = esprima.parse("1 + 2; 5+4; a = 2;");
        var result = puma.pumaFindByProperty(ast, "expression.left.name", "a");

        equal( result.length, 1, "Passed!");
    });

    test("Puma Find by Properties with custom comparator", function(){
        var ast = esprima.parse("a = 2; b = 3; cc = 1;");
        var result = puma.pumaFindByProperty(ast, "left.name", 1, function (value1, value2) { 
            return value1.length === value2; 
        });

        equal( result.length, 2, "Passed!");
    });

    test("Basic Meta Function that rewrite itself using pumaAst and parameters 2", function(){
        var result = puma.evalPuma("/*@meta*/ function sumar(a,b){ var ast = pumaAst( $a +  $b); return ast; } sumar(5, 6);");
        result = puma.evalPumaAst(result.pumaAst);
        equal( result.success, true, "Passed!");
        equal( result.value, 11, "Passed!");
    });
 
    test("Meta function merge evaluation", function(){
        var result = puma.evalPuma("/*@meta*/ function parseInt (valueExp) {var ast = pumaAst($valueExp | 0);return ast;}var n1 = parseInt('97');n1 + 2;");
        equal( result.value, 99, "Passed!");
    });

    test("check that pumaFindByProperty ends", function(){
        var result = puma.evalPuma("var puma = require('pumascript'); /* @meta */ function findInnerHTML(){ var final = puma.pumaFindByProperty(puma.pumaFindByType(pumaProgram, 'AssignmentExpression'), 'left.property.name', 'innerHTML'); final[0].right.name = 'pepe'; return null;} function test1(){ divVacio.innerHTML = textoHtml;} findInnerHTML(); true;");
        result.makeValue();
        equal( result.value, true, "Passed!");
    });

    test("test prune phase",function(){
        var result = puma.evalPuma("/*@meta*/ function parseInt (valueExp) {var ast = pumaAst($valueExp | 0);return ast;}var n1 = parseInt('97');n1 + 2;");
        var metaNodeCount = 0;
        for (var i = 0; i < result.pumaAst.body.length; i++) {
            if(result.pumaAst.body[i].isMeta){
                metaNodeCount++;
            }
        }
        equal(metaNodeCount,0,"Passed!");
    });
});
