// Copyright (c) 2013 - present UTN-LIS

/*
* Benchmark Number: 2
* Description : parseInt vs Math.floor vs bitwise
*/


var testParseInt = new Benchmark("parseInt vs Math.floor", "ParseInt for 4000 numbers");
var numbers = new Array();
testParseInt.prepare = function() {
  var i = 0;
  for(i; i<1000; i++) {
    numbers[i] = Math.random();
  }
  for(i; i<2000; i++) {
    numbers[i] = Math.random() * 100;
  }
  for(i; i<3000; i++) {
    numbers[i] = Math.random() * -1;
  }
  for(i; i<4000; i++) {
    numbers[i] = Math.random() * -100;
  }
};
testParseInt.test = function() {
  for(var i=0; i< numbers.length; i++) {
	parseInt(numbers[i]);
  }
};
testParseInt.clean = function() {
  //numbers = new Array();
};

var testMathFloor = new Benchmark("parseInt vs Math.floor vs Bitwise", "Math.floor for 4000 numbers");
//testMathFloor.prepare = testParseInt.prepare;
testMathFloor.prepare = function() {

}
testMathFloor.test = function() {
  for(var i=0; i< numbers.length; i++) {
	Math.floor(numbers[i]);
  }
};
testMathFloor.clean = testParseInt.clean;

var testBitwise = new Benchmark("parseInt vs Math.floor vs Bitwise", "Bitwise for 4000 numbers");
//testBitwise.prepare = testParseInt.prepare;
testBitwise.prepare = function() {

}
testBitwise.test = function() {
  for(var i=0; i< numbers.length; i++) {
	numbers[i] | 0;
  }
};
testBitwise.clean = testParseInt.clean;

//Creation of the test suite
var testParseNumber = new Suite("parseInt vs Math.floor vs Bitwise");
testParseNumber.addTest(testParseInt);
//testParseNumber.addTest(testMathFloor);
testParseNumber.addTest(testBitwise);
