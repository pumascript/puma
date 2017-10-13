// Copyright (c) 2013 - present UTN-LIS

define(['pumascript', 'esprima'], function (puma, esprima) {

    module('7.2 White space');

    test('White space characters', function () {
        var result = puma.evalPuma(' var a = 1 ; a; ');
        result.makeValue();
        ok(result.success && 1 === result.value);
    });

    test('Tab characters', function () {
        var result = puma.evalPuma('   var a   =   1   ;   a;   ');
        result.makeValue();
        ok(result.success && 1 === result.value);
    });

    test('UTF spaces aceptation 1', function () {
        var result = puma.evalPuma('var a = \'a\u0009b\'; a;');
        result.makeValue();
        ok(result.success && 'a\tb' === result.value);
    });

    test('UTF spaces aceptation 2', function () {
        var result = puma.evalPuma('var a = \'a\u00A0b\'; a;');
        result.makeValue();
        ok(result.success && 'a\xA0b' === result.value);
    });

    test('UTF spaces aceptation 3', function () {
        var result = puma.evalPuma('var a = \'a\u000Bb\'; a;');
        result.makeValue();
        ok(result.success && 'a\x0Bb' === result.value);
    });

    test('UTF spaces aceptation 4', function () {
        var result = puma.evalPuma('var a = \'a\u000Cb\'; a;');
        result.makeValue();
        ok(result.success && 'a\fb' === result.value);
    });


    test('UTF spaces aceptation 5', function () {
        var result = puma.evalPuma('var a = \'a\u2000b\'; a;');
        result.makeValue();
        ok(result.success && 'a\u2000b' === result.value);
    });

    test('UTF spaces aceptation 6', function () {
        var result = puma.evalPuma('var a = \'a\u2001b\'; a;');
        result.makeValue();
        ok(result.success && 'a\u2001b' === result.value);
    });

    test('UTF spaces aceptation 7', function () {
        var result = puma.evalPuma('var a = \'a\u2002b\'; a;');
        result.makeValue();
        ok(result.success && 'a\u2002b' === result.value);
    });

    test('UTF spaces aceptation 8', function () {
        var result = puma.evalPuma('var a = \'a\u2003b\'; a;');
        result.makeValue();
        ok(result.success && 'a\u2003b' === result.value);
    });

    test('UTF spaces aceptation 9', function () {
        var result = puma.evalPuma('var a = \'a\u2004b\'; a;');
        result.makeValue();
        ok(result.success && 'a\u2004b' === result.value);
    });

    test('UTF spaces aceptation 10', function () {
        var result = puma.evalPuma('var a = \'a\u2005b\'; a;');
        result.makeValue();
        ok(result.success && 'a\u2005b' === result.value);
    });

    test('UTF spaces aceptation 11', function () {
        var result = puma.evalPuma('var a = \'a\u2006b\'; a;');
        result.makeValue();
        ok(result.success && 'a\u2006b' === result.value);
    });

    test('UTF spaces aceptation 12', function () {
        var result = puma.evalPuma('var a = \'a\u2007b\'; a;');
        result.makeValue();
        ok(result.success && 'a\u2007b' === result.value);
    });

    test('UTF spaces aceptation 13', function () {
        var result = puma.evalPuma('var a = \'a\u2008b\'; a;');
        result.makeValue();
        ok(result.success && 'a\u2008b' === result.value);
    });

    test('UTF spaces aceptation 14', function () {
        var result = puma.evalPuma('var a = \'a\u2009b\'; a;');
        result.makeValue();
        ok(result.success && 'a\u2009b' === result.value);
    });

    test('UTF spaces aceptation 15', function () {
        var result = puma.evalPuma('var a = \'a\u200Ab\'; a;');
        result.makeValue();
        ok(result.success && 'a\u200Ab' === result.value);
    });

    test('UTF spaces aceptation 16', function () {
        var result = puma.evalPuma('var a = \'a\u1680b\'; a;');
        result.makeValue();
        ok(result.success && 'a\u1680b' === result.value);
    });

    test('UTF spaces aceptation 17', function () {
        var result = puma.evalPuma('var a= \'a\u180Eb\'; a;');
        result.makeValue();
        ok(result.success && 'a\u180Eb' === result.value);
    });

    test('UTF spaces aceptation 18', function () {
        var result = puma.evalPuma('var a = \'a\u202Fb\'; a;');
        result.makeValue();
        ok(result.success && 'a\u202Fb' === result.value);
    });

    test('UTF spaces aceptation 19', function () {
        var result = puma.evalPuma('var a = \'a\u205Fb\'; a;');
        result.makeValue();
        ok(result.success && 'a\u205Fb' === result.value);
    });

    test('UTF spaces aceptation 20', function () {
        var result = puma.evalPuma('var a= \'a\u3000b\'; a;');
        result.makeValue();
        ok(result.success && 'a\u3000b' === result.value);
    });

    module('7.6 Identifier names and identifiers');

    test('Identifier names and identifiers 1', function () {
        var result = puma.evalPuma('var $a$b$ = 1; $a$b$;');
        result.makeValue();
        ok(result.success && 1 === result.value);
    });

    test('Identifier names and identifiers 2', function () {
        var result = puma.evalPuma('var _a_b_ = 1; _a_b_');
        result.makeValue();
        ok(result.success && 1 === result.value);
    });

    module('7.6.1 Reserved Words');

    test('break', function () {
        try {
            puma.evalPuma('var break=1;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 1: Unexpected token break');
    });

    test('do', function () {
        try {
            puma.evalPuma('var do=1;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 1: Unexpected token do');
    });

    test('instanceof', function () {
        try {
            puma.evalPuma('var instanceof=1;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 1: Unexpected token instanceof');
    });

    test('typeof', function () {
        try {
            puma.evalPuma('var typeof=1;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 1: Unexpected token typeof');
    });

    test('case', function () {
        try {
            puma.evalPuma('var case=1;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 1: Unexpected token case');
    });

    test('else', function () {
        try {
            puma.evalPuma('var else=1;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 1: Unexpected token else');
    });

    test('new', function () {
        try {
            puma.evalPuma('var new=1;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 1: Unexpected token new');
    });

    test('var', function () {
        try {
            puma.evalPuma('var var=1;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 1: Unexpected token var');
    });

    test('catch', function () {
        try {
            puma.evalPuma('var catch=1;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 1: Unexpected token catch');
    });

    test('finally', function () {
        try {
            puma.evalPuma('var finally=1;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 1: Unexpected token finally');
    });

    test('return', function () {
        try {
            puma.evalPuma('var return=1;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 1: Unexpected token return');
    });

    test('void', function () {
        try {
            puma.evalPuma('var void=1;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 1: Unexpected token void');
    });

    test('continue', function () {
        try {
            puma.evalPuma('var continue=1;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 1: Unexpected token continue');
    });

    test('for', function () {
        try {
            puma.evalPuma('var for=1;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 1: Unexpected token for');
    });

    test('switch', function () {
        try {
            puma.evalPuma('var switch=1;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 1: Unexpected token switch');
    });

    test('while', function () {
        try {
            puma.evalPuma('var while=1;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 1: Unexpected token while');
    });

    test('debugger', function () {
        try {
            puma.evalPuma('var debugger=1;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 1: Unexpected token debugger');
    });

    test('function', function () {
        try {
            puma.evalPuma('var function=1;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 1: Unexpected token function');
    });

    test('this', function () {
        try {
            puma.evalPuma('var this=1;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 1: Unexpected token this');
    });

    test('with', function () {
        try {
            puma.evalPuma('var with=1;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 1: Unexpected token with');
    });

    test('default', function () {
        try {
            puma.evalPuma('var default=1;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 1: Unexpected token default');
    });

    test('if', function () {
        try {
            puma.evalPuma('var if=1;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 1: Unexpected token if');
    });

    test('throw', function () {
        try {
            puma.evalPuma('var throw=1;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 1: Unexpected token throw');
    });

    test('delete', function () {
        try {
            puma.evalPuma('var delete=1;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 1: Unexpected token delete');
    });

    test('in', function () {
        try {
            puma.evalPuma('var in=1;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 1: Unexpected token in');
    });

    test('try', function () {
        try {
            puma.evalPuma('var try=1;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 1: Unexpected token try');
    });

    module('7.6.1.2 Future reserved words:');

    test('class', function () {
        try {
            puma.evalPuma('var class=1;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 1: Unexpected reserved word');
    });

    test('enum', function () {
        try {
            puma.evalPuma('var enum=1;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 1: Unexpected reserved word');
    });

    test('without use strict: extends', function () {
        try {
            puma.evalPuma('var extends=1;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 1: Unexpected reserved word');
    });

    test('super', function () {
        try {
            puma.evalPuma('var super=1;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 1: Unexpected reserved word');
    });

    //throws "Unexpected token const"
    QUnit.skip('const', function () {
        try {
            puma.evalPuma('var const=1;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 1: Unexpected reserved word');
    });

    test('export', function () {
        try {
            puma.evalPuma('var export=1;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 1: Unexpected reserved word');
    });

    test('import', function () {
        try {
            puma.evalPuma('var import=1;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 1: Unexpected reserved word');
    });

    //The next future reserved words must work unless used with 'use strict'
    test('with use strict: implements', function () {
        try {
            puma.evalPuma('\'use strict\' \n var implements=1;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 2: Use of future reserved word in strict mode');
    });

    test('without use strict: implements', function () {
        var result = puma.evalPuma('var implements = 1; implements;');
        result.makeValue();
        ok(result.success && 1 === result.value);
    });

    test('with use strict: private', function () {
        try {
            puma.evalPuma('\'use strict\' \n var private = 1; private;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 2: Use of future reserved word in strict mode');
    });

    test('without use strict: private', function () {
        var result = puma.evalPuma('var private = 1; private;');
        result.makeValue();
        ok(result.success && 1 === result.value);
    });

    test('with use strict: public', function () {
        try {
            puma.evalPuma('\'use strict\' \n var public = 1; public;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 2: Use of future reserved word in strict mode');
    });

    test('without use strict: public', function () {
        var result = puma.evalPuma('var public = 1; public;');
        result.makeValue();
        ok(result.success && 1 === result.value);
    });

    test('with use strict: interface', function () {
        try {
            puma.evalPuma('\'use strict\' \n var interface = 1; interface;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 2: Use of future reserved word in strict mode');
    });

    test('without use strict: interface', function () {
        var result = puma.evalPuma('var interface = 1; interface;');
        result.makeValue();
        ok(result.success && 1 === result.value);
    });

    test('with use strict: package', function () {
        try {
            puma.evalPuma('\'use strict\' \n var package = 1; package;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 2: Use of future reserved word in strict mode');
    });

    test('without use strict: package', function () {
        var result = puma.evalPuma('var package = 1; package;');
        result.makeValue();
        ok(result.success && 1 === result.value);
    });

    test('with use strict: protected', function () {
        try {
            puma.evalPuma('\'use strict\' \n var protected = 1; protected;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 2: Use of future reserved word in strict mode');
    });

    test('without use strict: protected', function () {
        var result = puma.evalPuma('var protected = 1; protected;');
        result.makeValue();
        ok(result.success && 1 === result.value);
    });

    test('with use strict: static', function () {
        try {
            puma.evalPuma('\'use strict\' \n var static = 1; static;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 2: Use of future reserved word in strict mode');
    });

    test('without use strict: static', function () {
        var result = puma.evalPuma('var static = 1; static;');
        result.makeValue();
        ok(result.success && 1 === result.value);
    });


    test('with use strict: yield', function () {
        try {
            puma.evalPuma('\'use strict\' \n var yield = 1; yield;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 2: Use of future reserved word in strict mode');
    });

    //Throws Uncaught Error: Unexpected token
    QUnit.skip('without use strict: yield', function () {
        var result = puma.evalPuma('var yield = 1; yield;');
        result.makeValue();
        ok(result.success && 1 === result.value);
    });

    test('with use strict: let', function () {
        try {
            puma.evalPuma('\'use strict\' \n var let = 1; let;');
        } catch (e) {
            var result = e.message;
        }
        ok(result === 'Line 2: Use of future reserved word in strict mode');
    });

    //Throws "Unexpected token let"
    QUnit.skip('without use strict: let', function () {
        var result = puma.evalPuma('var let = 1; let;');
        result.makeValue();
        ok(result.success && 1 === result.value);
    });

    module('7.8.2 Boolean Literals');

    test('true', function () {
        var result = puma.evalPuma('var a = Boolean(true); a;');
        result.makeValue();
        ok(result.success && true === result.value);
    });

    test('false', function () {
        var result = puma.evalPuma('var a = Boolean(false); a;');
        result.makeValue();
        ok(result.success && false === result.value);
    });

    module('7.8.3 Numeric Literals');

    test('hex numbers: 0', function () {
        var result = puma.evalPuma('var a = false; if (0x0 === 0) a = true;');
        result.makeValue();
        ok(result.success && true === result.value);
    });

    test('hex numbers: 1', function () {
        var result = puma.evalPuma('var a = false; if (0x1 === 1) a = true;');
        result.makeValue();
        ok(result.success && true === result.value);
    });

    test('hex numbers: 2', function () {
        var result = puma.evalPuma('var a = false; if (0x2 === 2) a = true;');
        result.makeValue();
        ok(result.success && true === result.value);
    });

    test('hex numbers: 3', function () {
        var result = puma.evalPuma('var a = false; if (0x3 === 3) a = true;');
        result.makeValue();
        ok(result.success && true === result.value);
    });

    test('hex numbers: 4', function () {
        var result = puma.evalPuma('var a = false; if (0x4 === 4) a = true;');
        result.makeValue();
        ok(result.success && true === result.value);
    });

    test('hex numbers: 5', function () {
        var result = puma.evalPuma('var a = false; if (0x5 === 5) a = true;');
        result.makeValue();
        ok(result.success && true === result.value);
    });

    test('hex numbers: 6', function () {
        var result = puma.evalPuma('var a = false; if (0x6 === 6) a = true;');
        result.makeValue();
        ok(result.success && true === result.value);
    });

    test('hex numbers: 7', function () {
        var result = puma.evalPuma('var a = false; if (0x7 === 7) a = true;');
        result.makeValue();
        ok(result.success && true === result.value);
    });

    test('hex numbers: 8', function () {
        var result = puma.evalPuma('var a = false; if (0x8 === 8) a = true;');
        result.makeValue();
        ok(result.success && true === result.value);
    });

    test('hex numbers: 9', function () {
        var result = puma.evalPuma('var a = false; if (0x9 === 9) a = true;');
        result.makeValue();
        ok(result.success && true === result.value);
    });

    test('hex numbers: A', function () {
        var result = puma.evalPuma('var a = false; if (0xA === 10) a = true;');
        result.makeValue();
        ok(result.success && true === result.value);
    });

    test('hex numbers: B', function () {
        var result = puma.evalPuma('var a = false; if (0xB === 11) a = true;');
        result.makeValue();
        ok(result.success && true === result.value);
    });

    test('hex numbers: C', function () {
        var result = puma.evalPuma('var a = false; if (0xC === 12) a = true;');
        result.makeValue();
        ok(result.success && true === result.value);
    });

    test('hex numbers: D', function () {
        var result = puma.evalPuma('var a = false; if (0xD === 13) a = true;');
        result.makeValue();
        ok(result.success && true === result.value);
    });

    test('hex numbers: E', function () {
        var result = puma.evalPuma('var a = false; if (0xE === 14) a = true;');
        result.makeValue();
        ok(result.success && true === result.value);
    });

    test('hex numbers: F', function () {
        var result = puma.evalPuma('var a = false; if (0xF === 15) a = true;');
        result.makeValue();
        ok(result.success && true === result.value);
    });

    module('7.9 Automatic Semicolon Insertion');

    test('Automatic Semicolon Insertion 1', function () {
        var result = puma.evalPuma('var \n x');
        ok(result.success);
    });

    test('Automatic Semicolon Insertion 2', function () {
        var result = puma.evalPuma('{1 \n 2 } 3');
        ok(result.success);
    });

    test('Automatic Semicolon Insertion 3', function () {
        var result = puma.evalPuma('var x \n = 1; x;');
        result.makeValue();
        ok(result.success && 1 === result.value);
    });

    test('Automatic Semicolon Insertion 4', function () {
        var result = puma.evalPuma('var x = \n 1; x;');
        result.makeValue();
        ok(result.success && 1 === result.value);
    });

    test('Automatic Semicolon Insertion 5', function () {
        var result = puma.evalPuma('var x \n x = 1');
        result.makeValue();
        ok(result.success && 1 === result.value);
    });

    test('Automatic Semicolon Insertion 6', function () {
        var result = puma.evalPuma('var a = 1; var b = 1; a \n ++ \n b');
        result.makeValue();
        ok(result.success && 2 === result.value);
    });

});