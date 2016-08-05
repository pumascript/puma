// Tests of Section 15. Done by Juan Guzmán [Gh tag]

define(['pumascript', 'esprima'], function(puma, esprima) {

QUnit.skip("15.4.2.1 new Array ( [ item0 [ , item1 [ , ... ] ] ] )",function(){
var result = puma.evalPuma("var a = new Array()");
ok(result.success && typeof a == "object", "Passed!");
});

QUnit.skip("15.4.2.1 new Array ( [ item0 [ , item1 [ , ... ] ] ] )", function(){
var result = puma.evalPuma("var a = new Array ('a','b')");
ok(result.success && a[1] == 'b' && a[0] == 'a' && a.length == 2, "Passed!" );
});    

QUnit.skip("15.4.4.1 Array.prototype.constructor ", function(){
var result = puma.evalPuma("var a = Array.prototype.constructor");
ok(result.success && typeof a == "function" , "Passed!" );
});
    
QUnit.skip("15.4.4.2 Array.prototype.toString ( )", function(){
var result = puma.evalPuma("var a = Array.prototype.toString ( )");
ok(result.success && typeof a == "string" && a.length == 0, "Passed!" );
});    

QUnit.skip("15.4.4.3 Array.prototype.toLocaleString ( )", function(){
var result = puma.evalPuma("var a = Array.prototype.toLocaleString ()");
ok(result.success && typeof a == "string" && a.length == 0, "Passed!" );
});
    
QUnit.skip("15.4.4.4 Array.prototype.concat ( [ item1 [ , item2 [ , … ] ] ] )", function(){
var result = puma.evalPuma("var a = Array.prototype.concat ( 1,2)");
ok(result.success && a[1] == '2' && a[0] == '1' && a.length == 2, "Passed!" );
});
    
QUnit.skip("15.5.4.1 String.prototype.constructor", function(){
var result = puma.evalPuma("var a = String.prototype.constructor");
ok(result.success && typeof a == "function", "Passed!" );
});
    
QUnit.skip("15.5.4.2 String.prototype.toString ( )", function(){
var result = puma.evalPuma("var a = String.prototype.toString ( )");
ok(result.success && typeof a == "string" && a.length == 0, "Passed!" );
});
    
QUnit.skip("15.5.4.3 String.prototype.valueOf ( )", function(){
var result = puma.evalPuma("var a = 'juan'");
ok(result.success && a.valueOf() == 'juan' , "Passed!" );
});
   
QUnit.skip("15.6.2.1 new Boolean (value)", function(){
var result = puma.evalPuma("var a = new Boolean (true)");
ok(result.success && typeof a == "string" && a == true, "Passed!" );
});
    
QUnit.skip("15.6.4.1 Boolean.prototype.constructor", function(){
var result = puma.evalPuma("var a = new Boolean(true)");
ok(result.success && a.constructor == Boolean , "Passed!" );
});

});
