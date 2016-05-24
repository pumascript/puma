11.1 Primary Expressions

11.1.1 The this Keyword
this.document; //PASS

11.1.4 Array Initializer
var x = []; //PASS
var x = [1]; //PASS
var x = [1,2]; //PASS

11.1.5 Object Initializer
var x = {}; //PASS
var x = {property: 'value'}; //PASS
var x = {property : 'value', other_property : 'value'}; //PASS

11.1.6 The Grouping Operator
a + (b * c); //FAIL?
(a + b) * c; //PASS

11.2 Left-Hand-Side Expressions
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
