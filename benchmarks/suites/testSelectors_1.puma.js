//Test for JQuery VS Native
//First Iteration for select by ID

/* @meta */
function $(valueExp){
  console.log(valueExp);
  var regex = /^#/;
  if(regex.test(valueExp.value)){
    return pumaAst(JQuery($valueExp));
  }
  return null;
};

// Tests
$("#puma");
$(".puma");

$(getElementById('puma'));

//Test for JQuery VS Native
//Second Iteration for select by ID

/* @meta */
function $(valueExp){
  console.log(valueExp);
  
  //Regular Expression for ID
  var regex = /(#[a-z]+[_a-z0-9-:\\]*)/ig;
  
  if(regex.test(valueExp.value)){
    //valueExp.value = valueExp.value.substring(1);
    return pumaAst($(document.getElementById($valueExp)));   
  }
  return null;
};

// Tests
$("#puma");
$("#puma .puma");
$(".puma");

$(getElementById('puma'));