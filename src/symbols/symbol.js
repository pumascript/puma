// Copyright (c) 2013 - present UTN-LIS

define([], function () {

    /**
     * @constructor
     */
    function Symbol(name, value) {
        this._value = value;
        this.name = name;

        Object.defineProperty(this, 'value', {
            get: function () {
                return this._value;
            },
            set: function (newValue) {
                this.updateMetaData(newValue);
                this._value = newValue;
            }
        });

        if ('initMetaData' in this)
            this.initMetaData();
    }

    Symbol.UNDEFINED = '__UNDEFINED__';

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

        Object.defineProperty(this, 'meta', {
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
        Symbol._updateMetaData(this.name, this._meta, newValue, 'Symbol');
    };

    /**
     * Helper function to register (type,count) pairs in meta-type dictionaries
     * @param symbolName {string} Name of the symbol that will be used if a warning is emmited
     * @param dictionary {object<string,number>} An object used as dictionary where the key is the typename and the value is the number of ocurrences.
     */
    Symbol._updateMetaData = function (symbolName, dictionary, newValue, errorStartString) {
        var type = typeof (newValue);
        if (dictionary[type] === undefined) {
            if (Symbol.EmitTypeWarnings && Object.keys(dictionary).length >= 1) {
                console.warn(errorStartString + ' "' + symbolName + '" takes more than one type in their lifetime.');
            }
            dictionary[type] = 1;
        } else {
            dictionary[type] ++;
        }
    };

    return Symbol;
});
