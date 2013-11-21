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

