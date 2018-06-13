// Copyright (c) 2013 - present UTN-LIS

/* eslint quotes: 0, no-unused-vars: 0 */

/**
 *          PUMASCRIPT ECMA 6 TEMPLATE LITERALS SUITE
 * @file: Ecma6 Template literals expressions test suite for the language
 */
var test = QUnit.test;
var skip = QUnit.skip;

define(['pumascript'], function (puma) {

    QUnit.module("Ecma6-Template-Literals-Tests");

    skip("String interpolation", function(assert) {
        var result = puma.evalPuma("const customer = { name: 'Foo' }; const card = { amount: 7, product: 'Bar', unitprice: 42 }; const message = `Hello ${customer.name},\nwant to buy ${card.amount} ${card.product} for\na total of ${card.amount * card.unitprice} bucks?`; message;");
        result.makeValue();
        assert.ok(result.success && result.value === 'Hello Foo,\nwant to buy 7 Bar for\na total of 294 bucks?');
    });

    skip("Custom interpolation: strings", function(assert) {
        var result = puma.evalPuma("function get(strings, ...values){return strings} const bar=42; const baz=54; const quux='hi'; strings = get`http://example.com/foo?bar=${bar + baz}&quux=${quux}`; strings[0];");
        result.makeValue();
        assert.ok(result.success && result.value === 'http://example.com/foo?bar=');
    });

    skip("Custom interpolation: values", function(assert) {
        var result = puma.evalPuma("function get(strings, ...values){return values} const bar=42; const baz=54; const quux='hi'; values = get`http://example.com/foo?bar=${bar + baz}&quux=${quux}`; values[0];");
        result.makeValue();
        assert.ok(result.success && result.value === 96);
    });

    skip("Custom interpolation: raw string", function(assert) {
        var result = puma.evalPuma("function quux(strings, ...values) {return strings} const strings = quux`foo\n${ 42 }bar`; strings.raw[0];");
        result.makeValue();
        assert.ok(result.success && result.value === 'foo\\n');
    });

    skip("Raw string", function(assert) {
        var result = puma.evalPuma("String.raw `foo\n${ 42 }bar`;");
        result.makeValue();
        assert.ok(result.success && result.value === 'foo\\n42bar');
    });

});
