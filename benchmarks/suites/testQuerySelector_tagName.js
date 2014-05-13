/*
* Benchmark Number: 8
* Description: querySelector vs. getElementsByTagName
*/
var benchmark_getElementByTagName = new Benchmark("Benchmark 8", "getElementsByTagName for 1000 nodes");
benchmark_getElementByTagName.prepare = function() {
	for(var i = 0; i<1000; i++) {
		if(Math.random() > 0.5) {
			$("body").append('<img src="data:image/gif;base64,123"/>');
		}
		else {
			$("body").append('<input id="txt" value=""/>');
		}
	}
};
benchmark_getElementByTagName.test = function() {
	var element = [];
	var elements = document.getElementsByTagName("input");
	if(elements.length > 0) {
		element = elements[0];
	}
	elements = document.getElementsByTagName("img");
	if(elements.length > 0) {
		element = elements[0];
	}
};
benchmark_getElementByTagName.clean = function() {
	$("body").children().remove();
};

var benchmark_querySelector = new Benchmark("Benchmark 8", "querySelector (by tagName) for 1000 nodes");
benchmark_querySelector.prepare = benchmark_getElementByTagName.prepare;
benchmark_querySelector.test = function() {
	var elements = document.querySelector("input");
	elements = document.querySelector("img");
};
benchmark_querySelector.clean = benchmark_getElementByTagName.clean;

//Creation of the test suite
var testGetElementByTagName = new Suite("Get element by tag name suite");
testGetElementByTagName.addTest(benchmark_getElementByTagName);
testGetElementByTagName.addTest(benchmark_querySelector);