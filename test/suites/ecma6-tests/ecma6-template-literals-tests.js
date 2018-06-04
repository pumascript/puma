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
    var result = puma.evalPuma("let customer = { name: 'Foo' }; let card = { amount: 7, product: 'Bar', unitprice: 42 }; let message = `Hello ${customer.name},
want to buy ${card.amount} ${card.product} for
a total of ${card.amount * card.unitprice} bucks?`; message;");
        result.makeValue();
        assert.ok(result.success && result.value === 'Hello Foo,\nwant to buy 7 Bar for\na total of 294 bucks?');
    });

});