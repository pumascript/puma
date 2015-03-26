/*
* Benchmark Number: 8
* Description: querySelector vs. getElementsByClassName[0]
*/
var benchmark_getElementByClassName = new Benchmark("Benchmark 8", "getElementsByClassName for 1000 nodes");
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
	var element = [];
	var elements = document.getElementsByClassName("class1");
	if(elements.length > 0) {
		element = elements[0];
	}
	elements = document.getElementsByClassName("class2");
	if(elements.length > 0) {
		element = elements[0];
	}
};
benchmark_getElementByClassName.clean = function() {
	$("body").children().remove();
};

var benchmark_querySelector = new Benchmark("Benchmark 8", "querySelector (by className) for 1000 nodes");
benchmark_querySelector.prepare = benchmark_getElementByClassName.prepare;
benchmark_querySelector.test = function() {
	var elements = document.querySelector(".class1");
	elements = document.querySelector(".class2");
};
benchmark_querySelector.clean = benchmark_getElementByClassName.clean;

//Creation of the test suite
var testGetElementByClassName = new Suite("Get element by class name suite");
testGetElementByClassName.addTest(benchmark_getElementByClassName);
testGetElementByClassName.addTest(benchmark_querySelector);