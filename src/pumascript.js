// Copyright (c) 2013 - present UTN-LIS

require.config({
    paths: {
        'esprima': '../node_modules/esprima/dist/esprima',
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
