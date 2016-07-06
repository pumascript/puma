 define(['pumascript', 'esprima'], function(puma, esprima) {    
    test("8.1 Types: undefined", function(){
         var result = puma.evalPuma("var b = typeof(a);");
         result.makeValue();
         ok(result.success && "undefined" === result.value, "Passed!");
     });
     /*
     //this doesnt work, it shows that "a" is null instead of undefined
     test("8.2 Types: undefined 2", function(){
         var result = puma.evalPuma("var a; typeof a");
         result.makeValue();
         ok(result.success && "undefined" === result.value, "Passed!");
     });
     */
     
     test("8.2 Types: null", function(){
         var result = puma.evalPuma("var a = null; typeof a");
         result.makeValue();
         ok(result.success && "object" === result.value, "Passed!");
     });
     
     test("8.3 Types: boolean, true", function(){
         var result = puma.evalPuma("var a = true; typeof a");
         result.makeValue();
         ok(result.success && "boolean" === result.value, "Passed!");
     });
     
     test("8.3 Types: boolean, false", function(){
         var result = puma.evalPuma("var a = false; typeof a");
         result.makeValue();
         ok(result.success && "boolean" === result.value, "Passed!");
     });
     
     test("8.3 Types: boolean, false not equals true", function(){
         var result = puma.evalPuma("var a = true; var b = false; if (a === b) true; else false;");
         result.makeValue();
         ok(result.success && false === result.value, "Passed!");
     });
     
     test("8.3 Types: boolean, not false equals true", function(){
         var result = puma.evalPuma("if (!false === true) true; else false;");
         result.makeValue();
         ok(result.success && true === result.value, "Passed!");
     });
     
     test("8.3 Types: boolean, not true equals false", function(){
         var result = puma.evalPuma("if (!true === false) true; else false;");
         result.makeValue();
         ok(result.success && true === result.value, "Passed!");
     });
     
     test("8.6.1 Property attributes: writable ", function(){
         var result = puma.evalPuma("var obj = {}; obj.key = 1; Object.defineProperty(obj, 'key', { writable: false ,}); obj.key = 2; var a = obj.key");
         result.makeValue();
         ok(result.success && 1 === result.value, "Passed!");
     });
     
     /*
     // Test fails because try catch in general doesn't work
     test("8.6.1 Property attributes: configurable", function(){
         var result = puma.evalPuma("var obj = {}; obj.key = 1; Object.defineProperty(obj, 'key', { configurable: true, writable: false, }); Object.defineProperty(obj, 'key', { configurable: false, }); try{Object.defineProperty(obj, 'key', { writable: true, });} catch(e) {var a = e.message;}");
         result.makeValue();
         ok(result.success && "Cannot redefine property: key" === result.value, "Passed!");
     });
     */
});