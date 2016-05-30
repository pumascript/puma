7 Lexical Conventions
===

a esto no lo entendí tanto y está incompleto...

~~~javaScript
var a=1;
var b=2;
var c=3;
a = b / c;
~~~

ok


~~~
a = b
/c;
~~~

ok


7.1 Unicode Format-Control Characters
---

~~~
var var1 = 'a\u200Cb ';
~~~

ok

~~~
var var1 = 'a\u200Db ';
~~~

ok

~~~
var var1 = 'a\uFEFFb ';
~~~

ok

7.2 White Space
---

~~~
var var1    =   "a  b"  ;
//todos los espacios son TAB
~~~

ok

~~~
var var1 = "a b" ;
//todos los espacios son espacios normales. <SP>
~~~

ok

~~~
var var1="a \u0009 b ";
//result:
var var1="a \t b ";
~~~

ok

~~~
var var1="a\u0020b ";
//Result:
var var1="a b ";
~~~

ok

~~~
var var1="a\u00A0b ";
//Result:
var var1 = 'a\xA0b ';
~~~

ok

~~~
var var1= "a\u2000b";
~~~

ok

~~~
var var1= "a\u2001b";
~~~

ok

~~~
var var1= "a\u2002b";
~~~

ok

~~~
var var1= "a\u2003b";
~~~

ok

~~~
var var1= "a\u2004b";
~~~

ok

~~~
var var1= "a\u2005b";
~~~

ok

~~~
var var1= "a\u2006b";
~~~

ok

~~~
var var1= "a\u2007b";
~~~

ok

~~~
var var1= "a\u2008b";
~~~

ok

~~~
var var1= "a\u2009b";
~~~

ok

~~~
var var1= "a\u200Ab";
~~~

ok

~~~
var var1="a\u000Bb ";
//Result:
var var1 = 'a\x0Bb ';
~~~

ok

~~~
var var1="a\u000Cb ";
//Result:
var var1 = 'a\fb ';
~~~

ok

~~~
var var1= "a\u1680b";
~~~

ok

~~~
var var1= "a\u180Eb";
~~~

ok

~~~
var var1= "a\u202Fb";
~~~

ok

~~~
var var1= "a\u205Fb";
~~~

ok

~~~
var var1= "a\u3000b";
~~~

ok

7.3 Line Terminators
---

~~~
var a = "\u000A";
~~~

ok

~~~
var a = "\u000D";
~~~

ok

~~~
var a = "\u2028";
~~~

ok

~~~
var a = "\u2029";
~~~

ok

7.4 Comments
---

~~~
// comentario
var a=1;
~~~

ok

~~~
/*
comentario
*/
var a=1;
~~~

ok

~~~
/*
/*
comentario
*/
*/
var a=1;
//Uncaught Error: Line 5: Unexpected token *
~~~

ok

7.5 Tokens
---

no hay nada que testear en esta seccion

7.6 Identifier Names and Identifiers
---

~~~
var $a$b$ = 1;
~~~

ok

~~~
var _a_b_ = 1;
~~~

ok

7.6.1 Reserved Words
---

~~~
var break= 1;
~~~

ok

~~~
var do= 1;
~~~

ok

~~~
var instanceof= 1;
~~~

ok

~~~
var typeof= 1;
~~~

ok

~~~
var case= 1;
~~~

ok

~~~
var else= 1;
~~~

ok

~~~
var new= 1;
~~~

ok

~~~
var var= 1;
~~~

ok

~~~
var catch= 1;
~~~

ok

~~~
var finally= 1;
~~~

ok

~~~
var return= 1;
~~~

ok

~~~
var void= 1;
~~~

ok

~~~
var continue= 1;
~~~

ok

~~~
var for= 1;
~~~

ok

~~~
var switch= 1;
~~~

ok

~~~
var while= 1;
~~~

ok

~~~
var debugger= 1;
~~~

ok

~~~
var function= 1;
~~~

ok

~~~
var this= 1;
~~~

ok

~~~
var with= 1;
~~~

ok

~~~
var default= 1;
~~~

ok

~~~
var if= 1;
~~~

ok

~~~
var throw= 1;
~~~

ok

~~~
var delete= 1;
~~~

ok

~~~
var in= 1;
~~~

ok

~~~
var try= 1;
~~~

ok

### 7.6.1.2 Future Reserved Words ###

~~~
var class= 1;
~~~

ok

~~~
var enum= 1;
~~~

ok

~~~
var extends= 1;
~~~

ok

~~~
var super= 1;
~~~

ok

~~~
var const= 1;
~~~

ok

~~~
var export= 1;
~~~

ok

~~~
var import= 1;
~~~

ok

~~~
"use strict"
var implements= 1;
~~~

ok

~~~
"use strict"
var let= 1;
~~~

ok

~~~
"use strict"
var private= 1;
~~~

ok

~~~
"use strict"
var public= 1;
~~~

ok

~~~
"use strict"
var yield= 1;
~~~

ok

~~~
"use strict"
var interface= 1;
~~~

ok

~~~
"use strict"
var package= 1;
~~~

ok

~~~
"use strict"
var protected= 1;
~~~

ok

~~~
"use strict"
var static= 1;
~~~

ok

~~~
var implements= 1;
var private= 1;
var public= 1;
var interface= 1;
var package= 1;
var protected= 1;
var static= 1;
~~~

ok

~~~
var yield= 1;
~~~

not ok

~~~
var let= 1;
~~~

not ok

7.7 Punctuators
---

aca no hay nada para testear

7.8 Literalls
---

### 7.8.3 Numeric Literals ###

~~~
var 3in= 1;
~~~

ok

~~~
if (0x1 !== 1)
	console.log("ok");
~~~

ok

~~~
if (0x2 !== 2)
	console.log("ok");
~~~

ok

~~~
if (0x3 !== 3)
	console.log("ok");
~~~

ok

~~~
if (0x4 !== 4)
	console.log("ok");
~~~

ok

~~~
if (0x5 !== 5)
	console.log("ok");
~~~

ok

~~~
if (0x6 !== 6)
	console.log("ok");
~~~

ok

~~~
if (0x7 !== 7)
	console.log("ok");
~~~

ok

~~~
if (0x8 !== 8)
	console.log("ok");
~~~

ok

~~~
if (0x9 !== 9)
	console.log("ok");
~~~

ok

~~~
if (0xa !== 10)
	console.log("ok");
~~~

ok

~~~
if (0xb !== 11)
	console.log("ok");
~~~

ok

~~~
if (0xc !== 12)
	console.log("ok");
~~~

ok

~~~
if (0xd !== 13)
	console.log("ok");
~~~

ok

~~~
if (0xe !== 14)
	console.log("ok");
~~~

ok

~~~
if (0xf !== 15)
	console.log("ok");
~~~

ok

~~~
if (0xA !== 10)
	console.log("ok");
~~~

ok

~~~
if (0xB !== 11)
	console.log("ok");
~~~

ok

~~~
if (0xC !== 12)
	console.log("ok");
~~~

ok

~~~
if (0xD !== 13)
	console.log("ok");
~~~

ok

~~~
if (0xE !== 14)
	console.log("ok");
~~~

ok

~~~
if (0xF !== 15)
	console.log("ok");
~~~

ok


7.9 Automatic Semicolon Insertion
---

