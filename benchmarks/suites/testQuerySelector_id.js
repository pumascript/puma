/*
* Benchmark Number: 8
* Description: querySelector vs. getElementById 
*/
var benchmark_getElementById = new Benchmark("Benchmark 8", "getElementById for 1000 nodes");
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
	elements = document.getElementById("image_id2");
};
benchmark_getElementById.clean = function() {
	$("body").children().remove();
};

var benchmark_querySelector = new Benchmark("Benchmark 8", "querySelector (by id) for 1000 nodes");
benchmark_querySelector.prepare = benchmark_getElementById.prepare;
benchmark_querySelector.test = function() {
	var elements = document.querySelector("#image_id");
	elements = document.querySelector("#image_id2");
};
benchmark_querySelector.clean = benchmark_getElementById.clean;

//Creation of the test suite
var testGetElementById = new Suite("Get element by id suite");
testGetElementById.addTest(benchmark_getElementById);
testGetElementById.addTest(benchmark_querySelector);