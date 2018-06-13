// Copyright (c) 2013 - present UTN-LIS

/* eslint quotes: 0, no-unused-vars: 0 */

/**
 *          PUMASCRIPT ECMA 6 DESTRUCTURING ASSIGNMENT SUITE
 * @file: Ecma6 Destructuring assignment expressions test suite for the language
 */
var test = QUnit.test;
var skip = QUnit.skip;

define(['pumascript'], function (puma) {

    QUnit.module("Ecma6-Destructuring-Assignment-Tests");

    skip("Array destructuring: assignment with array declaration", function(assert) {
        var result = puma.evalPuma("const foo = ['one', 'two', 'three']; const [one, two, three] = foo; one;");
        result.makeValue();
        assert.ok(result.success && result.value === 'one');
    });

    skip("Array destructuring: assignment without array declaration", function(assert) {
        var result = puma.evalPuma("let a, b; [a, b] = [1, 2]; a;");
        result.makeValue();
        assert.ok(result.success && result.value === 1);
    });

    skip("Array destructuring: variable order change", function(assert) {
        var result = puma.evalPuma("let a = 1; let b = 3; [a, b] = [b, a]; b;");
        result.makeValue();
        assert.ok(result.success && result.value === 1);
    });

    skip("Array destructuring: multiple return values", function(assert) {
        var result = puma.evalPuma("function f() {return [1, 2];} const [a, b] = f(); a;");
        result.makeValue();
        assert.ok(result.success && result.value === 1);
    });

    skip("Array destructuring: multiple return values assigned to an array", function(assert) {
        var result = puma.evalPuma("function f() {return [1, 2];} const a = f(); a[0];");
        result.makeValue();
        assert.ok(result.success && result.value === 1);
    });

    skip("Array destructuring: some return values ignored", function(assert) {
        var result = puma.evalPuma("function f() {return [1, 2, 3];} const [a, , b] = f(); b;");
        result.makeValue();
        assert.ok(result.success && result.value === 3);
    });

    skip("Array destructuring: all return values ignored", function(assert) {
        var result = puma.evalPuma("function f(){return [1, 2, 3]}; ([,,] = f()) instanceof Array;");
        result.makeValue();
        assert.ok(result.success && result.value === true);
    });

    skip("Object destructuring: assignment with object declaration", function(assert) {
        var result = puma.evalPuma("const o = {p: 42, q: true}; const {p, q} = o; p;");
        result.makeValue();
        assert.ok(result.success && result.value === 42);
    });

    skip("Object destructuring: assignment with object declaration", function(assert) {
        var result = puma.evalPuma("const o = {p: 42, q: true}; const {p: foo, q: bar} = o; foo;");
        result.makeValue();
        assert.ok(result.success && result.value === 42);
    });

    skip("Object destructuring: assignment without declaration", function(assert) {
        var result = puma.evalPuma("let a, b; ({a, b} = {a: 1, b: 2}); a;");
        result.makeValue();
        assert.ok(result.success && result.value === 1);
    });

    skip("Object destructuring: function arguments default, simple example", function(assert) {
        var result = puma.evalPuma("let {x = 1, y = 200} = {x: 100}; x + y;");
        result.makeValue();
        assert.ok(result.success && result.value === 300);
    });

    skip("Object destructuring: function arguments default", function(assert) {
        var result = puma.evalPuma("function drawES2015Chart({cords = { x: 0, y: 0 }, radius = 25} = {}){return [cords, radius]} const [cords, radius] = drawES2015Chart({cords: { x: 18, y: 30}}); cords.x;");
        result.makeValue();
        assert.ok(result.success && result.value === 18);
    });

    skip("Object destructuring: nested objects and array destructuring", function(assert) {
        var result = puma.evalPuma("const metadata = { title: 'Scratchpad', translations: [{ locale: 'de', title: 'JavaScript-Umgebung'}] }; const { title: englishTitle, translations: [{ title: localeTitle }] } = metadata; localeTitle;");
        result.makeValue();
        assert.ok(result.success && result.value === 'JavaScript-Umgebung');
    });

    skip("Object destructuring: For iterations with destructuring", function(assert) {
        var result = puma.evalPuma("const people = [{ name: 'Mike Smith', family: { father: 'Harry Smith' } }, { name: 'Tom Jones', family: { father: 'Richard Jones' } }]; const fathers = []; for (const { family: { father: f } } of people) {father = [{ father: f }]; fathers.push(father);} fathers.length;");
        result.makeValue();
        assert.ok(result.success && result.value === 2);
    });

    skip("Object destructuring: Computed object property names and destructuring", function(assert) {
        var result = puma.evalPuma("const key = 'z'; let { [key]: foo } = { z: 'bar' }; foo;");
        result.makeValue();
        assert.ok(result.success && result.value === 'bar');
    });

    skip("Object destructuring: Computed object property names and destructuring, alternative", function(assert) {
        var result = puma.evalPuma("const {['f' + 'oo']: there} = {foo : 'bar'}; there;");
        result.makeValue();
        assert.ok(result.success && result.value === 'bar');
    });

});
