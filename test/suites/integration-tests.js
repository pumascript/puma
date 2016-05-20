/*global define, test, ok, equal */

/*
 *                      PUMASCRIPT INTEGRATION TEST SUITE
 *  @file: Integration test suite including complex and real applications of puma
 */
define(['pumascript', 'esprima'], function(puma, esprima) {
    
    test("Integration - rewrite forIn meta function test", function(){
        var result = puma.evalPuma("var puma = require('pumascript'); /* @meta */ function rewriteForIn(){var forIns=puma.pumaFindByType(pumaProgram,'ForInStatement');console.log('For In statements found: '+forIns.length);for(var index=0;index<forIns.length;index++)rewriteSingleForIn(forIns[index]);return null} function rewriteSingleForIn(forInAst){var left=forInAst.left;var right=forInAst.right;var itemName;var tempId;if(left.type==='Identifier')itemName=left;else if(left.type==='VariableDeclaration'){tempId=left.declarations[0].id;itemName=pumaAst($tempId)}else return;var cloneForIn=puma.pumaCloneAst(forInAst);var optimizedFor=puma.pumaCloneAst(forInAst);optimizedFor.type='ForStatement';optimizedFor.init=left;optimizedFor.test=pumaAst($itemName<$right.length);optimizedFor.update=pumaAst($itemName=$itemName+1);var temp = pumaAst(function(){if($right instanceof Array)$optimizedFor;else $cloneForIn});var tempIf=puma.pumaFindByType(temp,'IfStatement')[0];forInAst.type=tempIf.type;forInAst.test=tempIf.test;forInAst.consequent=tempIf.consequent;forInAst.alternate=tempIf.alternate}rewriteForIn();var array=[7,2,3,7];var i=0;for(i in array)array[i]+=1;for(var j in array)array[j]+=1;"
        );
        equal( result.success, true, "Passed!");
    }); 
});
