// Copyright (c) 2013 - present UTN-LIS

/*
* Benchmark Number: 1
* Description : attr.(Checked) vs Native .checked
*/

// Benchmark 1
var test1 = new Benchmark("Checked", "Jquery Attr Checked");

test1.prepare = function() {
  $("body").append('<input type="checkbox" value="y" name="my-test-checkbox" id="my-test-checkbox" checked>');
};
test1.test = function() {
  $("#my-test-checkbox").attr("checked");
};
test1.clean = function() {
  $("body").children().remove();
};

// Benchmark 2
var test2 = new Benchmark("Native checked", "Test Native .");
test2.prepare = test1.prepare;

test2.test = function() {
  $("#my-test-checkbox")[0].checked;
};
test2.clean = test1.clean;

//Creation of the test suite
var testChecked = new Suite("Checked Attr");
testChecked.addTest(test1);
testChecked.addTest(test2);
