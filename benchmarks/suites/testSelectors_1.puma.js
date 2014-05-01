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

//Final result example
$(document.getElementById('puma'));