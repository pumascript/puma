// Copyright (c) 2013 - present UTN-LIS

/*
* Benchmark Number: 3
* Description : Jquery vs Native Selectors .class and querySelectorAll
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
var test4 = new Benchmark("GetElementByClass", "Test Native querySelectorAll in the same level between 10.000 siblings.", 10000);
test4.prepare = test3.prepare;
test4.test = function() {
  $("body").append('<div class="test' + Math.random()*100 + '"></div>');
  $(document.querySelectorAll(".test"));
};
test4.clean = test3.clean;

//Creation of the test suite
var testSelectors_3 = new Suite("Jquery vs Native Selectors .class querySelectorAll");
testSelectors_3.addTest(test3);
testSelectors_3.addTest(test4);
