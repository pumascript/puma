// Copyright (c) 2013 - present UTN-LIS

define([
    './symbol'
], function (Symbol) {

    /**
     * @constructor
     */
    function PropertyWrapper(obj, propertyName) {
        this._obj = obj;
        this._propertyName = propertyName;

        Object.defineProperty(this, 'value', {
            get: function () {
                return this._obj[this._propertyName];
            },
            set: function (newValue) {
                this._obj[this._propertyName] = newValue;
            }
        });

        Object.defineProperty(this, 'obj', {
            get: function () {
                return this._obj;
            }
        });
    }

    PropertyWrapper.prototype = new Symbol();
    PropertyWrapper.prototype.constructor = PropertyWrapper;

    return PropertyWrapper;
});
