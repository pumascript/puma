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
 * @return {boolean} return true if callExpressionAst is changed, false otherwise.
 */
FirstPass.prototype.mergeMetaCallResult = function(result, callExpressionAst){
    // resolve to value if it's a symbol
    result.makeValue();
    var resultValue = result.value;
    
    if(resultValue !== null)
    {
        for (var attr in resultValue)
        {
            if (resultValue.hasOwnProperty(attr)) callExpressionAst[attr] = resultValue[attr];
        }
		return true;
    }
	return false;
};

FirstPass.prototype.findTemplateIds = function(ast, list, parentAst, propertyName){
    if(list === undefined) list = [];
    
    if(ast !== null)
    {
        if(ast.type === "Identifier" && ast.name.indexOf("$") === 0)
        {
            list.push({ id: ast, parent: parentAst, property: propertyName });
        }
        else
        {
            for(var i in ast)
            {
                if(typeof(ast[i]) === "object") this.findTemplateIds(ast[i], list, ast, i);
            }
        }
    }
    return list;
};

FirstPass.prototype.callAstConstruction = function(callExpressionAst, argumentsAst, state){
    var ast = null;
    var idsToReplace, i, id, idData, symbol;
    if(argumentsAst.length === 1) 
    {
        ast = pumaCloneAst(argumentsAst[0]);
        
        // replace $id in template with symbols in context
        idsToReplace = this.findTemplateIds(ast);
        for(i in idsToReplace)
        {
            idData = idsToReplace[i];
            id = idData.id.name.substring(1);
            
            symbol = state.getSymbol(id);
            if(symbol.isUndefined())
            {
                console.warn(PumaScript.Loc(idData.id) + 'Template parameter not found in scope "$' + id + '".');
            }
            else
            {
                idData.parent[idData.property] = symbol.value;
            }
        }
    }
    else
    {
        return defaultResult;
    }
    return new Result(true, ast);
};

/**
 * Creates a deep copy of the provided AST object. It must be a Puma AST.
 * @param {Object} ast Puma AST object that will be copied
 * @return {Object} Cloned object.
 */
function pumaCloneAst(ast){
    // TODO implement a faster clone function
	
	// Exclude the parent node so it doesn't create a circular reference
	replacer = function (key,value)	{
		if (key === "parent") return undefined;
		else return value;
	}
    return JSON.parse(JSON.stringify(ast, replacer));
};

/**
 * Find AST nodes by type attribute. Type attribute must use the same names than Esprima parser.
 * Returns an array with all the nodes. An empty array if none is found.
 *
 * @param {Object} ast AST node to search on.
 * @param {string} typeName The value of "type" property of the nodes to lookup
 * @retrun {Array} 
 */
function pumaFindByType(ast, typeName){
    var internalPumaFindByType = function(ast, typeName, list){
        if(ast !== null)
        {
            if(ast.type === typeName)
            {
                list.push(ast);
            }
            else
            {
                for(var i in ast)
                {
                    if(typeof(ast[i]) === "object") internalPumaFindByType(ast[i], typeName, list);
                }
            }
        }
        return list;
    };
    return internalPumaFindByType(ast, typeName, []);
}

/**
 * Find nodes inside an AST node. This method search using a chain of properties passed in "propertyChain" argument. A sample call is pumaFindByProperty("left.id.name", "foo") that will look for nodes with "left" properties which "id.name" sub-property has value "foo".
 * Returns an Array with all nodes matched with the property expression.
 *
 * @param {Object} ast AST node to search on.
 * @param {string} propertyChain A string with the chain of properties to look for. Link properties with a dot like in "id.name" will look for a property "id" with a sub property "name".
 * @param {*} value Value that will be compared with properties' value.
 * @param {Function=} compareFunction Optional comparison function. It must take two arguments "function(propertyValue, value){}" and return true when values matches. The second argument is the value passed as parameter.
 * @return {Array}
 */
function pumaFindByProperty(ast, propertyChain, value, compareFunction){
    var propertyList = propertyChain.split('.');
    var propertyLength = propertyList.length;
    var matchLength = propertyLength - 1;
    
    function matchProperty(ast, propertyList, value){
        var innerAst = ast;
        for(var i = 0; i < propertyLength; i++)
        {
            if(innerAst === null || innerAst === undefined) return false;
            innerAst = innerAst[propertyList[i]];
            if(i === matchLength && compareFunction === undefined && innerAst === value) return true;
            if(i === matchLength && compareFunction !== undefined && compareFunction(innerAst, value)) return true;
        }
        return false;
    }
    
    function internalPumaFindByProperty(ast, propertyList, value, list, compareFunction){
        if(ast !== null)
        {
            if(matchProperty(ast, propertyList, value, compareFunction))
            {
                list.push(ast);
            }
            else
            {
                for(var i in ast)
                {
                    if(typeof(ast[i]) === "object") internalPumaFindByProperty(ast[i], propertyList, value, list, compareFunction);
                }
            }
        }
        return list;
    }
    return internalPumaFindByProperty(ast, propertyList, value, [], compareFunction);
}
