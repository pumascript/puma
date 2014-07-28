/*
* Benchmark Number: 7
* Description: querySelectorAll vs. getElementsByTagName
*/
var benchmark_getElementByTagName = new Benchmark("Benchmark 7", "getElementsByTagName for 1000 nodes");
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
	var elements = document.getElementsByTagName("input");
};
benchmark_getElementByTagName.clean = function() {
	$("body").children().remove();
};

var benchmark_querySelectorAll = new Benchmark("Benchmark 7", "querySelectorAll (by tagName) for 1000 nodes");
benchmark_querySelectorAll.prepare = benchmark_getElementByTagName.prepare;
benchmark_querySelectorAll.test = function() {
	var elements = document.querySelectorAll("input");
};
benchmark_querySelectorAll.clean = benchmark_getElementByTagName.clean;

//Creation of the test suite
var testGetElementsByTagName = new Suite("Get elements by tag name suite");
testGetElementsByTagName.addTest(benchmark_querySelectorAll);
testGetElementsByTagName.addTest(benchmark_getElementByTagName);