// Copyright (c) 2013 - present UTN-LIS

/*@meta*/
function querySelectorAllReplacement (valueExp){

	var left = context.callee.object;
	var value = evalPumaAst(valueExp).value;
	var subsExp = pumaAst( $valueExp );

	if(valueExp.type !== 'Literal') {
    console.log("a");
		subsExp = pumaAst($valueExp.substring(1));
    console.log("SubsExp1: ");
    console.log(subsExp);
	}
	else {
    console.log("b");
		subsExp.value = valueExp.value.substring(1);
    console.log("SubsExp2: ");
    console.log(subsExp);
	}
	var regex = /((\.|#|\w)\w*)/gm;
	var selectors = value.match(regex);
	if(selectors == null || selectors.length > 1){
		return null;
	}
	if(selectors[0].indexOf(".") === 0) {
		return pumaAst($left.getElementsByClassName($subsExp));
	}
	else if(selectors[0].indexOf("#") === 0) {
		console.log("querySelectorAll was replaced by getElementById. getElementById will return just the first element that match with the id");
		return pumaAst($left.getElementById($subsExp));
	}
	else {
		return pumaAst($left.getElementsByTagName($valueExp));
	}
}

document.querySelectorAll = querySelectorAllReplacement;

//Code to test
//Basic case
document.querySelectorAll("image");

//Case when document is not called explicitly
var a = document;
a.querySelectorAll("#linksDiv");

//Case when document is not called explicitly
var b = { doc: document};
b.doc.querySelectorAll(".myGroup");
b.doc.querySelectorAll("." + "myGroup");


//Test multiple selectors, should not work properly yet :S
document.querySelectorAll("#mytable tr>td:nth-of-type(1)");

