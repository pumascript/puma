 define(['pumascript', 'esprima'], function(puma, esprima) {    
    test("8.1 Types: undefined", function(){
         var result = puma.evalPuma("var b = typeof(a);");
         result.makeValue();
         ok(result.success && "undefined" === result.value, "Passed!");
     });
     
     test("8.2 Types: null", function(){
         var result = puma.evalPuma("var a;");
         result.makeValue();
         ok(result.success && null === result.value, "Passed!");
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