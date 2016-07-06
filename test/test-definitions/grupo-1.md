7 Lexical Conventions
===

~~~
var a;
var b;
var c;
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
var var1="a\u0009b ";
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

esto no se puede testear

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

Esto ya estaba en los tests

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

~~~
"use strict"
var a = 0124;
Error: Octal literals are not allowed in strict mode.
~~~

ok

### 7.8.4 String Literals ###

~~~
var abc = "\";
Uncaught Error: Line 1: Unexpected token ILLEGAL
~~~

ok

~~~
"use strict"
var a = "\0124";
Error: Octal literals are not allowed in strict mode.
~~~

ok

### 7.8.5: RegEx literals ###

~~~
var re1 = /(?:)/;
var re2 = //;
Error: Line 2: Unexpected end of input
~~~

ok


7.9 Automatic Semicolon Insertion
---

~~~
{ 1 2 } 3
//Error: Unexpected number
~~~

ok

~~~
{ 1
2 } 3
~~~

ok

~~~
var
x
~~~

ok

~~~
var x
= 1
~~~

ok

~~~
var x =
1
~~~

ok

~~~
var x
x = 1
~~~

ok

~~~
for (a
b ; a++)
Error: Line 2: Unexpected identifier
~~~

ok

~~~
for (a; b
a++)
//Error: Line 2: Unexpected identifier
~~~

ok

~~~
var func = function(){return
                    1+1}
console.log(func);
//muestra undefined por consola
~~~

NO SE QUE ONDA

~~~
var a=1;
var b=1;
a
++
b
console.log(a, b)
//1 2
~~~

ok

~~~
if (a > b)
else c = d
//Error: Unexpected token else
~~~

ok

~~~
a = b + c
(d + e).print()
~~~

NO SE

~~~
var text="";
list1: {
  list2: {
    text += 1;
    break
    list1;
    text += 2;
  }
  text +=3;
}
console.log(text)
//Uncaught SyntaxError: Illegal break statement
~~~

ok

~~~
var text="";
list1: {
  list2: {
    text += "a";
    break list2;
    text += "b";
  }
  text += "c";
}
console.log(text);
//no muestra nada console.log()
~~~

not ok

8 Types
===

8.1 The Undefined Type
---

~~~
console.log(a);
//muestra que el valor de a = undefined
~~~

ok

8.2 The Null Type
---

~~~
var a;
console.log(a);
//deberia ser undefined pero es null
~~~

not ok

~~~
var a = null;
~~~

ok

8.3 The Boolean Type
---

~~~
var x = true;
var y = false;
~~~

ok

8.4 The Number Type
---

~~~
var a= 1.797693134862315807e+308;
if (a < Infinity)
  console.log("ok");
var b= 1.797693134862315808e+308;
if (b === Infinity)
  console.log("ok");
~~~

ok

8.6 The Object Type
---

### 8.6.1 Property Attributes ###

~~~
var obj = {};
obj.key = 1;
Object.defineProperty(obj, 'key', {
  writable: false,
});
obj.key = 2;
console.log(Object.getOwnPropertyDescriptor(obj, 'key'));
//muestra value: '1'
~~~

ok

~~~
var obj = {};
obj.key = 1;
Object.defineProperty(obj, 'key', {
  configurable: true,
  writable: false,
});
Object.defineProperty(obj, 'key', {
  writable: true,
});
~~~

ok

~~~
var obj = {};
obj.key = 1;
Object.defineProperty(obj, 'key', {
  configurable: false,
  writable: false,
});
Object.defineProperty(obj, 'key', {
  writable: true,
});
Error: Cannot redefine property: key
~~~

ok

### 8.6.2 Object Internal Properties and Methods ###

8.7 The Reference Specification Type
---

~~~
console.log(a);
//deberia mostrar ReferenceError: a is not defined; pero muestra a=undefined
~~~

not ok

otras cosas
---

convierte las variables undefined a null

~~~
var a;
var b = typeof(a);
console.log(a);
console.log(b);
//null y object. Object está bien porque null es de tipo object
~~~

las labels no andan

~~~
console.log(1);
label1: {console.log(2);}
console.log(3);
//13. Ignora el label
~~~

no funcionan break ni continue

~~~
var cero = 0;
for(var i = 0; i<10; i++)
{
  cero++;
  if (i === 5)
  {
    //console.log("estoy pasando por aca");
    break;
  }
  if (i > 5)
  {
    //console.log("estoy por continuar");
    continue;
  }
  cero--
}
console.log(i);
console.log(cero);
//10 y 0
~~~

eval() no anda, siempre devuelve undefined

~~~
var a = eval(var b = 1;);
console.log(a);
//undefined
~~~

no funciona la parte catch y finally de un try catch

~~~
try {
    adddlert("Welcome guest!");
}
catch(err) {
    var a = err.message
}
finally {
		console.log("aaa");
}
console.log(a);
~~~

no se cual es el error acá pero esto no funciona y en javascript si

~~~
var hoy=new Date();
console.log(hoy);
//Uncaught TypeError: Object prototype may only be an Object or null: undefined
~~~

~~~
try {
    var a= eval("var break=1;"); 
} catch (e) {
    if (e instanceof SyntaxError) {
      	console.log(e.message);
    }
}
console.log(a);
~~~

~~~
test("TEST 1", function(){
        try {
            puma.evalPuma("var break=1;"); 
        }
        catch (e) {
            var result = e.message;
  		}
        ok( result === "Unexpected token break", "Passed!");
    });
~~~

faltan test de reserverd words Y de 8