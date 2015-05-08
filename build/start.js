(function (root, factory) {
    var esprimaLib = '../thirdparty/esprima/esprima.js',
        escodegenLib;

    if (typeof define === 'function' && define.amd) {
        // Browser support
        escodegenLib = '../thirdparty/escodegen/escodegen.browser.js';

        deps = [
            escodegenLib,
            esprimaLib
        ];

        // AMD. Register as an anonymous module.
        define(deps, factory);
    } else if (typeof exports === 'object') {
        escodegenLib = '../node_modules/escodegen/escodegen.js';
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        deps = [
            escodegenLib,
            esprimaLib
        ];

        module.exports = factory.apply(null, deps);
    } else {
        // Browser globals
        root.pumaScript = factory(root.escodegen, root.esprima);
    }
}(this, function (escodegen, esprima) {

