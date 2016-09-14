#Expressions

##11.1 Primary Expressions

11.1.1 The this Keyword
this.document; //PASS

11.1.2 Identifier Reference
11.1.3 Literal Reference

11.1.4 Array Initializer
var x = []; //PASS
var x = [1]; //PASS
var x = [1,2]; //PASS
var x = [,]; //PASS

11.1.5 Object Initializer
var x = {}; //PASS
var x = {property: 'value'}; //PASS
var x = {property : 'value', other_property : 'value'}; //PASS

11.1.6 The Grouping Operator
a + (b * c); //FAIL?
(a + b) * c; //PASS

##11.2 Left-Hand-Side Expressions

11.2.1 Property Accessors
//------
var object = {};
object['1'] = 'value';
console.log(object[1]);
//------PASS
document.createElement('pre'); //PASS

11.2.2 The new operator
//------
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
var mycar = new Car("Eagle", "Talon TSi", 1993);
//------PASS

11.2.3 Function Calls
//------
var square = function(number) { return number * number };
var x = square(4) // x gets the value 16
//------ PASS

11.2.4 Argument Lists

11.2.5 Function Expressions

##11.3 Postfix Expressions.

11.3.1 Increment.

var x = 0;
x++;    //PASS

11.3.2 Decrement.

var x = 0;
x--;    //PASS

##11.4 Unary Operators.

11.4.1 Delete Operator

var x = {};
x.propiedad = 'unString';
delete x.propiedad; //PASS

11.4.2 Void Operator

var x = {};
x.prop = 1;
void x.prop; //PASS

11.4.3 TypeOf Operator.

typeof true; //PASS

11.4.4 Prefix Increment Operator

var x=0;
++x; //PASS

11.4.5 Prefix Decrement Operator

var x=1;
--x; //PASS

11.4.6 Unary + Operator

var x='1';
+x; //PASS

11.4.7 Unary - Operator

var x='0';
-x; //PASS

var x='-0';
-x; //PASS

11.4.8 Bitwise NOT Operator ( ~ )

var x= 0;
~x; //PASS

11.4.9 Logical NOT Operator ( ! )

var x= false;
!x; /PASS

##11.5 Multiplicative Operators and 11.6 Additive Operators.

2 * 2 / 2 + 2 - 2 % 2; //PASS

##11.7 Bitwise Shift Operators.

11.7.1 The Left Shift Operator ( << )

var x = 8;
var y = 2;
x << y; //PASS

11.7.2 The Signed Right Shift Operator ( >> )

var x = 8;
var y = 2;
x >>y; //PASS

11.7.3 The Unsigned Right Shift Operator ( >>> )

var x = 8;
var y = 2;
x >>> y;

##11.8 Relational Operators.

0 < 1; //PASS
0 > 1; //PASS
0 <= 1; //PASS
0 >= 1; //PASS
var x={}; //PASS
x instanceof Object; //PASS
1 in [0,1]; //PASS

##11.9 Equality Operators.

0 == 0; //PASS
0 != 1; //PASS
0 === 0; //PASS
0 !== 1; //PASS

##11.10 Binary Bitwise Operators.

0 & 1;  //PASS
0 ^ 1   //PASS
0 | 1;  //PASS

##11.11 Binary Logical Operators.

0 && 1; //PASS
0 || 1; //PASS

##11.12 Conditional Operators.

LogicalORExpression ? AssignmentExpression : AssignmentExpression

##11.13 Assignment Operators.

11.13.1 Simple Assigment

var x = 10, y = 2; //PASS

x *= y; //PASS
x /= y; //PASS
x %= y; //PASS
x += y; //PASS
x -= y; //PASS
x <<= y;//PASS
x >>= y;//PASS
x >>>=y;//PASS
x &= y; //PASS
x ^= y; //PASS
x |= y; //PASS

11.13.2 Compound Assigment

var x = 1; x *= 1; //PASS
var x = 1; x /= 1; //PASS
var x = 1; x %= 1; //PASS
var x = 1; x += 1; //PASS
var x = 1; x -= 1; //PASS
var x = 1; x <<= 1; //PASS
var x = 1; x >>= 1; //PASS
var x = 1; x >>>= 1; //PASS
var x = 1; x &= 1; //PASS
var x = 1; x ^= 1; //PASS
var x = 1; x |= 1; //PASS

##11.14 Comma Operators.

a = b = 3, c = 4; //PASS
