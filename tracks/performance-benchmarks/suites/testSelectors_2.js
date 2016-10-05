// Copyright (c) 2013 - present UTN-LIS

/*
* Benchmark Number: 2
* Description : Jquery vs Native Selectors .class
*/

// Benchmark 1 Jquery Selector
var test3 = new Benchmark("JquerySelector2", "Jquery Selector .class in the same level between 10.000 siblings", 10000);
test3.prepare = function() {
  $("body").append('<div class="test"></div>');
};
test3.test = function() {
  $("body").append('<div class="test' + Math.random()*100 + '"></div>');
  $(".test");
};
test3.clean = function() {
  $("body").children().remove();
};

// Benchmark 2 (note has same preparation and cleaning as test3)
var test4 = new Benchmark("GetElementByClass", "Test Native getElementByClassName in the same level between 10.000 siblings.", 10000);
test4.prepare = test3.prepare;
test4.test = function() {
  $("body").append('<div class="test' + Math.random()*100 + '"></div>');
  $(document.getElementsByClassName("test"));
};
test4.clean = test3.clean;

//Creation of the test suite
var testSelectors_2 = new Suite("Jquery vs Native Selectors .class");
testSelectors_2.addTest(test3);
testSelectors_2.addTest(test4);
