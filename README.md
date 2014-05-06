# PumaScript

PumaScript is a research programming language based on JavaScript.
It has exactly the same syntax and semantic than JavaScript plus meta-programming capabilities and re-writing features.

A number of PumaScript features are based on LayerD project. Which is a meta-programming framework for statically typed languages.

## Simple PumaScript 

Any JavaScript program is a PumaScript program.

```
    var helloStr = "Hello PumaScript";
    alert("A trivial program says: " + helloStr);
```

To execute a JavaScript program in PumaScript runtime use the "evalPuma" function.

## PumaScript Editor

As part of the tools there was developed a PumaScript Editor based on CodeMirror project. You can access it at:

```
    editor/puma-editor.html
```
You will see two frames of the same size. The one in  the left allows writing code in PumaScript languaje and the one in the rigth is to see the reults of re-writing after pressing the button "Execute". 

## PumaScript meta-functions

PumaScript allows the construction of meta-functions. This meta-functions can be used to run introspection into normal runtime scripts or to re-write portions of the program.

To declare a meta-functions just add a comment with "@meta" keyword before the function declaration.

```
    /** @meta */ 
    function sum(a, b)
    {
        return pumaAst( $a +  $b);
    }
    sum(5, 6);
```

The sample declares the meta-function "sum" that takes two arguments. These arguments are not values but AST - Abstract Syntax Tree - of the actual arguments.

The return expression use the special function "pumaAst" to build a new AST and replace the identifiers "$a" and "$b" with the AST of the actual arguments. In the sample, "sum" is called with literals "5" and "6". So, the expression "sum(5, 6)" will be re-written as just the addition "5 + 6".

### A more useful example:

This example show how to use PumaScript to re-write JQuery selectors into native Javascript functions:

```
/* @meta */
function $(a){
    return pumaAst( jQuery(document.getElementById($a)) );
}

```

Will re-write:

```
$("#main-panel");
```

Into this line:

```
jQuery(document.getElementById('#main-panel'));
```

A meta-function can avoid re-writing the caller expression by returning null instead of the AST.

## Search in AST using Intrinsec Functions

There are two global functions that can be used to search for nodes inside a portion of AST.

* Find by node type: `pumaFindByType`
* Find by property names and values: `pumaFindByProperty`

Use this functions are used to find specific sub-nodes in a portion of AST. For example:

```
var ast = pumaAst(function(){
    var a, b, abc;
    abc = 5;
    a = 2;
    b = 3 + 4;
});

// To look for the node with "a = 2" expression
var result = pumaFindByProperty(ast, "expression.left.name", "a");

// To look for the node with "3 + 4" binary expression
result = pumaFindByType(ast, "BinaryExpression");

// To look for the nodes "a = 2" and "b = 3 + 4"
// This example use a custom comparison function to match the value of "left.name" property
result = pumaFindByProperty(ast, "left.name", 1, function(value1, value2){ return value1.length === value2; } );
```
Both functions returns an Array with the results. If the array is empty it means that none was found.