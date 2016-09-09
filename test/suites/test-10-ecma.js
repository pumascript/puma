define(['pumascript', 'esprima'], function(puma, esprima) {
//section 10.1	
  test("Use Strict global code", function () {
    var result = puma.evalPuma("\'use strict\';var a = 1;
var b = 3;
console.log(a+b);");
    ok(result.success && '4' === result.value, "Pass!");
  });
  test("use strict function code", function () {
    var result = puma.evalPuma("function strict(){'use strict';function nested(){return ' function';}return 'strict mode into'+nested();} strict();");
		result.makeValue();    
    ok(result.success && 'strict mode into function' === result.value, "Pass!");
  });
  
  QUnit.skip("Use strict eval code. Break puma compiler", function(){
  	var result = puma.evalPuma( "var expresion = new String('2 + 2');
		eval('\'use strict\'; expresion.toString()');"	);
  	ok(result.success && "2 + 2" === result.value, "Pass!");
  });
/*section 10.2
  test("with function", function(){
  	var result = puma.evalPuma( "var a, x, y;
var r = 10;
with (Math) {
   a = PI * r * r;
   x = r * cos(PI);
   y = r * sin(PI/2);
console.info(y);
}" );
  	ok(result.success && "" === result.value, "Pass!");
  });*/
 });