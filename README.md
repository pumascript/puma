# PumaScript

![alt text][travis]
[travis]: https://travis-ci.org/emravera/puma.svg?branch=master "Current CI status on Master"

## Intro

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

## Use PumaScript with require

PumaScript was developed as a AMD module so it can be used with any JS module loader. In order to use in your project copy the src folder to your project.

To include the functionality using requireJS into your code add the following:

```
<script data-main="/src/pumascript.js" src="/src/libs/requirejs/require.js"></script>
```

Now you can use it inside your code in this way:

```
    var puma = require('pumascript')
    puma.evalPuma(<The program string here>)
```

## PumaScript Editor

A simple PumaScript editor is available here:

```
    editor/puma-editor.html
```
The editor shows two frames side by side. The one in the left allows writing code in PumaScript language and the one in the right is used to see the results of re-writing after pressing the button "Execute".

To setup the editor, you need to have bower installed on your local system, and then in the editor folder run:

```
    bower install
```

Note that you can use any text editor to write PumaScript code. Then, use the "evalPuma" function run your code by using JavaScript.

We are working in a node.js module in order to use PumaScript integrated in your development cycle in a similar way to code minifiers or static analysis tools like JSHint.

## PumaScript meta-functions

PumaScript allows the construction of meta-functions. These meta-functions can be used to run introspection into normal runtime scripts or to re-write portions of the program.

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

This example show how to use PumaScript to re-write JQuery selectors into native JavaScript functions:

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

## Search in AST using Intrinsic Functions

There are two global functions that can be used to search for nodes inside a portion of AST.

* Search by node type: `pumaFindByType`
* Search by property names and values: `pumaFindByProperty`

These functions are used to find specific sub-nodes in a portion of AST. For example:

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

## The PumaScript Team
* Alexis Ferreyra
* Emanuel Ravera
* Nestor Navarro
* Julieta Alvarez
* Ricardo Medel
* Albertina Durante

## Security track
* Marcelo Gonzalez
* Martin Molina

## Universidad Tecnologica Nacional - Facultad Regional Cordoba - Argentina
Project is executed in Software Research Lab (LIS).

![alt text][utn]
[utn]: http://upload.wikimedia.org/wikipedia/commons/thumb/6/67/UTN_logo.jpg/200px-UTN_logo.jpg "UTN logo"
