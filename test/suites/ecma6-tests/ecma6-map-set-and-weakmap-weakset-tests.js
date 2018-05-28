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
        var result = puma.evalPuma("let m = new Map(); let s = Symbol(); m.set('hello', 42); m.set(s, 34); m.get(s) === 34");
        assert.equal(result.value, true);
	});
	
	skip("Map has method", function(assert) {
        var result = puma.evalPuma("let m = new Map(); let s = Symbol(); m.set('hello', 42); m.set(s, 34); m.has(s) === true");
        assert.equal(result.value, true);
	});
	
	skip("Map stores unique keys, check of size", function(assert) {
        var result = puma.evalPuma("let m = new Map(); let s = Symbol(); m.set('hello', 42); m.set(s, 34); m.set('hello', 34); m.size === 2");
        assert.equal(result.value, true);
	});
	
	skip("Map delete method", function(assert) {
        var result = puma.evalPuma("let m = new Map(); let s = Symbol(); m.set('hello', 42); m.set(s, 34); m.delete('hello'); m.size === 1");
        assert.equal(result.value, true);
	});
	
	skip("Map clear method", function(assert) {
        var result = puma.evalPuma("let m = new Map(); let s = Symbol(); m.set('hello', 42); m.set(s, 34); m.clear(); m.size === 0");
        assert.equal(result.value, true);
	});
	
	skip("Set has method", function(assert) {
		var result = puma.evalPuma("let s = new Set(); s.add('hello'); s.has('hello') === true;");
        assert.equal(result.value, true);
	});
	
	skip("Set stores unique values, check of size", function(assert) {
		var result = puma.evalPuma("let s = new Set(); s.add('hello').add('goodbye').add('hello'); s.size === 2;");
        assert.equal(result.value, true);
	});
	
});		