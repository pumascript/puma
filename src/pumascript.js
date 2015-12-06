/*global define, require */

require.config({
    paths: {
        'esprima': '../thirdparty/esprima/esprima',
        'escodegen': '../thirdparty/escodegen/escodegen.browser'
    }
});

/**
 * PumaScript development wrapper
 */
define('pumascript', ['../src/runtime'], function (PumaScript) {

    'use strict';
    
    return PumaScript;
});
