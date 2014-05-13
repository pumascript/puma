/*
* Benchmark Number: 7
* Description: querySelectorAll vs. getElementsByClassName 
*/
var benchmark_getElementByClassName = new Benchmark("Benchmark 7", "getElementsByClassName for 1000 nodes");
benchmark_getElementByClassName.prepare = function() {
	for(var i = 0; i<1000; i++) {
		if(Math.random() > 0.5) {
			$("body").append('<img src="data:image/gif;base64,123" class="class1"/>');
		}
		else {
			$("body").append('<img src="data:image/gif;base64,123" class="class2"/>');
		}
	}
};
benchmark_getElementByClassName.test = function() {
	var elements = document.getElementsByClassName("class1");
	elements = document.getElementsByClassName("class2");
};
benchmark_getElementByClassName.clean = function() {
	$("body").children().remove();
};

var benchmark_querySelectorAll = new Benchmark("Benchmark 7", "querySelectorAll (by className) for 1000 nodes");
benchmark_querySelectorAll.prepare = benchmark_getElementByClassName.prepare;
benchmark_querySelectorAll.test = function() {
	var elements = document.querySelectorAll(".class1");
	elements = document.querySelectorAll(".class2");
};
benchmark_querySelectorAll.clean = benchmark_getElementByClassName.clean;

//Creation of the test suite
var testGetElementsByClassName = new Suite("Get elements by class name suite");
testGetElementsByClassName.addTest(benchmark_getElementByClassName);
testGetElementsByClassName.addTest(benchmark_querySelectorAll);