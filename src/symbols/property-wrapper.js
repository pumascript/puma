/*global define */

define([
    './symbol'
], function (Symbol) {

    /**
     * @constructor
     */
    function PropertyWrapper(obj, propertyName) {
        this._obj = obj;
        this._propertyName = propertyName;
    }
    
    PropertyWrapper.prototype = new Symbol();
    PropertyWrapper.prototype.constructor = PropertyWrapper;
    
    Object.defineProperty(PropertyWrapper.prototype, "value", {
        get: function () {
            return this._obj[this._propertyName];
        },
        set: function (newValue) {
            this._obj[this._propertyName] = newValue;
        }
    });

    Object.defineProperty(PropertyWrapper.prototype, "obj", {
        get: function () {
            return this._obj;
        }
    });

    return PropertyWrapper; /* exclude-build */
});
