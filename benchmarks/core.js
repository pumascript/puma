// TestSuite
var Suite = function Suite(name){
  this._suiteName = name;
  this._tests = [];
  this._titleShown = false;
  this._result = [];
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
    this.print('++++++++++ Suite : ' + this._suiteName + '++++++++++');
    this._titleShown = true;
  }
  this.print('========== Running Test: ' + test.name + ' ==========');
  this.print('Description: ' + test.description);
  this.print('Runs(times): '  + test.runs);
  this.print('Result(miliseconds): '  + result );
  this.print('Operations per second: '  + operationsSecond );
};

Suite.prototype.print = function (str) {
  var line = $('<p class="result">'+ str + '</p>');
  this._result.push(line);
  console.log(str);
};

Suite.prototype.printInDOM = function () {
  var body = $('body');
  for(var i=0; i<this._result.length; i++) {
    body.append(this._result[i]);
  }  
};

Suite.prototype.execute = function() {
  var test = {};
  for(var i=0; i<this._tests.length; i++){
    test = this._tests[i];
    test.prepare();
    this.run(test);
    test.clean();
  }
  this.printInDOM();
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
