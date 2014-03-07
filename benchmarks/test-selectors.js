// TestSuite
var Suite = function Suite(name){
  this._suiteName = name;
  this._tests = [];
}

Suite.prototype.addTest = function(test) {
  this._tests.push(test);
};

Suite.prototype.run = function(test) {
    console.log("Running Test" + test.name);
    var start = Date.now();
    for(var j=0; j<test.runs;j++) {
      test.test();
    }
    var end = Date.now(); 
    var result = end - start;
    var ops = Math.round(test.runs / (result/1000));
    console.log("Result in miliseconds: " + result );
    console.log("Operations per second: " + ops );   
};

Suite.prototype.execute = function() {
  var test = {};
  for(var i=0; i<this._tests.length; i++){
    test = this._tests[i];
    test.prepare();
    this.run(test);
    test.clean();
  }
};

//BenchMark Object
var Benchmark = function Benchmark(name, description, runs) {
  this.name = name;
  this.description = description;
  if(runs === undefined) this.runs = 100000;
  else this.runs = runs;
};
Benchmark.prototype.prepare = {};
Benchmark.prototype.test = {};
Benchmark.prototype.clean = {};

// Benchmark 1
var test1 = new Benchmark("JquerySelector", "test1");
test1.prepare = function() {
  for(var i=0; i<10000;i++) {
    $("body").append('<div id="test' + Math.random() + '"></div>');
  }
  $("body").append('<div id="test"></div>');
};

test1.test = function() {
  $("#test");
};

test1.clean = function() {
  $("body").children().remove();
};

// Benchmark 1
var test2 = new Benchmark("GetElementByID", "test2");

test2.prepare = function() {
  for(var i=0; i<10000;i++) {
    $("body").append('<div id="test' + Math.random() + '"></div>');
  }
  $("body").append('<div id="test"></div>');
};

test2.test = function() {
  $(document.getElementById("test"));
};

test2.clean = function() {
  $("body").children().remove();
};

//create suite and fill the tests
var suite1 = new Suite("suite1");
suite1.addTest(test1);
suite1.addTest(test2);