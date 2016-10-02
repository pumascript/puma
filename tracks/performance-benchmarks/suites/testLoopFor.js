// Copyright (c) 2013 - present UTN-LIS

/*
* Benchmark Number: 1
* Description : Test loop For
*/

// Benchmark 1
var test1 = new Benchmark("For in elements", "Check for in an array of elements");

var array;

test1.prepare = function() {
 array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
};
test1.test = function() {
  var i;
  for(i in array){
    array[i] +=1;
  }
};
test1.clean = function() {
  array = [];
};

// Benchmark 2
var test2 = new Benchmark("For initialized with elements.lenght", "Common for function initalized with elements");
test2.prepare = test1.prepare;

test2.test = function() {
  for(var i=0; i< array.length; i++){
    array[i] +=1;
  }
};
test2.clean = test1.clean;

//Creation of the test suite
var testLoopFor = new Suite("testLoopFor");
testLoopFor.addTest(test1);
testLoopFor.addTest(test2);
