test( "hello test", function() {
    ok( 1 == "1", "Passed!" );
});

test("number constant test", function() {
    var result = evalPuma("1");
    ok( result.success && 1 === result.value, "Passed!" );
});

test("string constant test", function() {
    var result = evalPuma("\"Hello\"");
    ok( result.success && "Hello" === result.value, "Passed!" );
});

test("basic function", function(){
    var result = evalPuma("function foo(){ return 1; } foo();");
    equal( result.value, 1, "Passed!");
});

test("basic function arguments", function(){
    var result = evalPuma("function foo(a, b){ return a + b; } foo(1, 2);");
    equal( result.value, 3, "Passed!");
});

test("basic function arguments with same name than local variables", function(){
    var result = evalPuma("var a = 2; var b = 3; function foo(a, b){ return a + b; } foo(1, 2);");
    equal( result.value, 3, "Passed!");
});

test("parent variable hidden by local variable", function(){
    var result = evalPuma("var a = 1; function foo(){ var a = 5; return a; } foo();");
    result.makeValue();
    equal( result.value, 5, "Passed!");
});

test("local variable function do not alias parent scope function", function(){
    var result = evalPuma("var a = 1; function foo(){ var a = 5; return a; } foo(); a;");
    result.makeValue();
    equal( result.value, 1, "Passed!");
});

test("parent variable accessed from local function", function(){
    var result = evalPuma("var a = 1; function foo(){ a = 5; return 2; } foo(); a;");
    result.makeValue();
    equal( result.value, 5, "Passed!");
});

test("parent variable accessed from local function", function(){
    var result = evalPuma("var a = 1; var b = 1; function foo(){ var a = 2; function foo2(){ a = 5; } foo2(); b = a; return 2; } foo(); b;");
    result.makeValue();
    equal( result.value, 5, "Passed!");
});

test("recursive function call", function(){
    var result = evalPuma("function recursive(a){ if(a>5) return a; else return recursive(a+1); } recursive(1);");
    equal(result.value, 6, "Passed!");
});

test("function that returns a function", function(){
    var result = evalPuma("function foo(){ function inner(){ return 2; } return inner; } foo()();");
    equal(result.value, 2, "Passed!");
});

test("return statement", function(){
    var result = evalPuma("function foo(){ return 1; return 2; } foo();");
    equal( result.value, 1, "Passed!");
});
