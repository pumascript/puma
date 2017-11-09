# PumaScript [![Build Status](https://travis-ci.org/pumascript/puma.svg?branch=master)](https://travis-ci.org/pumascript/puma) [![Join the chat at https://gitter.im/emravera/puma](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/emravera/puma?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

PumaScript is a research programming language that adds meta-programming capabilities to JavaScript and is develop at the Universidad Tecnologica Nacional (UTN-FRC) in Cordoba, Argentina.

It has exactly the same syntax and semantic than regular JavaScript plus meta-programming capabilities such as introspection and re-writing features.

A number of PumaScript features are based on LayerD project. Which is a meta-programming framework for statically typed languages.

## Getting started with Puma
```
npm install -g grunt grunt-cli
```

In order to set-up PumaScript environment to give a try follow these steps:

```
git clone https://github.com/emravera/puma.git
npm install
grunt init

```

After these steps PumaScript editor is ready to start coding. Open in your browser puma's editor:

```
editor/puma-editor.html
```

The editor shows two frames side by side. The one in the left allows writing code in PumaScript language and the one in the right is used to see the results of re-writing after pressing the button "Execute".

Now is time to write the Simple PumaScript program!

### Simple PumaScript Program

Any JavaScript program is a PumaScript program. Write the following snippet in the PumaScript section of the editor:

```
    /** @meta */
    function sum(a, b)
    {
        return pumaAst( $a +  $b);
    }
    sum(5, 6);
```

The sample declares the meta-function "sum" that takes two arguments. These arguments are not values but AST (Abstract Syntax Tree) of the actual arguments.

The return expression use the special function "pumaAst" to build a new AST and replace the identifiers "$a" and "$b" with the AST of the actual arguments. In the sample, "sum" is called with literals "5" and "6".

So, the expression "sum(5, 6)" will be re-written in the JavaScript panel as:

```
5 + 6
```

### A more useful example of usage:

This example show how to use PumaScript metafunctions to re-write JQuery selectors into native JavaScript functions:

```
/* @meta */
function $(a){
    return pumaAst( jQuery(document.getElementById($a)) );
}

```

Will re-write:

```
$("#some-panel");
```

Into this line:

```
jQuery(document.getElementById('#some-panel'));
```

A meta-function can avoid re-writing the caller expression by returning null instead of the AST.

You could go to PumaScript wiki and find more examples.

## Using PumaScript with require

PumaScript was developed as a AMD module so it can be used with any JavaScript module loader. In order to use in your project copy the src folder to your project.

To include the functionality using requireJS into your code add the following:

```
<script data-main="/src/pumascript.js" src="require.js"></script>
```

Now you can use PumaScript in your code in this way:

```
    var puma = require('pumascript');
    puma.evalPuma('<PUMA PROGRAM STRING HERE>');
```

## Bugs Report

Feel free to create an issue onto Github issues tracker and add the right label. Also you can get in touch and we will do that for you.

## Would do you like contribute?

We have ton of work that need to be claimed. From coding to documentation. Don't hesitate to contact. We'll waiting for you.

## License

MIT. Details on LICENSE file.
