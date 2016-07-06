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
     
     test("7.6.1 Reserved Words: break", function(){
        try {
            puma.evalPuma("var break=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok( result === "Line 1: Unexpected token break", "Passed!");
     });
     
     test("7.6.1 Reserved Words: do", function(){
        try {
            puma.evalPuma("var do=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok( result === "Line 1: Unexpected token do", "Passed!");
     });
     
     test("7.6.1 Reserved Words: instanceof", function(){
        try {
            puma.evalPuma("var instanceof=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok( result === "Line 1: Unexpected token instanceof", "Passed!");
     });
     
     test("7.6.1 Reserved Words: typeof", function(){
        try {
            puma.evalPuma("var typeof=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok( result === "Line 1: Unexpected token typeof", "Passed!");
     });
     
     test("7.6.1 Reserved Words: case", function(){
        try {
            puma.evalPuma("var case=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok( result === "Line 1: Unexpected token case", "Passed!");
     });
     
     test("7.6.1 Reserved Words: else", function(){
        try {
            puma.evalPuma("var else=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok( result === "Line 1: Unexpected token else", "Passed!");
     });
     
     test("7.6.1 Reserved Words: new", function(){
        try {
            puma.evalPuma("var new=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok( result === "Line 1: Unexpected token new", "Passed!");
     });
     
     test("7.6.1 Reserved Words: var", function(){
        try {
            puma.evalPuma("var var=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok( result === "Line 1: Unexpected token var", "Passed!");
     });
     
     test("7.6.1 Reserved Words: catch", function(){
        try {
            puma.evalPuma("var catch=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok( result === "Line 1: Unexpected token catch", "Passed!");
     });
     
     test("7.6.1 Reserved Words: finally", function(){
        try {
            puma.evalPuma("var finally=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok( result === "Line 1: Unexpected token finally", "Passed!");
     });
     
     test("7.6.1 Reserved Words: return", function(){
        try {
            puma.evalPuma("var return=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok( result === "Line 1: Unexpected token return", "Passed!");
     });
     
     test("7.6.1 Reserved Words: void", function(){
        try {
            puma.evalPuma("var void=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok( result === "Line 1: Unexpected token void", "Passed!");
     });
     
     test("7.6.1 Reserved Words: continue", function(){
        try {
            puma.evalPuma("var continue=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok( result === "Line 1: Unexpected token continue", "Passed!");
     });
     
     test("7.6.1 Reserved Words: for", function(){
        try {
            puma.evalPuma("var for=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok( result === "Line 1: Unexpected token for", "Passed!");
     });
     
     test("7.6.1 Reserved Words: switch", function(){
        try {
            puma.evalPuma("var switch=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok( result === "Line 1: Unexpected token switch", "Passed!");
     });
     
     test("7.6.1 Reserved Words: while", function(){
        try {
            puma.evalPuma("var while=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok( result === "Line 1: Unexpected token while", "Passed!");
     });
     
     test("7.6.1 Reserved Words: debugger", function(){
        try {
            puma.evalPuma("var debugger=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok( result === "Line 1: Unexpected token debugger", "Passed!");
     });
     
     test("7.6.1 Reserved Words: function", function(){
        try {
            puma.evalPuma("var function=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok( result === "Line 1: Unexpected token function", "Passed!");
     });
     
     test("7.6.1 Reserved Words: this", function(){
        try {
            puma.evalPuma("var this=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok( result === "Line 1: Unexpected token this", "Passed!");
     });
     
     test("7.6.1 Reserved Words: with", function(){
        try {
            puma.evalPuma("var with=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok( result === "Line 1: Unexpected token with", "Passed!");
     });
     
     test("7.6.1 Reserved Words: default", function(){
        try {
            puma.evalPuma("var default=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok( result === "Line 1: Unexpected token default", "Passed!");
     });
     
     test("7.6.1 Reserved Words: if", function(){
        try {
            puma.evalPuma("var if=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok( result === "Line 1: Unexpected token if", "Passed!");
     });
     
     test("7.6.1 Reserved Words: throw", function(){
        try {
            puma.evalPuma("var throw=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok( result === "Line 1: Unexpected token throw", "Passed!");
     });
     
     test("7.6.1 Reserved Words: delete", function(){
        try {
            puma.evalPuma("var delete=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok( result === "Line 1: Unexpected token delete", "Passed!");
     });
     
     test("7.6.1 Reserved Words: in", function(){
        try {
            puma.evalPuma("var in=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok( result === "Line 1: Unexpected token in", "Passed!");
     });
     
     test("7.6.1 Reserved Words: try", function(){
        try {
            puma.evalPuma("var try=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok( result === "Line 1: Unexpected token try", "Passed!");
     });
     
     test("7.6.1.2 Future reserved words: class", function(){
        try {
            puma.evalPuma("var class=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok( result === "Line 1: Unexpected reserved word", "Passed!");
     });
     
     test("7.6.1.2 Future reserved words: enum", function(){
        try {
            puma.evalPuma("var enum=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok( result === "Line 1: Unexpected reserved word", "Passed!");
     });
     
     test("7.6.1.2 Future reserved words, without use strict: extends", function(){
        try {
            puma.evalPuma("var extends=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok( result === "Line 1: Unexpected reserved word", "Passed!");
     });
     
     test("7.6.1.2 Future reserved words: super", function(){
        try {
            puma.evalPuma("var super=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok( result === "Line 1: Unexpected reserved word", "Passed!");
     });
     
     /*
     //throws Unexpected token const
     test("7.6.1.2 Future reserved words: const", function(){
        try {
            puma.evalPuma("var const=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok( result === "Line 1: Unexpected reserved word", "Passed!");
     });
     */
     
     test("7.6.1.2 Future reserved words: export", function(){
        try {
            puma.evalPuma("var export=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok( result === "Line 1: Unexpected reserved word", "Passed!");
     });
     
     test("7.6.1.2 Future reserved words: import", function(){
        try {
            puma.evalPuma("var import=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok( result === "Line 1: Unexpected reserved word", "Passed!");
     });
     
     //The next future reserved words must work unless used with "use strict"
     test("7.6.1.2 Future reserved words, with use strict: implements", function(){
        try {
            puma.evalPuma("\"use strict\" \n var implements=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok(result === "Line 2: Use of future reserved word in strict mode", "Passed!");
     });
     
     test("7.6.1.2 Future reserved words, without use strict: implements", function(){
         var result = puma.evalPuma("var implements = 1;");
         result.makeValue();
         ok(result.success && 1 === result.value, "Passed!");
     });
     
     test("7.6.1.2 Future reserved words, with use strict: private", function(){
        try {
            puma.evalPuma("\"use strict\" \n var private=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok(result === "Line 2: Use of future reserved word in strict mode", "Passed!");
     });
     
     test("7.6.1.2 Future reserved words, without use strict: private", function(){
         var result = puma.evalPuma("var private = 1;");
         result.makeValue();
         ok(result.success && 1 === result.value, "Passed!");
     });
     
     test("7.6.1.2 Future reserved words, with use strict: public", function(){
        try {
            puma.evalPuma("\"use strict\" \n var public=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok(result === "Line 2: Use of future reserved word in strict mode", "Passed!");
     });
     
     test("7.6.1.2 Future reserved words, without use strict: public", function(){
         var result = puma.evalPuma("var public = 1;");
         result.makeValue();
         ok(result.success && 1 === result.value, "Passed!");
     });
     
     test("7.6.1.2 Future reserved words, with use strict: interface", function(){
        try {
            puma.evalPuma("\"use strict\" \n var interface=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok(result === "Line 2: Use of future reserved word in strict mode", "Passed!");
     });
     
     test("7.6.1.2 Future reserved words, without use strict: interface", function(){
         var result = puma.evalPuma("var interface = 1;");
         result.makeValue();
         ok(result.success && 1 === result.value, "Passed!");
     });
     
     test("7.6.1.2 Future reserved words, with use strict: package", function(){
        try {
            puma.evalPuma("\"use strict\" \n var package=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok(result === "Line 2: Use of future reserved word in strict mode", "Passed!");
     });
     
     test("7.6.1.2 Future reserved words, without use strict: package", function(){
         var result = puma.evalPuma("var package = 1;");
         result.makeValue();
         ok(result.success && 1 === result.value, "Passed!");
     });
     
     test("7.6.1.2 Future reserved words, with use strict: protected", function(){
        try {
            puma.evalPuma("\"use strict\" \n var protected=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok(result === "Line 2: Use of future reserved word in strict mode", "Passed!");
     });
     
     test("7.6.1.2 Future reserved words, without use strict: protected", function(){
         var result = puma.evalPuma("var protected = 1;");
         result.makeValue();
         ok(result.success && 1 === result.value, "Passed!");
     });
     
     test("7.6.1.2 Future reserved words, with use strict: static", function(){
        try {
            puma.evalPuma("\"use strict\" \n var static=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok(result === "Line 2: Use of future reserved word in strict mode", "Passed!");
     });
     
     test("7.6.1.2 Future reserved words, without use strict: static", function(){
         var result = puma.evalPuma("var static = 1;");
         result.makeValue();
         ok(result.success && 1 === result.value, "Passed!");
     });
     
     
     test("7.6.1.2 Future reserved words, with use strict: yield", function(){
        try {
            puma.evalPuma("\"use strict\" \n var yield=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok(result === "Line 2: Use of future reserved word in strict mode", "Passed!");
     });
     /*
     //This tests fail. Uncaught Error: Unexpected token
     test("7.6.1.2 Future reserved words, without use strict: yield", function(){
         var result = puma.evalPuma("var yield = 1;");
         result.makeValue();
         ok(result.success && 1 === result.value, "Passed!");
     });
     */
     
     test("7.6.1.2 Future reserved words, with use strict: let", function(){
        try {
            puma.evalPuma("\"use strict\" \n var let=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok(result === "Line 2: Use of future reserved word in strict mode", "Passed!");
     });
     
     /*
     test("7.6.1.2 Future reserved words, without use strict: let", function(){
         var result = puma.evalPuma("var let = 1;");
         result.makeValue();
         ok(result.success && 1 === result.value, "Passed!");
     });
     */
     
     test("7.8.2 Boolean Literals: true", function(){
         var result = puma.evalPuma("var a = Boolean(true);");
         result.makeValue();
         ok(result.success && true === result.value, "Passed!");
     });
     
      test("7.8.2 Boolean Literals: false", function(){
         var result = puma.evalPuma("var a = Boolean(false);");
         result.makeValue();
         ok(result.success && false === result.value, "Passed!");
     });
     
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
