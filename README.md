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

A meta-function can avoid re-writing the caller expression by returning null instead of an AST.
