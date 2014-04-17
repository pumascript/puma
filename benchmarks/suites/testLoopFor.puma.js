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
    var itemName;
    var tempId;
    
    // detect if it's a case that we can convert
    if(left.type === 'Identifier')
    {
        itemName = left;
    }
    else if(left.type === 'VariableDeclaration')
    {
        tempId = left.declarations[0].id;
        itemName = pumaAst( $tempId );
    }
    else
    {
        return;
    }

    // prepare fallback version
    var cloneForIn = pumaCloneAst(forInAst);
    var optimizedFor = pumaCloneAst(forInAst);

    optimizedFor.type = 'ForStatement';
    optimizedFor.init = left;
    optimizedFor.test = pumaAst( $itemName < $right.length );
    optimizedFor.update = pumaAst( $itemName = $itemName + 1 );
    
    // create if with test and fallback version
    var temp = pumaAst(function(){
        if( $right instanceof Array ) $optimizedFor; else $cloneForIn;
    });
    var tempIf = pumaFindByType( temp, 'IfStatement')[0];

    forInAst.type = tempIf.type;
    forInAst.test = tempIf.test;
    forInAst.consequent = tempIf.consequent;
    forInAst.alternate = tempIf.alternate;
}

rewriteForIn();

var array = [7,2,3,7];
var i = 0;

for(i in array){
  array[i] +=1;
}

for(var j in array){
  array[j] +=1;
}

/* rewrite into:
  for(var i=0; i< array.length; i++){
    array[i] +=1;
  }
*/

