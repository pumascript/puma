// Copyright (c) 2013 - present UTN-LIS

/*global define, global */

define([], function () {
    var Global = {};

    if (typeof window === 'object') {
        Global = window;
    } else if (typeof global === 'object') {
        Global = global;
    }

    return Global;
});
