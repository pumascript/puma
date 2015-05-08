/*global define, module, require, global, console */
define([], function (Symbol, FunctionSymbol) {

    var Global = {};

    if (typeof window === 'object') {
        Global = window;
    } else if (typeof global === 'object') {
        Global = global;
    }

    return Global; /* exclude-build */
});
