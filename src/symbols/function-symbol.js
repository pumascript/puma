// Copyright (c) 2013 - present UTN-LIS

define([
    './symbol'
], function (Symbol) {

    /**
     * @constructor
     */
    function FunctionSymbol(name, parameters, body, isMeta, addToFunctionState) {
        this.name = name;
        this.parameters = parameters;
        this.body = body;
        this.isMeta = isMeta;
        this.initMetaData();
        this.addToFunctionState = addToFunctionState;
    }

    FunctionSymbol.prototype.initMetaData = Symbol.prototype.initMetaData;

    /**
     * Register actual arguments type information in Function meta-type information
     * @param actualArguments {Array<Result>} An array with the results of evaluation of each actual argument
     * @return {void}
     */
    FunctionSymbol.prototype.registerCallStart = function (actualArguments) {
        var n;
        var types;
        var actualArgumentValue;

        for (n = 0; n < actualArguments.length; n++) {
            types = this._meta.parameters[n];
            if (types === undefined) {
                types = {};
                this._meta.parameters[n] = types;
            }
            actualArgumentValue = actualArguments[n].value;
            Symbol._updateMetaData(this.name, types, actualArgumentValue, 'Parameter ' + n + ' of function');
        }
    };

    /**
     * Register return value type information in Function meta-type information
     * @param returnResult {Result} The Result object that last function call generated
     * @return {void}
     */
    FunctionSymbol.prototype.registerCallReturn = function (returnResult) {
        Symbol._updateMetaData(this.name, this._meta.returns, returnResult.value, 'Return type');
    };

    return FunctionSymbol;
});
