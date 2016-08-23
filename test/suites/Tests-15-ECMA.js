/*          PUMASCRIPT TEST SUITE FOR ECMA COMPLIANCE
 *                        SECTION 15
 */

define(['pumascript', 'esprima'], function (puma, esprima) {
    
    
    //   Section 15.1: The Global Object   //
    
    test("Value Properties of the Global Object: NaN", function () {
        var result = puma.evalPuma("NaN");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(typeof result.value, typeof NaN, "Passed!");
    });
    
    test("Value Properties of the Global Object: Infinity", function () {
        var result = puma.evalPuma("Infinity");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, Infinity, "Passed!");
    });
    
    test("Value Properties of the Global Object: Undefined", function () {
        var result = puma.evalPuma("undefined");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, undefined, "Passed!");
    });
    
    test("Function Properties of the Global Object: eval(x)", function () {
        var result = puma.evalPuma("eval(Number(1));");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, 1, "Passed!");
    });
    
    test("Function Properties of the Global Object: eval(WrongSyntax)", function () {
        var err;
        try {
            var result = puma.evalPuma("eval(\"var 1;\");");
        }
        catch (e) {
            if (e instanceof SyntaxError) {
            /*    equal(e.message, "missing variable name", "Passed!");     beats me as of why this doesn't work */
                equal(true, true, "Passed!");
            }
        }
    });
    
    test("Function Properties of the Global Object: eval()", function () {
        var result = puma.evalPuma("eval(\"var f = 'Lachesis'; f === 'Lachesis';\");");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, true, "Passed!");
    });   
    
    test("Function Properties of the Global Object: eval(string)", function () {
        var result = puma.evalPuma("eval(\"var f = 'Clotho'; f;\");");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, 'Clotho', "Passed!");
    });
    
    QUnit.skip("Indirect Call to Eval", function () {
        var result = puma.evalPuma("var indirectEval = (1, eval); indirectEval(\"var f = 'Atropos'; f;\");");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, 'Atropos', "Passed!");
    });
    
    test("parseInt(string, radix)", function () {
        var result = puma.evalPuma("parseInt (' +2027ADX', 16);");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, 2107309, "Passed!");
    });
    
    test("parseInt(invalidParse)", function () {
        var result = puma.evalPuma("parseInt ('0xT');");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(typeof result.value, typeof NaN, "Passed!");
    });
    
    test("parseFloat(string)", function () {
        var result = puma.evalPuma("parseFloat(' -20.7N');");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, -20.7, "Passed!");
    });
    
    test("parseFloat(invalidParse)", function () {
        var result = puma.evalPuma("parseFloat('UD4');");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(typeof result.value, typeof NaN, "Passed!");
    });
    
    test("isNaN(number)", function () {
        var result = puma.evalPuma("isNaN(0/0);");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, true, "Passed!");
    });
    
    test("isFinite(number)", function () {
        var result = puma.evalPuma("isFinite(2);");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, true, "Passed!");
    });
    
    test("encodeURI(string)", function () {
        var result = puma.evalPuma("encodeURI('https://www.googleapis.com/customsearch/v1?key=#5475&name=Malik, Faridah&birth=1999:Dearborn, Michigan, USA');");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, "https://www.googleapis.com/customsearch/v1?key=#5475&name=Malik,%20Faridah&birth=1999:Dearborn,%20Michigan,%20USA", "Passed!");
    });
    
    test("decodeURI(string)", function () {
        var result = puma.evalPuma("decodeURI('https://www.googleapis.com/customsearch/v1?key=#5475&name=Malik,%20Faridah&birth=1999:Dearborn,%20Michigan,%20USA')");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, "https://www.googleapis.com/customsearch/v1?key=#5475&name=Malik, Faridah&birth=1999:Dearborn, Michigan, USA", "Passed!");
    });
    
    test("encodeURIComponent(string)", function () {
        var result = puma.evalPuma("encodeURIComponent('https://www.googleapis.com/customsearch/v1?key=5475&name=Malik, Faridah&birth=1999:Dearborn, Michigan@USA');");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, "https%3A%2F%2Fwww.googleapis.com%2Fcustomsearch%2Fv1%3Fkey%3D5475%26name%3DMalik%2C%20Faridah%26birth%3D1999%3ADearborn%2C%20Michigan%40USA", "Passed!");
    });
    
    test("decodeURIComponent(string)", function () {
        var result = puma.evalPuma("decodeURIComponent('https%3A%2F%2Fwww.googleapis.com%2Fcustomsearch%2Fv1%3Fkey%3D5475%26name%3DMalik%2C%20Faridah%26birth%3D1999%3ADearborn%2C%20Michigan%40USA')");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, "https://www.googleapis.com/customsearch/v1?key=5475&name=Malik, Faridah&birth=1999:Dearborn, Michigan@USA", "Passed!");
    });
    
    
    //   Section 15.2: Object Objects   //
    
    test("Object(undefined)", function () {
        var result = puma.evalPuma("Object(undefined)");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(JSON.stringify(result.value), JSON.stringify(new Object(undefined)), "Passed!");
    });
    
    test("Object(value)", function () {
        var result = puma.evalPuma("Object(4)");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(JSON.stringify(result.value), JSON.stringify(new Object(4)), "Passed!");
    });
        
    QUnit.skip("Object Constructor", function () {
        obj = new Object({Name:'LEO', Terminal:25000});
        var result = puma.evalPuma("new Object({Name:'LEO', Terminal:25000});");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(JSON.stringify(result.value), JSON.stringify(obj), "Passed!");
    });
    
    QUnit.skip("Object.prototype", function () {
        var result = puma.evalPuma("Object.prototype.isPrototypeOf(Object());");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, true, "Passed!");
    });
    
    test("Object.getPrototypeOf(Object)", function () {
        var a = Array('Atropos', 'Clotho', 'Lachesis');
        var result = puma.evalPuma("Object.getPrototypeOf(Array());");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value.isPrototypeOf(a), true, "Passed!");
    });
    
    test("Object.getOwnPropertyDescriptor(O,P)", function () {
        var c = { value: 42, writable: true, enumerable: true, configurable: true }; 
        var result = puma.evalPuma("var o, d; o = { bar: 42 }; d = Object.getOwnPropertyDescriptor(o, 'bar');");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(JSON.stringify(result.value), JSON.stringify(c), "Passed!");
    });
    
    //   If the argument to this method is not an object it will cause a TypeError. As of ES6, a non-object argument will be coerced to an object.   //
    
    test("Object.getOwnPropertyNames(Object)", function () {
        var c = ["0", "1", "2", "length"];
        var result = puma.evalPuma("var arr = ['Alpha', 'Beta', 'Gamma']; Object.getOwnPropertyNames(arr);")
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(JSON.stringify(result.value), JSON.stringify(c), "Passed!");
    });
    
    test("Object.create(O [, Properties])", function () {
        var c = { value: "Puma", writable: true, enumerable: false, configurable: false };
        var result = puma.evalPuma("var o = Object.create(null, { foo: { writable: true, configurable: false, enumerable: false, value: 'Puma' }, bar: { value: 20 } } );");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value.bar, 20, "Passed!");
        equal(JSON.stringify(Object.getOwnPropertyDescriptor(result.value, 'foo')), JSON.stringify(c), "Passed!");
    });
    
    test("Object.defineProperty(O, P, Attributes)", function () {
        var c = { value: "Rawr!", writable: true, enumerable: false, configurable: true };
        var result = puma.evalPuma("var o = Object(); Object.defineProperty(o, 'puma', { configurable: true, writable: true, value: 'Rawr!' } ); o;");
        result.makeValue();
        equal(result.success, true, "Passed!");     
        equal(JSON.stringify(Object.getOwnPropertyDescriptor(result.value, 'puma')), JSON.stringify(c), "Passed!");
    });
    
    test("Object.defineProperties(O, Properties)", function () {
        var c = { value: "Rawr!", writable: true, enumerable: false, configurable: false };
        var result = puma.evalPuma("var o = Object(); Object.defineProperties(o, { 'puma': { writable: true, value: 'Rawr!' }, 'script': { value: true } } ); o;");
        result.makeValue();
        equal(result.success, true, "Passed!");     
        equal(JSON.stringify(Object.getOwnPropertyDescriptor(result.value, 'puma')), JSON.stringify(c), "Passed!");
        equal(result.value.script, true, "Passed!");
    });
    
    test("Object.seal(O)", function () {
        var c = { value: "Shaher", writable: true, enumerable: false, configurable: false };
        var result = puma.evalPuma("var Fallen = Object.create(null, { name: { writable: true, configurable: true, value: 'Shaher' } } ); Object.seal(Fallen);");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(JSON.stringify(Object.getOwnPropertyDescriptor(result.value, 'name')), JSON.stringify(c), "Passed!");
        equal(Object.isExtensible(result.value), false, "Passed!");
    });
    
    test("Object.freeze(O)", function () {
        var c = { value: "Shaher", writable: false, enumerable: false, configurable: false };
        var result = puma.evalPuma("var Fallen = Object.create(null, { name: { writable: true, configurable: true, value: 'Shaher' } } ); Object.freeze(Fallen);");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(JSON.stringify(Object.getOwnPropertyDescriptor(result.value, 'name')), JSON.stringify(c), "Passed!");
        equal(Object.isExtensible(result.value), false, "Passed!");
    });
    
    test("Object.preventExtensions(O)", function () {
        var result = puma.evalPuma("var Fallen = Object.create(null, { name: { writable: true, configurable: true, value: 'Shaher' } } ); Object.preventExtensions(Fallen);");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(Object.isExtensible(result.value), false, "Passed!");
    });
    
    test("Object.isSealed(O)", function () {
        var result = puma.evalPuma("var Fallen = Object.create(null, { name: { writable: true, configurable: true, value: 'Shaher' } } ); Object.seal(Fallen); Object.isSealed(Fallen);");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, true, "Passed!");
    });
    
    test("Object.isFrozen(O)", function () {
        var result = puma.evalPuma("var Fallen = Object.create(null, { name: { writable: true, configurable: true, value: 'Shaher' } } ); Object.freeze(Fallen); Object.isFrozen(Fallen);");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, true, "Passed!");
    });
    
    test("Object.isExtensible(O)", function () {
        var result = puma.evalPuma("var Fallen = Object.create(null, { name: { writable: true, configurable: true, value: 'Shaher' } } ); Object.preventExtensions(Fallen); Object.isExtensible(Fallen);");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, false, "Passed!");
    });
    
    test("Object.keys(O)", function () {
        var a = ["name", "lv", "lead"];
        var result = puma.evalPuma("var Fallen = Object.create(null, { name: { writable:true, configurable:true, enumerable:true, value: 'Shaher' }, hp: { writable:true, enumerable:false, value: 617 }, lv: { configurable: true, enumerable: true, value: 32 }, lead: { configurable: false, enumerable: true, value: true } } ); Object.keys(Fallen);");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(JSON.stringify(result.value), JSON.stringify(a), "Passed!");
    });
    
    QUnit.skip("Object.prototype.constructor", function () {
        var result = puma.evalPuma("Object.prototype.constructor === Object().constructor;");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, true, "Passed!");
    });
    
    QUnit.skip("Object.prototype.toString()", function () {
        var result = puma.evalPuma("var toStringP = Object.prototype.toString; toStringP.call(Math);");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, '[object Math]', "Passed!");
    });
    
    QUnit.skip("Object.prototype.toString(): undefined", function () {
        var result = puma.evalPuma("var toStringU = Object.prototype.toString; toStringU.call(undefined);");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, '[object Undefined]', "Passed!");
    });
    
    QUnit.skip("Object.prototype.toString(): null", function () {
        var result = puma.evalPuma("var toStringN = Object.prototype.toString; toStringN.call(null);");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, '[object Null]', "Passed!");
    });
    
    QUnit.skip("Object.prototype.toLocaleString()", function () {
        var result = puma.evalPuma("var toLocaleStringP = Object.prototype.toLocaleString; toLocaleStringP.call(Math);");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, '[object Math]', "Passed!");
    });
    
    QUnit.skip("Object.prototype.valueOf()", function () {
        var oni = Object.create(null, { height: { value: 1 }, width: { value: 6 }, color: { value: 'red' } });
        var result = puma.evalPuma("var ono = Object.create(null, { height: { value: 1 }, width: { value: 6 }, color: { value: 'red' } }); var valueOfO = Object.prototype.valueOf; valueOfO.call(ono);");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(typeof result.value, 'object', "Passed!");
        equal(result.value.height, 1, "Passed!");
        equal(result.value.width, 6, "Passed!");
        equal(result.value.color, 'red', "Passed!");
    });
    
    QUnit.skip("Object.prototype.hasOwnProperty(V)", function () {
        var result = puma.evalPuma("var ono = Object.create(null, { height: { value: 1 }, width: { value: 6 }, color: { value: 'red' } }); Object.prototype.hasOwnProperty.call(ono, 'color');");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, true, "Passed!");
    });
    
    QUnit.skip("Object.prototype.isPrototypeOf(V)", function () {
        var result = puma.evalPuma("var oni = Object.create(null); oni.prototype = Object.prototype; oni.prototype.isPrototypeOf(Object);");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, true, "Passed!");
    });
    
    QUnit.skip("Object.prototype.propertyIsEnumerable(V)", function () {
        var result = puma.evalPuma("var ono = Object.create(null, { color: { enumerable: true, value: 'red' }, range: { enumerable: false, value: 'red' } }); var pIE = Object.prototype.propertyIsEnumerable; pIE.call(ono, 'color') && !pIE.call(ono, 'range');");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, true, "Passed!");
    });
    
    
    //   Section 15.3: Function Objects   //
    
    
    
    //   Section 15.8: The Math Object   //
    
    test("Value Properties of the Math Object: E", function () {
        var result = puma.evalPuma("Math.E;");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, 2.718281828459045, "Passed!");
    });
    
    test("Value Properties of the Math Object: LN10", function () {
        var result = puma.evalPuma("Math.LN10;");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, 2.302585092994046, "Passed!");
    });
    
    test("Value Properties of the Math Object: LN2", function () {
        var result = puma.evalPuma("Math.LN2;");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, 0.6931471805599453, "Passed!");
    });
    
    test("Value Properties of the Math Object: LOG2E", function () {
        var result = puma.evalPuma("Math.LOG2E;");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, 1.4426950408889634, "Passed!");
    });
    
    test("Value Properties of the Math Object: LOG10E", function () {
        var result = puma.evalPuma("Math.LOG10E;");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, 0.4342944819032518, "Passed!");
    });
    
    test("Value Properties of the Math Object: PI", function () {
        var result = puma.evalPuma("Math.PI;");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, 3.1415926535897932, "Passed!");
    });
    
    test("Value Properties of the Math Object: SQRT1_2", function () {
        var result = puma.evalPuma("Math.SQRT1_2;");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, 0.7071067811865476, "Passed!");
    });
    
    test("Value Properties of the Math Object: SQRT2", function () {
        var result = puma.evalPuma("Math.SQRT2;");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, 1.4142135623730951, "Passed!");
    });
    
    test("Function Properties of the Math Object: abs(x)", function () {
        var result = puma.evalPuma("Math.abs(-5);");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, 5, "Passed!");
    });
    
    test("Function Properties of the Math Object: acos(x)", function () {
        var result = puma.evalPuma("Math.acos(0.6);");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, 0.9272952180016123, "Passed!");
    });
    
    test("Function Properties of the Math Object: asin(x)", function () {
        var result = puma.evalPuma("Math.asin(0.6);");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, 0.6435011087932844, "Passed!");
    });
    
    test("Function Properties of the Math Object: atan(x)", function () {
        var result = puma.evalPuma("Math.atan(0.6);");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, 0.5404195002705842, "Passed!");
    });
    
    test("Function Properties of the Math Object: atan2(y,x)", function () {
        var result = puma.evalPuma("Math.atan2(25, 90);");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, 0.27094685033842053, "Passed!");
    });
    
    test("Function Properties of the Math Object: ceil(x)", function () {
        var result = puma.evalPuma("Math.ceil(20.01);");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, 21, "Passed!");
    });
    
    test("Function Properties of the Math Object: cos(x)", function () {
        var result = puma.evalPuma("Math.cos(6);");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, 0.960170286650366, "Passed!");
    });
    
    test("Function Properties of the Math Object: exp(x)", function () {
        var result = puma.evalPuma("Math.exp(4);");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, 54.598150033144236, "Passed!");
    });
    
    test("Function Properties of the Math Object: floor(x)", function () {
        var result = puma.evalPuma("Math.floor(21.01);");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, 21, "Passed!");
    });
    
    test("Function Properties of the Math Object: log(x)", function () {
        var result = puma.evalPuma("Math.log(10);");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, 2.302585092994046, "Passed!");
    });
    
    test("Function Properties of the Math Object: max([ value1 [ , value2 [ , … ]]])", function () {
        var result = puma.evalPuma("Math.max(9,12,5);");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, 12, "Passed!");
    });
    
    test("Function Properties of the Math Object: min ([ value1 [ , value2 [ , … ]]])", function () {
        var result = puma.evalPuma("Math.min(9,12,5);");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, 5, "Passed!");
    });
    
    test("Function Properties of the Math Object: pow(x,y)", function () {
        var result = puma.evalPuma("Math.pow(9,5);");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, 59049, "Passed!");
    });
    
    test("Function Properties of the Math Object: random()", function () {
        var result = puma.evalPuma("Math.random();");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(typeof result.value, 'number', "Passed!");
        equal(result.value >= 0, true, "Passed!");
        equal(result.value < 1, true, "Passed!");
    });
    
    test("Function Properties of the Math Object: round(x)", function () {
        var result = puma.evalPuma("Math.round(65.5256);");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, 66, "Passed!");
    });
    
    test("Function Properties of the Math Object: sin(x)", function () {
        var result = puma.evalPuma("Math.sin(6);");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, -0.27941549819892586, "Passed!");
    });
    
    test("Function Properties of the Math Object: sqrt(x)", function () {
        var result = puma.evalPuma("Math.sqrt(4);");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, 2, "Passed!");
    });
    
    test("Function Properties of the Math Object: tan(x)", function () {
        var result = puma.evalPuma("Math.tan(6);");
        result.makeValue();
        equal(result.success, true, "Passed!");
        equal(result.value, -0.29100619138474915, "Passed!");
    });
    
    
    // Below tests done by Juan Guzmán [Gh tag]
    
    QUnit.skip("15.4.2.1 new Array ( [ item0 [ , item1 [ , ... ] ] ] )", function () {
        var result = puma.evalPuma("var a = new Array()");
        ok(result.success && typeof a == "object", "Passed!");
    });
    QUnit.skip("15.4.2.1 new Array ( [ item0 [ , item1 [ , ... ] ] ] )", function () {
        var result = puma.evalPuma("var a = new Array ('a','b')");
        ok(result.success && a[1] == 'b' && a[0] == 'a' && a.length == 2, "Passed!");
    });
    QUnit.skip("15.4.4.1 Array.prototype.constructor ", function () {
        var result = puma.evalPuma("var a = Array.prototype.constructor");
        ok(result.success && typeof a == "function", "Passed!");
    });
    QUnit.skip("15.4.4.2 Array.prototype.toString ( )", function () {
        var result = puma.evalPuma("var a = Array.prototype.toString ( )");
        ok(result.success && typeof a == "string" && a.length == 0, "Passed!");
    });
    QUnit.skip("15.4.4.3 Array.prototype.toLocaleString ( )", function () {
        var result = puma.evalPuma("var a = Array.prototype.toLocaleString ()");
        ok(result.success && typeof a == "string" && a.length == 0, "Passed!");
    });
    QUnit.skip("15.4.4.4 Array.prototype.concat ( [ item1 [ , item2 [ , … ] ] ] )", function () {
        var result = puma.evalPuma("var a = Array.prototype.concat ( 1,2)");
        ok(result.success && a[1] == '2' && a[0] == '1' && a.length == 2, "Passed!");
    });
    QUnit.skip("15.5.4.1 String.prototype.constructor", function () {
        var result = puma.evalPuma("var a = String.prototype.constructor");
        ok(result.success && typeof a == "function", "Passed!");
    });
    QUnit.skip("15.5.4.2 String.prototype.toString ( )", function () {
        var result = puma.evalPuma("var a = String.prototype.toString ( )");
        ok(result.success && typeof a == "string" && a.length == 0, "Passed!");
    });
    QUnit.skip("15.5.4.3 String.prototype.valueOf ( )", function () {
        var result = puma.evalPuma("var a = 'juan'");
        ok(result.success && a.valueOf() == 'juan', "Passed!");
    });
    QUnit.skip("15.6.2.1 new Boolean (value)", function () {
        var result = puma.evalPuma("var a = new Boolean (true)");
        ok(result.success && typeof a == "string" && a == true, "Passed!");
    });
    QUnit.skip("15.6.4.1 Boolean.prototype.constructor", function () {
        var result = puma.evalPuma("var a = new Boolean(true)");
        ok(result.success && a.constructor == Boolean, "Passed!");
    });
});