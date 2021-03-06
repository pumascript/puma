// Copyright (c) 2013 - present UTN-LIS

/* eslint quotes: 0 */

/**
 *          PUMASCRIPT ECMA-10 TEST SUITE
 * @file: Executable Code and Execution Contexts Test Suite
 */

define(['pumascript'], function(puma) {

    QUnit.module("Section 10.1 - Executable Code and Execution Contexts");

    test("Use Strict global code", function (assert) {
        var result = puma.evalPuma("'use strict';var a = 1;var b = 3; a+b;");
        result.makeValue();
        assert.ok(result.success && 4 === result.value);
    });

    test("use strict function code", function (assert) {
        var result = puma.evalPuma("function strict(){'use strict';function nested(){return ' function';}return 'strict mode into'+nested();} strict();");
        result.makeValue();
        assert.ok(result.success && 'strict mode into function' === result.value);
    });

    QUnit.skip("Use strict eval code", function (assert) {
        var result = puma.evalPuma("var expresion = new String('2 + 2');eval(\"'use strict'; expresion.toString()\");");
        assert.ok(result.success && "2 + 2" === result.value);
    });

    QUnit.module("Section 10.2 - Executable Code and Execution Contexts");

    QUnit.skip("with function", function (assert) {
        var result = puma.evalPuma("var a, x, y;var r = 10; with (Math) {a = PI * r * r;x = r * cos(PI);y = r * sin(PI/2);}");
        result.makeValue();
        assert.ok(result.success && 10 === result.value);
    });
});