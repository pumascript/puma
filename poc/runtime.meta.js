Symbol.EmitTypeWarnings = false;

Symbol.prototype.initMetaData = function(){
    this._meta = {
        parameters: [],
        returns: {}
    };
    Object.defineProperty(this, "meta", {
        get : function(){ 
            return this._meta;
        },
    });    
};

Symbol.Undefined = new Symbol(Symbol.UNDEFINED, "undefined");

/**
 * Register symbol meta-type information for last assignation operation
 * @param newValue {object} actual value that will be assigned to the symbol
 */
Symbol.prototype.updateMetaData = function(newValue){
    Symbol._updateMetaData(this.name, this._meta, newValue, "Symbol");
};

/**
 * Helper function to register (type,count) pairs in meta-type dictionaries
 * @param symbolName {string} Name of the symbol that will be used if a warning is emmited
 * @param dictionary {object<string,number>} An object used as dictionary where the key is the typename and the value is the number of ocurrences.
 */
Symbol._updateMetaData = function(symbolName, dictionary, newValue, errorStartString){
    var type = typeof(newValue);
    if(dictionary[type] === undefined)
    {
        if(Symbol.EmitTypeWarnings && Object.keys(dictionary).length >= 1)
        {
            console.warn(errorStartString + " \"" + symbolName + "\" takes more than one type in their lifetime.");
        }
        dictionary[type] = 1;
    }
    else
    {
        dictionary[type]++;
    }
};

FunctionSymbol.prototype.initMetaData = Symbol.prototype.initMetaData;

/**
 * Register actual arguments type information in Function meta-type information
 * @param actualArguments {Array<Result>} An array with the results of evaluation of each actual argument
 * @return {void}
 */
FunctionSymbol.prototype.registerCallStart = function(actualArguments){
    var n;
    var types;
    var actualArgumentValue;
    
    for(n = 0; n < actualArguments.length; n++)
    {
        types = this._meta.parameters[n];
        if(types === undefined)
        {
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
FunctionSymbol.prototype.registerCallReturn = function(returnResult){
    Symbol._updateMetaData(this.name, this._meta.returns, returnResult.value, "Return type");
};

/**
 * Merges the result returned by a meta function call with the function call context.
 * @param {Result} result Result object returned by the meta function call
 * @param {*} callExpressionAst Original Esprima call expression node.
 */
FirstPass.prototype.mergeMetaCallResult = function(result, callExpressionAst){
    var resultValue = result.value;
    if(resultValue !== null)
    {
        for (var attr in resultValue)
        {
            if (resultValue.hasOwnProperty(attr)) callExpressionAst[attr] = resultValue[attr];
        }
    }
};
