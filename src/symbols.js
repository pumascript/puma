/*global define, module, require, global, console */
define([], function () {

    'use strict';

    /**
     * @constructor
     */
    function Symbol(name, value) {
        this._value = value;
        this.name = name;

        Object.defineProperty(this, "value", {
            get: function () {
                return this._value;
            },
            set: function (newValue) {
                this.updateMetaData(newValue);
                this._value = newValue;
            }
        });

        if ("initMetaData" in this)
            this.initMetaData();
    }

    Symbol.UNDEFINED = "__UNDEFINED__";

    Symbol.Undefined = new Symbol(Symbol.UNDEFINED, undefined);

    Symbol.EmitTypeWarnings = false;

    Symbol.prototype.isUndefined = function () {
        return this.name === Symbol.UNDEFINED;
    };

    Symbol.prototype.initMetaData = function () {
        this._meta = {
            parameters: [],
            returns: {}
        };

        Object.defineProperty(this, "meta", {
            get: function () {
                return this._meta;
            }
        });
    };

    /**
     * Register symbol meta-type information for last assignation operation
     * @param newValue {object} actual value that will be assigned to the symbol
     */
    Symbol.prototype.updateMetaData = function (newValue) {
        Symbol._updateMetaData(this.name, this._meta, newValue, "Symbol");
    };

    /**
     * Helper function to register (type,count) pairs in meta-type dictionaries
     * @param symbolName {string} Name of the symbol that will be used if a warning is emmited
     * @param dictionary {object<string,number>} An object used as dictionary where the key is the typename and the value is the number of ocurrences.
     */
    Symbol._updateMetaData = function (symbolName, dictionary, newValue, errorStartString) {
        var type = typeof(newValue);
        if (dictionary[type] === undefined) {
            if (Symbol.EmitTypeWarnings && Object.keys(dictionary).length >= 1) {
                console.warn(errorStartString + " \"" + symbolName + "\" takes more than one type in their lifetime.");
            }
            dictionary[type] = 1;
        }
        else {
            dictionary[type]++;
        }
    };


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
            Symbol._updateMetaData(this.name, types, actualArgumentValue, "Parameter " + n + " of function");
        }
    };

    /**
     * Register return value type information in Function meta-type information
     * @param returnResult {Result} The Result object that last function call generated
     * @return {void}
     */
    FunctionSymbol.prototype.registerCallReturn = function (returnResult) {
        Symbol._updateMetaData(this.name, this._meta.returns, returnResult.value, "Return type");
    };

    /**
     * @constructor
     */
    function PropertyWrapper(obj, propertyName) {
        this._obj = obj;
        this._propertyName = propertyName;
        Object.defineProperty(this, "value", {
            get: function () {
                return this._obj[this._propertyName];
            },
            set: function (newValue) {
                this._obj[this._propertyName] = newValue;
            }
        });
        Object.defineProperty(this, "obj", {
            get: function () {
                return this._obj;
            }
        });
    }

    PropertyWrapper.prototype = new Symbol();
    PropertyWrapper.prototype.constructor = PropertyWrapper;

    var exports = {
        Symbol: Symbol,
        FunctionSymbol: FunctionSymbol,
        PropertyWrapper: PropertyWrapper
    };

    return exports;
  });
