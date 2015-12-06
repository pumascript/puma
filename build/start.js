(function (root, factory) {
    var esprimaLib = '../thirdparty/esprima/esprima.js';

    if (typeof define === 'function' && define.amd) {
        // Browser support
        deps = [
            '../thirdparty/escodegen/escodegen.browser.js',
            esprimaLib
        ];

        // AMD. Register as an anonymous module.
        define(deps, factory);
    } else if (typeof exports === 'object') {
        // Node
        deps = [
            require('escodegen'),
            require(esprimaLib)
        ];

        module.exports = factory.apply(null, deps);
    } else {
        // Browser globals
        root.pumaScript = factory(root.escodegen, root.esprima);
    }
}(this, function (escodegen, esprima) {

