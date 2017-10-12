// Copyright (c) 2013 - present UTN-LIS

define([
    '../src/global',
    '../src/symbols/symbol',
    '../src/symbols/function-symbol'
], function (Global, Symbol, FunctionSymbol) {

    /**
     * @constructor
     */
    function State() {
        this._stackFrame = [];
        this._symbols = {};
        this._newFrameThisBinding = undefined;

        this.initializeDefaultSymbols();
    }

    State.prototype.initializeDefaultSymbols = function () {
        var pumaAst = new FunctionSymbol('pumaAst', [], null, true);
        pumaAst.isAstConstructionFunction = true;
        this.addSymbol('pumaAst', pumaAst);
        // TODO: should "this" be set to the global object?
        this.addSymbol('this', {});
    };

    State.prototype.addSymbol = function (name, value) {
        var symbol = new Symbol(name, value);
        if (this._symbols[name] !== undefined) {
            console.warn('Duplicated symbol name "' + name + '" in current scope. Old symbol was discarded.');
        }
        this._symbols[name] = symbol;
        return symbol;
    };

    State.prototype.getSymbol = function (name) {
        if (this._symbols[name] === undefined) {
            return this.findSymbolInStackFrame(name, this._stackFrame.length - 1);
        }
        else return this._symbols[name];
    };

    /**
     * Craft symbol but don't add it to the stack.
     */
    State.prototype.transientSymbol = function (name, value) {
        var symbol = new Symbol(name, value);
        if (this._symbols[name] !== undefined) {
            console.warn('Symbol already in scope.');
        }
        return symbol;
    };

    State.prototype.findSymbolInStackFrame = function (name, stackFrameIndex) {
        if (stackFrameIndex < 0 || this._stackFrame.length === 0) {
            if (Global[name] !== undefined) return new Symbol(name, Global[name]);
            return Symbol.Undefined;
        }
        var stackFrame = this._stackFrame[stackFrameIndex];
        if (stackFrame[name] === undefined) return this.findSymbolInStackFrame(name, stackFrameIndex - 1);
        return stackFrame[name];
    };

    State.prototype.pushStackFrame = function () {
        this._stackFrame[this._stackFrame.length] = this._symbols;
        this._symbols = {};

        if (this._newFrameThisBinding !== undefined) {
            this.addSymbol('this', this._newFrameThisBinding);
            this._newFrameThisBinding = undefined;
        }
    };

    State.prototype.popStackFrame = function () {
        if (this._stackFrame.length === 0) {
            console.warn('You are trying to pop a stack frame with an empty stack!');
            return;
        }
        this._symbols = this._stackFrame[this._stackFrame.length - 1];
        this._stackFrame.pop();
    };

    State.prototype.setNewFrameThisBinding = function (thisBinding) {
        this._newFrameThisBinding = thisBinding;
    };

    return State;
});
