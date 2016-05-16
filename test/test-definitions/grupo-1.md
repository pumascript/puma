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
//Result:
a = b / c
~~~

ok

***

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

7.6.1.2 Future Reserved Words
---

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

Falta probar la mitad de las FutureReservedWords, son

7.7 Punctuators
---

7.8 Literalls
---

