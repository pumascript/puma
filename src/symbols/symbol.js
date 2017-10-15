// Copyright (c) 2013 - present UTN-LIS

define([
    '../inference'
], function (Inference) {

    /**
     * @constructor
     */
    function Symbol(name, value, loc) {
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
            this.initMetaData(value, loc);
    }

    Symbol.UNDEFINED = '__UNDEFINED__';

    Symbol.Undefined = new Symbol(Symbol.UNDEFINED, undefined);

    Symbol.prototype.isUndefined = function () {
        return this.name === Symbol.UNDEFINED;
    };

    Symbol.EmitTypeWarnings = true;

    Symbol.prototype.initMetaData = function (value, loc) {
        this._meta = {
            parameters: [],
            returns: []
        };

        if (loc) {
            var type = Inference.resolveType(value);

            this._meta.init = {
                loc: loc.start,
                type: type
            };

            this._meta.types = value ? [type] : [];
        }

        Object.defineProperty(this, 'meta', {
            get: function () {
                return this._meta;
            }
        });
    };

    /**
     * Register symbol meta-type information for the last assignation operation
     * @param value {any} New value being assigned to the symbol
     */
    Symbol.prototype.updateMetaData = function (value) {
        if (this._meta.init)
            Symbol._updateMetaData(this.name, value, this._meta.types, 'Symbol');
    };

    /**
     * Helper function for recording the inferred meta-type information
     * @param symbolName {string} Name of the symbol that will be used if a warning is emmited
     * @param symbolValue {any} New value being assigned to the symbol
     * @param dictionary {Array.<string>} Collection of inferred types the symbol has been assigned at runtime
     * @param errorPrefix {string} String to prefix to the message if a warning if emmited
     */
    Symbol._updateMetaData = function (symbolName, symbolValue, dictionary, warningPrefix) {
        // TODO: Differentiated meta update for different origins.
        var type = Inference.resolveType(symbolValue);

        // Check for initialization
        if (dictionary.length) {
            var oldType = dictionary[dictionary.length - 1];

            // Check if symbol type differs from the previous one
            if (type !== oldType) {
                if (Symbol.EmitTypeWarnings)
                    console.warn(warningPrefix + ' "' + symbolName + '" takes type {' + type + '}, previously {' + oldType + '}.');

                if (!~dictionary.indexOf(type)) {
                    // Save new type to the diccionary
                    dictionary.push(type);
                }

                // TODO: undefined and null warning
            }
        } else {
            dictionary.push(type);
        }
    };

    return Symbol;
});
