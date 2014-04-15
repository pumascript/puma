/*@meta*/
function rewriteForIn() {
	var forIns = pumaFindByType(pumaProgram, "ForInStatement");
	
  for(var index = 0; index < forIns.length; index++)
  {
		console.log(index);
		console.log("for...");
    console.log(forIns[index]);
		rewriteSingleForIn(forIns[index]);
  }
	return null;	
}

function rewriteSingleForIn(forInAst){
	var left = forInAst.left;
  var right = forInAst.right;
	console.log("l/r");
  console.log(left);
	console.log(right);

	forInAst.type = 'ForStatement';
  forInAst.init = left;
  forInAst.test = pumaAst( $left < $right.length );
	console.log(forInAst.test);
	forInAst.update = pumaAst( $left = $left + 1 );

}


rewriteForIn();

var array = [7,2,3,7];

var i = 0;

for(i in array){
  array[i] +=1;
}

/*
  for(var i=0; i< array.length; i++){
    array[i] +=1;
  }
*/
