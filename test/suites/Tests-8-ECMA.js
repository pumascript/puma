// Copyright (c) 2013 - present UTN-LIS

define(['pumascript', 'esprima'], function(puma, esprima) {

     module("8.1 The Undefined Type");

     test("undefined 1", function(){
         var result = puma.evalPuma("var b = typeof(a);");
         result.makeValue();
         ok(result.success && "undefined" === result.value, "Passed!");
     });

     //It shows that the type of "a" is Object instead of undefined, because "a" is null instead of undefined
     QUnit.skip("undefined 2", function(){
         var result = puma.evalPuma("var a; typeof a");
         result.makeValue();
         ok(result.success && "undefined" === result.value, "Passed!");
     });

     module("8.2 The Null Type");

     test("null", function(){
         var result = puma.evalPuma("var a = null; typeof a");
         result.makeValue();
         ok(result.success && "object" === result.value, "Passed!");
     });

     module("8.3 The Boolean Type");

     test("boolean, true", function(){
         var result = puma.evalPuma("var a = true; typeof a");
         result.makeValue();
         ok(result.success && "boolean" === result.value, "Passed!");
     });

     test("boolean, false", function(){
         var result = puma.evalPuma("var a = false; typeof a");
         result.makeValue();
         ok(result.success && "boolean" === result.value, "Passed!");
     });

     test("boolean, false not equals true", function(){
         var result = puma.evalPuma("var a = true; var b = false; if (a === b) true; else false;");
         result.makeValue();
         ok(result.success && false === result.value, "Passed!");
     });

     test("boolean, not false equals true", function(){
         var result = puma.evalPuma("if (!false === true) true; else false;");
         result.makeValue();
         ok(result.success && true === result.value, "Passed!");
     });

     test("boolean, not true equals false", function(){
         var result = puma.evalPuma("if (!true === false) true; else false;");
         result.makeValue();
         ok(result.success && true === result.value, "Passed!");
     });

     module("8.6.1 Property attributes");

     test("writable ", function(){
         var result = puma.evalPuma("var obj = {}; obj.key = 1; Object.defineProperty(obj, 'key', { writable: false ,}); obj.key = 2; var a = obj.key");
         result.makeValue();
         ok(result.success && 1 === result.value, "Passed!");
     });

     QUnit.skip("configurable", function(){
         try{
         puma.evalPuma("var obj = {}; obj.key = 1; Object.defineProperty(obj, 'key', { configurable: true, writable: false, }); Object.defineProperty(obj, 'key', { configurable: false, }); Object.defineProperty(obj, 'key', { writable: true, });");}
         catch(e) {var result = e.message;}
         ok("Cannot redefine property: key" === result, "Passed!");
     });

});
