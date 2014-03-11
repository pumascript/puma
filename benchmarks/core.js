// TestSuite
var Suite = function Suite(name){
  this._suiteName = name;
  this._tests = [];
  this._titleShown = false;
}

Suite.prototype.addTest = function(test) {
  this._tests.push(test);
};

Suite.prototype.run = function(test) {   
    var start = Date.now();
    for(var j=0; j<test.runs;j++) {
      test.test();
    }
    var end = Date.now(); 
    var result = end - start;
    var ops = Math.round(test.runs / (result/1000));
    this.prettyResults(test, result, ops);
};

Suite.prototype.prettyResults = function (test, result, operationsSecond) {
  if(this._titleShown === false){
    console.log('++++++++++ Suite : ' + this._suiteName + '++++++++++');
    this._titleShown = true;
  }
  console.log('========== Running Test: ' + test.name + ' ==========');
  console.log('Description: ' + test.description);
  console.log('Runs(times): '  + test.runs);
  console.log('Result(miliseconds): '  + result );
  console.log('Operations per second: '  + operationsSecond );
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
  
  // If nothing is defined runs 100.000 times
  if(runs === undefined) this.runs = 100000;
  else this.runs = runs;
};

// Define custom exposed method implemented by instances
Benchmark.prototype.prepare = {};
Benchmark.prototype.test = {};
Benchmark.prototype.clean = {};
