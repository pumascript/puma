/** 
 * @meta
 * Looks for any occurrence of "for...in" statement and rewrite it to simpler for statement.
 */
function rewriteForIn() {
    var forIns = pumaFindByType(pumaProgram, "ForInStatement");
    console.log("For In statements found: " + forIns.length);
    
    for(var index = 0; index < forIns.length; index++)
    {
        rewriteSingleForIn(forIns[index]);
    }
    return null;	
}

/**
 * Rewrite single for in into a standard for.
 */
function rewriteSingleForIn(forInAst){
    var left = forInAst.left;
    var right = forInAst.right;

    forInAst.type = 'ForStatement';
    forInAst.init = left;
    forInAst.test = pumaAst( $left < $right.length );
    forInAst.update = pumaAst( $left = $left + 1 );
}

rewriteForIn();

var array = [7,2,3,7];
var i = 0;

for(i in array){
  array[i] +=1;
}

/* rewrite into:
  for(var i=0; i< array.length; i++){
    array[i] +=1;
  }
*/
