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
        var result = puma.evalPuma("let foo = ['one', 'two', 'three']; let [one, two, three] = foo; one === 'one' && two === 'two' && three === 'three';");
        assert.equal(result.value, true);
    });

    skip("Array destructuring: assignment without array declaration", function(assert) {
        var result = puma.evalPuma("let a, b; [a, b] = [1, 2]; a === 1 && b === 2;");
        assert.equal(result.value, true);
    });

    skip("Array destructuring: variable order change", function(assert) {
        var result = puma.evalPuma("let a = 1; let b = 3; [a, b] = [b, a]; b === 1 && a === 3");
        assert.equal(result.value, true);
    });

    skip("Array destructuring: multiple return values", function(assert) {
        var result = puma.evalPuma("function f() {return [1, 2];} let [a, b] = f(); a === 1 && b === 2;");
        assert.equal(result.value, true);
    });

    skip("Array destructuring: multiple return values assigned to an array", function(assert) {
        var result = puma.evalPuma("function f() {return [1, 2];} let a = f(); a[0] === 1 && a[1] === 2;");
        assert.equal(result.value, true);
    });

    skip("Array destructuring: some return values ignored", function(assert) {
        var result = puma.evalPuma("function f() {return [1, 2, 3];} let [a, , b] = f(); a === 1 && b === 3;");
        assert.equal(result.value, true);
    });

    skip("Object destructuring: assignment with object declaration", function(assert) {
        var result = puma.evalPuma("let o = {p: 42, q: true}; let {p, q} = o; p === 42 && q === true;");
        assert.equal(result.value, true);
    });

    skip("Object destructuring: assignment with object declaration", function(assert) {
        var result = puma.evalPuma("let o = {p: 42, q: true}; let {p: foo, q: bar} = o; foo === 42 && bar === true;");
        assert.equal(result.value, true);
    });

    skip("Object destructuring: assignment without declaration", function(assert) {
        var result = puma.evalPuma("let a, b; ({a, b} = {a:1, b:2}); a === 1 && b === 2;");
        assert.equal(result.value, true);
    });

    skip("Object destructuring: function arguments default, simple example", function(assert) {
        var result = puma.evalPuma("let {x = 1, y = 200} = {x: 100};");
        assert.equal(result.value, true);
    });

    skip("Object destructuring: function arguments default", function(assert) {
        var result = puma.evalPuma("function drawES2015Chart({cords = { x: 0, y: 0 }, radius = 25} = {}){return [cords, radius]} let [cords, radius] = drawES2015Chart({cords: { x: 18, y: 30}}); cords.x === 18 && cords.y === 30;");
        assert.equal(result.value, true);
    });

    skip("Object destructuring: nested objects and array destructuring", function(assert) {
        var result = puma.evalPuma("let metadata = { title: 'Scratchpad', translations: [{ locale: 'de', title: 'JavaScript-Umgebung'}] }; let { title: englishTitle, translations: [{ title: localeTitle }] } = metadata; englishTitle === 'Scratchpad' && localeTitle === 'JavaScript-Umgebung';");
        assert.equal(result.value, true);
    });

    skip("Object destructuring: For iterations with destructuring", function(assert) {
        var result = puma.evalPuma("let people = [{ name: 'Mike Smith', family: { father: 'Harry Smith' } }, { name: 'Tom Jones', family: { father: 'Richard Jones' } }]; let fathers = []; for (let { family: { father: f } } of people) {father = [{ father: f }]; fathers.push(father);} fathers.length === 2;");
        assert.equal(result.value, true);
    });

    skip("Object destructuring: Computed object property names and destructuring", function(assert) {
        var result = puma.evalPuma("let key = 'z'; let { [key]: foo } = { z: 'bar' }; foo === 'bar';");
        assert.equal(result.value, true);
    });

    skip("Object destructuring: Computed object property names and destructuring, alternative", function(assert) {
        var result = puma.evalPuma("let {['f' + 'oo']: there} = {foo : 'bar'}; there === 'bar';");
        assert.equal(result.value, true);
    });

});