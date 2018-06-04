// Copyright (c) 2013 - present UTN-LIS

/* eslint quotes: 0, no-unused-vars: 0 */

/**
*          PUMASCRIPT ECMA 6 MAP-SET AND WEAKMAP-WEAKSET SUITE
* @file: Ecma6 Map-Set and WeakMap-WeakSet expressions test suite for the language
*/
var test = QUnit.test;
var skip = QUnit.skip;

define(['pumascript'], function (puma) {

    QUnit.module("Ecma6-Map-Set-And-WeakMap-WeakSet-Tests");

    skip("Map get method", function(assert) {
        var result = puma.evalPuma("let m = new Map(); let s = Symbol(); m.set('hello', 42); m.set(s, 34); m.get(s);");
        result.makeValue();
        assert.ok(result.success && result.value === 34);
    });

    skip("Map has method", function(assert) {
        var result = puma.evalPuma("let m = new Map(); let s = Symbol(); m.set('hello', 42); m.set(s, 34); m.has(s);");
        result.makeValue();
        assert.ok(result.success && result.value === true);
    });

    skip("Map stores unique keys, check of size", function(assert) {
        var result = puma.evalPuma("let m = new Map(); let s = Symbol(); m.set('hello', 42); m.set(s, 34); m.set('hello', 34); m.size;");
        result.makeValue();
        assert.ok(result.success && result.value === 2);
    });

    skip("Map delete method", function(assert) {
        var result = puma.evalPuma("let m = new Map(); let s = Symbol(); m.set('hello', 42); m.set(s, 34); m.delete('hello'); m.size;");
        result.makeValue();
        assert.ok(result.success && result.value === 1);
    });

    skip("Map clear method", function(assert) {
        var result = puma.evalPuma("let m = new Map(); let s = Symbol(); m.set('hello', 42); m.set(s, 34); m.clear(); m.size;");
        result.makeValue();
        assert.ok(result.success && result.value === 0);
    });

    skip("Set has method", function(assert) {
        var result = puma.evalPuma("let s = new Set(); s.add('hello'); s.has('hello');");
        result.makeValue();
        assert.ok(result.success && result.value === true);
    });

    skip("Set stores unique values, check of size", function(assert) {
        var result = puma.evalPuma("let s = new Set(); s.add('hello').add('goodbye').add('hello'); s.size;");
        result.makeValue();
        assert.ok(result.success && result.value === 2);
    });

    //Missing WeakMap and WeakSet tests
});