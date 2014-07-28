/*
* Benchmark Number: 7
* Description: querySelectorAll vs. getElementsById 
*/
var benchmark_getElementById = new Benchmark("Benchmark 7", "getElementsById for 1000 nodes");
benchmark_getElementById.prepare = function() {
	for(var i = 0; i<1000; i++) {
		if(Math.random() > 0.5) {
			$("body").append('<img src="data:image/gif;base64,123" class="class1" id="image_id"/>');
		}
		else {
			$("body").append('<img src="data:image/gif;base64,123" class="class2" id="image_id2"/>');
		}
	}
};
benchmark_getElementById.test = function() {
	var elements = document.getElementById("image_id");
};
benchmark_getElementById.clean = function() {
	$("body").children().remove();
};

var benchmark_querySelectorAll = new Benchmark("Benchmark 7", "querySelectorAll (by id) for 1000 nodes");
benchmark_querySelectorAll.prepare = benchmark_getElementById.prepare;
benchmark_querySelectorAll.test = function() {
	var elements = document.querySelectorAll("#image_id");
	if(elements.length > 0) {
		var element = elements[0];
	}
};
benchmark_querySelectorAll.clean = benchmark_getElementById.clean;

//Creation of the test suite
var testGetElementsById = new Suite("Get elements by id suite");
testGetElementsById.addTest(benchmark_querySelectorAll);
testGetElementsById.addTest(benchmark_getElementById);
