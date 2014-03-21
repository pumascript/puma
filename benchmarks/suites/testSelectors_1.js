/*
* Benchmark Number: 1
* Description : Jquery vs Native Selectors #id
*/

// Benchmark 1 Jquery Selector
var test1 = new Benchmark("JquerySelector", "Jquery Selector #ID in the same level between 10.000 siblings");
test1.prepare = function() {
  for(var i=0; i<10000;i++) {
    $("body").append('<div id="test' + Math.random()*100 + '"></div>');
  }
  $("body").append('<div id="test"></div>');
};
test1.test = function() {
  $("#test");
};
test1.clean = function() {
  $("body").children().remove();
};

// Benchmark 2 (note has same preparation and cleaning as test1)
var test2 = new Benchmark("GetElementByID", "Test Native Get element by ID in the same level between 10.000 siblings.");
test2.prepare = test1.prepare;
test2.test = function() {
  $(document.getElementById("test"));
};
test2.clean = test1.clean;

//Creation of the test suite
var testSelectors_1 = new Suite("Jquery vs Native Selectors #ID");
testSelectors_1.addTest(test1);
testSelectors_1.addTest(test2);