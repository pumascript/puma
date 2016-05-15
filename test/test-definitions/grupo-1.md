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

7.2 White Space
---

ECMA dice que debería soportar todos los caracteres de espacio de UNICODE 3.0

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
var var1 = 'a\uFEFFb ';
//Result:
var var1 = 'a\uFEFFb ';
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