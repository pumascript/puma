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

