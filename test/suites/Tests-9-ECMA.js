// Copyright (c) 2013 - present UTN-LIS

define(['pumascript'], function(puma) {

    QUnit.module("9.2 ToBoolean");

    test("toBoolean(undefined) conversion test", function (assert) {
    	var result = puma.evalPuma("Boolean(undefined)");
    	assert.ok(result.success && false === result.value, "Pass!");
    });

    test("toBoolean(null) conversion test", function (assert) {
        var result = puma.evalPuma("Boolean(null)");
        assert.ok(result.success && false === result.value, "Pass!");
    });

    test("toBoolean(true) conversion test", function (assert) {
        var result = puma.evalPuma("Boolean(true)");
        assert.ok(result.success && true === result.value, "Pass!");
    });

    test("toBoolean(false) conversion test", function (assert) {
        var result = puma.evalPuma("Boolean(false)");
        assert.ok(result.success && false === result.value, "Pass!");
    });

    test("toBoolean(number) conversion test", function (assert) {
        var result = puma.evalPuma("Boolean(2)");
        assert.ok(result.success && true === result.value, "Pass!");
    });

    test("toBoolean(string) conversion test", function (assert) {
        var result = puma.evalPuma("Boolean('hola')");
        assert.ok(result.success && true === result.value, "Pass!");
    });

    test("toBoolean(object) conversion test", function (assert) {
        var result = puma.evalPuma("Boolean(Object())");
        assert.ok(result.success && true === result.value, "Pass!");
    });

    QUnit.module("9.3 ToNumber");

    test("toNumber(undefined) conversion test", function (assert) {
        var result = puma.evalPuma("Number(undefined)");
        assert.ok(result.success && typeof NaN ===  typeof result.value, "Pass!");
    });

    test("toNumber(null) conversion test", function (assert) {
        var result = puma.evalPuma("Number(null)");
        assert.ok(result.success && 0 === result.value, "Pass!");
    });

    test("toNumber(true) conversion test", function (assert) {
        var result = puma.evalPuma("Number(true)");
        assert.ok(result.success && 1 === result.value, "Pass!");
    });

    test("toNumber(false) conversion test", function (assert) {
        var result = puma.evalPuma("Number(false)");
        assert.ok(result.success && 0 === result.value, "Pass!");
    });

    test("toNumber(1) conversion test", function (assert) {
        var result = puma.evalPuma("Number(1)");
        assert.ok(result.success && 1 === result.value, "Pass!");
    });

    test("toNumber(string) conversion test", function (assert) {
        var result = puma.evalPuma("Number('hi')");
        assert.ok(result.success && typeof NaN === typeof result.value, "Pass!");
    });

    test("toNumber(Object()) conversion test", function (assert) {
        var result = puma.evalPuma("Number(Object())");
        assert.ok(result.success && typeof NaN === typeof result.value, "Pass!");
    });

    QUnit.module("9.4 ToInteger");

    test("parseInt(0) conversion test", function (assert) {
        var result = puma.evalPuma("parseInt(0)");
        assert.ok(result.success && 0 === result.value, "Pass!");
    });

    test("parseInt(NaN) conversion test", function (assert) {
        var result = puma.evalPuma("parseInt(NaN)");
        assert.ok(result.success && typeof NaN === typeof result.value, "Pass!");
    });

    QUnit.module("9.8 ToString");

    QUnit.skip("toString(undefined) conversion test", function (assert) {
        var result = puma.evalPuma("toString(undefined)");
        assert.ok(result.success && typeof 'object' === result.value, "Pass!");
    });

    QUnit.skip("toString(null) conversion test", function (assert) {
        var result = puma.evalPuma("toString(null)");
        assert.ok(result.success && '[object Undefined]' === result.value, "Pass!");
    });

});
