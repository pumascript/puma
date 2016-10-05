// Copyright (c) 2013 - present UTN-LIS

//First meta function very simple

/*@meta*/
function parseInt (valueExp) {
	var ast = pumaAst($valueExp | 0);
	return ast;
}
parseInt(0.3446);

//0.3446 | 0;


parseInt(0.3446 + 2.5453);

parseInt(Math.random());


var n1 = parseInt('97');
n1 + 2;

// Second iteration, differentiate between simple expression and non-trivial ones
/*@meta*/
function parseInt (valueExp) {
	var ast = null;
    // re-write only if the expression has the form of a simple number literal
    // otherwise, do not re-write
    if(valueExp.type === 'Literal' && typeof(valueExp.value) === 'number' )
	{
        ast = pumaAst($valueExp | 0);
	}
	return ast;
}

parseInt(5.3446);

var a = "n";
parseInt(a + 2);

parseInt("nnsdadsd123n");

parseInt("3.67788");


// Third iteration, even better
/*@meta*/
function parseInt (valueExp) {
	var ast = null;
	var regex = /^([0-9]+)?(\.[0-9]+)?$/;
    // re-write only if the expression has the form of a simple number literal
    // otherwise, do not re-write

  if(valueExp.type === 'Literal' && typeof(valueExp.value) === 'number' ||
valueExp.type === 'Literal' && typeof(valueExp.value) === 'string' && regex.test(valueExp.value)
	)
	{
        ast = pumaAst($valueExp | 0);
				console.log("se re-escribio!!! que loco: line(" + valueExp.loc.start.line + ")");
	}
	else
	{
		console.warn("Guarda flaco, no pudimos re-escribir:  line(" + valueExp.loc.start.line + ")");
	}
	return ast;
}

parseInt(5.3446);

var a = "n";
parseInt(a + 2);

parseInt("nnsdadsd123n");

parseInt("3.67788");


