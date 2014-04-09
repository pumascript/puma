/*
* Benchmark Engine Rules for Developers
*   1-Define the tests Suites to run using the filename of the javascript 
*   in the suites array in runAllEnabledTestSuites() method in the form {"name" : testSelectors_1}.
*   2-The name of the suite inside the file must be the same as the name of the file.
*   3-Include the JavaScript file in the benchmark.html head.
*/

function runAllEnabledTestSuites(){  

  var suites = [ 
                //{"name" : testSelectors_1}, 
                //{"name" : testSelectors_2},
                //{"name" : testSelectors_3},
                //{"name" : testChecked},
                  {"name" : testParseNumber}                
               ];

  for(var i=0; i<suites.length; i++) {
    //Run the enabled suites
    suites[i].name.execute();
  }
};