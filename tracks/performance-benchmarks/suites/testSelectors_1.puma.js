//Test for JQuery VS Native

/* @meta */
function $(valueExp){
  //Regular Expression for ID
  var regex = /^#\b[a-zA-Z0-9_]+\b$/;
  
  if(regex.test(valueExp.value)){
    valueExp.value = valueExp.value.substring(1);
    return pumaAst($(document.getElementById($valueExp)));   
  }
  return null;
};

// Tests
$("#puma"); //to rewrite
$("#puma .puma"); //multiple selectors
$(".puma");//class selector
$("body"); //tag selector

//Context evaluation
var name = "puma";
$("#" + name); 

//Final result example
$(document.getElementById('puma'));


//Test for JQuery VS Native with force rewrite

//Define global variable to re-write code     
var PUMA_FORCE_REWRITE = true;

/* @meta */
function $(valueExp){
  //Regular Expression for ID
  var regex = /^#\b[a-zA-Z0-9_]+\b$/;
  var copy = {};
  var ast = {};
  
  //Evaluation if not a literal
  if(valueExp !== "Literal"){
    copy = evalPumaAst(valueExp).value;   
  }
  
  if(regex.test(copy) && PUMA_FORCE_REWRITE){
    return pumaAst($(document.getElementById($valueExp)));
  }
  else if(regex.test(valueExp.value)){
    valueExp.value = valueExp.value.substring(1);
    return pumaAst($(document.getElementById($valueExp)));   
  } 
  return null;
};

// Tests

//Add a class in runtime so it does not need to re-write
var t = " .pepe";

//Context evaluation
var a = function() {
  var name = "puma";
  $("#" + name + t); 
}();

//Re-write because it returns a string
var j = "ma";

//Context evaluation
var b = function() {
  var name = "pu";
  $("#" + name + j); 
}();
