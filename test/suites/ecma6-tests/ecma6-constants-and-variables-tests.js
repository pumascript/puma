// Copyright (c) 2013 - present UTN-LIS

/* eslint quotes: 0, no-unused-vars: 0 */

/**
    *          PUMASCRIPT ECMA 6 CONSTANTS AND VARIABLES SUITE
    * @file: Ecma6 Constants and variables expressions test suite for the language
*/
var test = QUnit.test;
var skip = QUnit.skip;

define(['pumascript'], function (puma) {
    
    QUnit.module("Ecma6-Constants-And-Variables-Tests");
    
    skip("Constant", function(assert) {
        var result = puma.evalPuma("const PI = 3.141593; PI > 3.0;");
        assert.equal(result.value, true);
    });
    
    skip("Constant principal scope", function(assert) {
        var result = puma.evalPuma("const PI = 3.141593; if(true){const PI = 3.14;} PI === 3.141593;");
        assert.equal(result.value, true);
    });
    
    skip("Constant block scope", function(assert) {
        var result = puma.evalPuma("const PI = 3.141593; if(true){const PI = 3.14; PI === 3.14}");
        assert.equal(result.value, true);
    });
    
    skip("Constant principal scope not defined with block scope constant", function(assert) {
        var result = puma.evalPuma("if(true){const PI = 3.141593;} typeof(PI) === 'undefined';");
        assert.equal(result.value, true);
    });
    
    skip("Change of a property from a constant as an object", function(assert) {
        var result = puma.evalPuma("const p = {first: 'john', last: 'smith'}; p.first = 'bob'; p.first === 'bob';");
        assert.equal(result.value, true);
    });
    
    skip("Variable let", function(assert) {
        var result = puma.evalPuma("let a = 2; a === 2");
        assert.equal(result.value, true);
    });
    
    skip("Variable let principal scope", function(assert) {
        var result = puma.evalPuma("let a = 2; if(true){let a = 3;} a === 2;");
        assert.equal(result.value, true);
    });
    
    skip("Variable let block scope", function(assert) {
        var result = puma.evalPuma("let a = 2; if(true){let a = 3; a === 3}");
        assert.equal(result.value, true);
    });
    
    skip("Variable let principal scope not defined with block scope constant", function(assert) {
        var result = puma.evalPuma("if(true){let a = 3;} typeof(a) === 'undefined';");
        assert.equal(result.value, true);
    });
    
});