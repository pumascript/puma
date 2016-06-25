 define(['pumascript', 'esprima'], function(puma, esprima) {
     
     test("7.2 White space- White spaces between every thing", function(){
         var result = puma.evalPuma("var a = 1 ;");
         result.makeValue();
         ok(result.success && 1 === result.value, "Passed!");
     });
     
     test("7.2 White space- Tab between every thing", function(){
         var result = puma.evalPuma("var a   =   1   ;");
         result.makeValue();
         ok(result.success && 1 === result.value, "Passed!");
     });

     test("7.2 White space- UTF spaces aceptation 1", function(){
         var result = puma.evalPuma("var a= \"a\u0009b\"");
         result.makeValue();
         ok(result.success && "a\tb" === result.value, "Passed!");
     });
     
     test("7.2 White space- UTF spaces aceptation 2", function(){
         var result = puma.evalPuma("var a= \"a\u00A0b\"");
         result.makeValue();
         ok(result.success && "a\xA0b" === result.value, "Passed!");
     });
     
     test("7.2 White space- UTF spaces aceptation 3", function(){
         var result = puma.evalPuma("var a= \"a\u000Bb\"");
         result.makeValue();
         ok(result.success && "a\x0Bb" === result.value, "Passed!");
     });
     
     test("7.2 White space- UTF spaces aceptation 4", function(){
         var result = puma.evalPuma("var a= \"a\u000Cb\"");
         result.makeValue();
         ok(result.success && "a\fb" === result.value, "Passed!");
     });
     
     
     test("7.2 White space- UTF spaces aceptation 5", function(){
         var result = puma.evalPuma("var a= \"a\u2000b\"");
         result.makeValue();
         ok(result.success && "a\u2000b" === result.value, "Passed!");
     });
     
     test("7.2 White space- UTF spaces aceptation 6", function(){
         var result = puma.evalPuma("var a= \"a\u2001b\"");
         result.makeValue();
         ok(result.success && "a\u2001b" === result.value, "Passed!");
     });
     
     test("7.2 White space- UTF spaces aceptation 7", function(){
         var result = puma.evalPuma("var a= \"a\u2002b\"");
         result.makeValue();
         ok(result.success && "a\u2002b" === result.value, "Passed!");
     });
     
     test("7.2 White space- UTF spaces aceptation 8", function(){
         var result = puma.evalPuma("var a= \"a\u2003b\"");
         result.makeValue();
         ok(result.success && "a\u2003b" === result.value, "Passed!");
     });
     
     test("7.2 White space- UTF spaces aceptation 9", function(){
         var result = puma.evalPuma("var a= \"a\u2004b\"");
         result.makeValue();
         ok(result.success && "a\u2004b" === result.value, "Passed!");
     });
     
     test("7.2 White space- UTF spaces aceptation 10", function(){
         var result = puma.evalPuma("var a= \"a\u2005b\"");
         result.makeValue();
         ok(result.success && "a\u2005b" === result.value, "Passed!");
     });
     
     test("7.2 White space- UTF spaces aceptation 11", function(){
         var result = puma.evalPuma("var a= \"a\u2006b\"");
         result.makeValue();
         ok(result.success && "a\u2006b" === result.value, "Passed!");
     });
     
     test("7.2 White space- UTF spaces aceptation 12", function(){
         var result = puma.evalPuma("var a= \"a\u2007b\"");
         result.makeValue();
         ok(result.success && "a\u2007b" === result.value, "Passed!");
     });
     
     test("7.2 White space- UTF spaces aceptation 13", function(){
         var result = puma.evalPuma("var a= \"a\u2008b\"");
         result.makeValue();
         ok(result.success && "a\u2008b" === result.value, "Passed!");
     });
     
     test("7.2 White space- UTF spaces aceptation 14", function(){
         var result = puma.evalPuma("var a= \"a\u2009b\"");
         result.makeValue();
         ok(result.success && "a\u2009b" === result.value, "Passed!");
     });
     
     test("7.2 White space- UTF spaces aceptation 15", function(){
         var result = puma.evalPuma("var a= \"a\u200Ab\"");
         result.makeValue();
         ok(result.success && "a\u200Ab" === result.value, "Passed!");
     });
     
     test("7.2 White space- UTF spaces aceptation 16", function(){
         var result = puma.evalPuma("var a= \"a\u1680b\"");
         result.makeValue();
         ok(result.success && "a\u1680b" === result.value, "Passed!");
     });
     
     test("7.2 White space- UTF spaces aceptation 17", function(){
         var result = puma.evalPuma("var a= \"a\u180Eb\"");
         result.makeValue();
         ok(result.success && "a\u180Eb" === result.value, "Passed!");
     });
     
     test("7.2 White space- UTF spaces aceptation 18", function(){
         var result = puma.evalPuma("var a= \"a\u202Fb\"");
         result.makeValue();
         ok(result.success && "a\u202Fb" === result.value, "Passed!");
     });
     
     test("7.2 White space- UTF spaces aceptation 19", function(){
         var result = puma.evalPuma("var a= \"a\u205Fb\"");
         result.makeValue();
         ok(result.success && "a\u205Fb" === result.value, "Passed!");
     });
     
     test("7.2 White space- UTF spaces aceptation 20", function(){
         var result = puma.evalPuma("var a= \"a\u3000b\"");
         result.makeValue();
         ok(result.success && "a\u3000b" === result.value, "Passed!");
     });
     
     test("7.6 Identifier names and identifiers 1", function(){
         var result = puma.evalPuma("var $a$b$ = 1;");
         result.makeValue();
         ok(result.success && 1 === result.value, "Passed!");
     });
     
     test("7.6 Identifier names and identifiers 2", function(){
         var result = puma.evalPuma("var _a_b_ = 1;");
         result.makeValue();
         ok(result.success && 1 === result.value, "Passed!");
     });
     
     //Future reserved words works unless used with "use strict"
     test("7.6.1 Future reserved words 1", function(){
         var result = puma.evalPuma("var implements = 1;");
         result.makeValue();
         ok(result.success && 1 === result.value, "Passed!");
     });
     
     test("7.6.1 Future reserved words 1", function(){
         var result = puma.evalPuma("var private = 1;");
         result.makeValue();
         ok(result.success && 1 === result.value, "Passed!");
     });
     
     test("7.6.1 Future reserved words 1", function(){
         var result = puma.evalPuma("var public = 1;");
         result.makeValue();
         ok(result.success && 1 === result.value, "Passed!");
     });
     
     test("7.6.1 Future reserved words 1", function(){
         var result = puma.evalPuma("var interface = 1;");
         result.makeValue();
         ok(result.success && 1 === result.value, "Passed!");
     });
     
     test("7.6.1 Future reserved words 1", function(){
         var result = puma.evalPuma("var package = 1;");
         result.makeValue();
         ok(result.success && 1 === result.value, "Passed!");
     });
     
     test("7.6.1 Future reserved words 1", function(){
         var result = puma.evalPuma("var protected = 1;");
         result.makeValue();
         ok(result.success && 1 === result.value, "Passed!");
     });
     
     test("7.6.1 Future reserved words 1", function(){
         var result = puma.evalPuma("var static = 1;");
         result.makeValue();
         ok(result.success && 1 === result.value, "Passed!");
     });
     
     /*
     //This tests fail. Uncaught Error: Unexpected token
     test("7.6.1 Future reserved words 1", function(){
         var result = puma.evalPuma("var yield = 1;");
         result.makeValue();
         ok(result.success && 1 === result.value, "Passed!");
     });
     
     test("7.6.1 Future reserved words 1", function(){
         var result = puma.evalPuma("var let = 1;");
         result.makeValue();
         ok(result.success && 1 === result.value, "Passed!");
     });
     */
     
     test("7.8.3 Numeric Literals: hex numbers: 0", function(){
         var result = puma.evalPuma("var a = false; if (0x0 === 0) a = true;");
         result.makeValue();
         ok(result.success && true === result.value, "Passed!");
     });
     
     test("7.8.3 Numeric Literals: hex numbers: 1", function(){
         var result = puma.evalPuma("var a = false; if (0x1 === 1) a = true;");
         result.makeValue();
         ok(result.success && true === result.value, "Passed!");
     });
     
     test("7.8.3 Numeric Literals: hex numbers: 2", function(){
         var result = puma.evalPuma("var a = false; if (0x2 === 2) a = true;");
         result.makeValue();
         ok(result.success && true === result.value, "Passed!");
     });
     
     test("7.8.3 Numeric Literals: hex numbers: 3", function(){
         var result = puma.evalPuma("var a = false; if (0x3 === 3) a = true;");
         result.makeValue();
         ok(result.success && true === result.value, "Passed!");
     });
     
     test("7.8.3 Numeric Literals: hex numbers: 4", function(){
         var result = puma.evalPuma("var a = false; if (0x4 === 4) a = true;");
         result.makeValue();
         ok(result.success && true === result.value, "Passed!");
     });
     
     test("7.8.3 Numeric Literals: hex numbers: 5", function(){
         var result = puma.evalPuma("var a = false; if (0x5 === 5) a = true;");
         result.makeValue();
         ok(result.success && true === result.value, "Passed!");
     });
     
     test("7.8.3 Numeric Literals: hex numbers: 6", function(){
         var result = puma.evalPuma("var a = false; if (0x6 === 6) a = true;");
         result.makeValue();
         ok(result.success && true === result.value, "Passed!");
     });
     
     test("7.8.3 Numeric Literals: hex numbers: 7", function(){
         var result = puma.evalPuma("var a = false; if (0x7 === 7) a = true;");
         result.makeValue();
         ok(result.success && true === result.value, "Passed!");
     });
     
     test("7.8.3 Numeric Literals: hex numbers: 8", function(){
         var result = puma.evalPuma("var a = false; if (0x8 === 8) a = true;");
         result.makeValue();
         ok(result.success && true === result.value, "Passed!");
     });
     
     test("7.8.3 Numeric Literals: hex numbers: 9", function(){
         var result = puma.evalPuma("var a = false; if (0x9 === 9) a = true;");
         result.makeValue();
         ok(result.success && true === result.value, "Passed!");
     });
     
     test("7.8.3 Numeric Literals: hex numbers: A", function(){
         var result = puma.evalPuma("var a = false; if (0xA === 10) a = true;");
         result.makeValue();
         ok(result.success && true === result.value, "Passed!");
     });
     
     test("7.8.3 Numeric Literals: hex numbers: B", function(){
         var result = puma.evalPuma("var a = false; if (0xB === 11) a = true;");
         result.makeValue();
         ok(result.success && true === result.value, "Passed!");
     });
     
     test("7.8.3 Numeric Literals: hex numbers: C", function(){
         var result = puma.evalPuma("var a = false; if (0xC === 12) a = true;");
         result.makeValue();
         ok(result.success && true === result.value, "Passed!");
     });
     
     test("7.8.3 Numeric Literals: hex numbers: D", function(){
         var result = puma.evalPuma("var a = false; if (0xD === 13) a = true;");
         result.makeValue();
         ok(result.success && true === result.value, "Passed!");
     });
     
     test("7.8.3 Numeric Literals: hex numbers: E", function(){
         var result = puma.evalPuma("var a = false; if (0xE === 14) a = true;");
         result.makeValue();
         ok(result.success && true === result.value, "Passed!");
     });
     
     test("7.8.3 Numeric Literals: hex numbers: F", function(){
         var result = puma.evalPuma("var a = false; if (0xF === 15) a = true;");
         result.makeValue();
         ok(result.success && true === result.value, "Passed!");
     });
     
     test("7.9 Automatic Semicolon Insertion 1", function(){
         var result = puma.evalPuma("var \n x");
         ok(result.success, "Passed!");
     });
     
     test("7.9 Automatic Semicolon Insertion 2", function(){
         var result = puma.evalPuma("{1 \n 2 } 3");
         ok(result.success, "Passed!");
     });
     
     test("7.9 Automatic Semicolon Insertion 3", function(){
         var result = puma.evalPuma("var x \n = 1");
         result.makeValue();
         ok(result.success && 1 === result.value, "Passed!");
     });
     
     test("7.9 Automatic Semicolon Insertion 4", function(){
         var result = puma.evalPuma("var x = \n 1");
         result.makeValue();
         ok(result.success && 1 === result.value, "Passed!");
     });
     
     test("7.9 Automatic Semicolon Insertion 5", function(){
         var result = puma.evalPuma("var x \n x = 1");
         result.makeValue();
         ok(result.success && 1 === result.value, "Passed!");
     });
     
     test("7.9 Automatic Semicolon Insertion 6", function(){
         var result = puma.evalPuma("var a = 1; var b = 1; a \n ++ \n b");
         result.makeValue();
         ok(result.success && 2 === result.value, "Passed!");
     });
     
});
