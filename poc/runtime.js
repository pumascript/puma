Result = (function(){
    function Result(success, value){
        this.success = success;
        this.value = value;
    }
    Result.prototype.failed = function(){
        return this.success !== true;
    };
    Result.prototype.makeValue = function(){
        if(this.value instanceof Symbol)
            this.value = this.value.value;
    };
    Result.prototype.isReturnResult = function(){
        return this._isReturnResult === true;
    };
    Result.prototype.setIsReturnResult = function(value){
        return this._isReturnResult = value;
    };
    
    return Result;
})();

FunctionSymbol = (function(){
    function FunctionSymbol(name, parameters, body, isMeta, addToFunctionState)
    {
        this.name = name;
        this.parameters = parameters;
        this.body = body;
        this.isMeta = isMeta;
        this.initMetaData();
        this.addToFunctionState = addToFunctionState;
    }
    
    return FunctionSymbol;
})();

Symbol = (function(){    
    function Symbol(name, value)
    {
        this._value = value;
        Object.defineProperty(this, "value", {
            get : function(){ 
                return this._value; 
            },
            set : function(newValue){ 
                this.updateMetaData(newValue);
                this._value = newValue; 
            }
        });
        this.name = name;
        
        if ("initMetaData" in this)
            this.initMetaData();
    }
    
    Symbol.UNDEFINED = "__UNDEFINED__";
    
    Symbol.prototype.isUndefined = function(){
        return this.name === Symbol.UNDEFINED;
    };
    
    return Symbol;
})();

Symbol.Undefined = new Symbol(Symbol.UNDEFINED, undefined);

PropertyWrapper = (function(){
    PropertyWrapper.prototype = new Symbol();
    PropertyWrapper.prototype.constructor = PropertyWrapper;

    function PropertyWrapper(obj, propertyName)
    {
        this._obj = obj;
        this._propertyName = propertyName;
        Object.defineProperty(this, "value", {
            get : function(){
                return this._obj[this._propertyName];
            },
            set : function(newValue){
                this._obj[this._propertyName] = newValue;
            }
        });
        Object.defineProperty(this, "obj", {
            get : function(){
                return this._obj;
            }
        });
    }
    
    return PropertyWrapper
})();

State = (function(){
    function State()
    {
        this._stackFrame = [];
        this._symbols = {};
        this.initializeDefaultSymbols();
    }
    
    State.prototype.initializeDefaultSymbols = function(){
        var pumaAst = new FunctionSymbol("pumaAst", [], null, true);
        pumaAst.isAstConstructionFunction = true;
        this.addSymbol("pumaAst", pumaAst);
    };
    
    State.prototype.addSymbol = function(name, value){
        if(value === undefined) value = null;
        var symbol = new Symbol(name, value);
        if(this._symbols[name] !== undefined)
        {
            console.warn("Duplicated symbol name \"" + name + "\" in current scope. Old symbol was discarded.");
        }
        this._symbols[name] = symbol;
        return symbol;
    };
    
    State.prototype.getSymbol = function(name){
        if(this._symbols[name] === undefined)
        {
            return this.findSymbolInStackFrame(name, this._stackFrame.length - 1);
        }
        else return this._symbols[name];
    };
    
    State.prototype.findSymbolInStackFrame = function(name, stackFrameIndex){
        if(stackFrameIndex < 0 || this._stackFrame.length === 0)
        {
            if(window[name] !== undefined) return new Symbol(name, window[name]);
            return Symbol.Undefined;
        }
        var stackFrame = this._stackFrame[stackFrameIndex];
        if(stackFrame[name] === undefined) return this.findSymbolInStackFrame(name, stackFrameIndex - 1);
        return stackFrame[name];
    };
    
    State.prototype.pushStackFrame = function(){
        this._stackFrame[this._stackFrame.length] = this._symbols;
        this._symbols = {};
    };
    
    State.prototype.popStackFrame = function(){
        if(this._stackFrame.length === 0)
        {
            console.warn("You are trying to pop a stack frame with an empty stack!");
            return;
        }
        this._symbols = this._stackFrame[this._stackFrame.length - 1];
        this._stackFrame.pop();
    };
    
    return State;
})();

FirstPass = (function(){
    function FirstPass(programAst)
    {
        this._metaComments = [];
        this._lastStatementLoc = {"line": 0, "column": 0};
        this._programAst = programAst;
    }
    
    var defaultResult = new Result(false, null);
	var emptyResult = new Result(true, null);
    
    FirstPass.prototype.acceptArray = function(arrayNodes, state){
        var result = defaultResult;
        for(var i = 0; i < arrayNodes.length; i++)
        {
            result = this.accept(arrayNodes[i], state);
            if(result.isReturnResult()) break;
        }
        return result;
    };
    
    FirstPass.prototype.run = function(state){
        return this.accept(this._programAst, state);
    };
    
    FirstPass.prototype.accept = function(ast, state){
        if(ast === undefined || ast === null) throw "invalid call to accept with null ast.";
    
        var nodeType = ast.type;
        var nodes;
        var result = defaultResult;
        
        // TODO order alphabetically
        switch(nodeType)
        {
        case "Program":
            result = this.visitProgram(ast, state);
            break;
        case "ExpressionStatement":
            result = this.accept(ast.expression, state);
            break;
        case "BinaryExpression":
            result = this.visitBinaryExpression(ast, state);
            break;
        case "AssignmentExpression":
            result = this.visitAssignmentExpression(ast, state);
            break;
        case "VariableDeclaration":
            result = this.visitVariableDeclaration(ast, state);
            break;
        case "VariableDeclarator":
            result = this.visitVariableDeclarator(ast, state);
            break;
        case "CallExpression":
            result = this.visitCallExpression(ast, state);
            break;
        case "MemberExpression":
            result = this.visitMemberExpression(ast, state);
            break;
        case "FunctionExpression":
            result = this.visitFunctionExpression(ast, state);
            break;
        case "FunctionDeclaration":
            result = this.visitFunctionDeclaration(ast, state);
            break;
        case "BlockStatement":
            result = this.visitBlockStatement(ast, state);
            break;
        case "Identifier":
            result = this.visitIdentifier(ast, state);
            break;
        case "Literal":
            result = this.visitLiteral(ast, state);
            break;
        case "UnaryExpression":
            result = this.visitUnaryExpression(ast, state);
            break;
        case "IfStatement":
            result = this.visitIfStatement(ast, state);
            break;
		case "ForStatement":
            result = this.visitForStatement(ast, state);
            break;
        case "ReturnStatement":
            result = this.visitReturnStatement(ast, state);
            break;
        case "Block":
            result = this.visitComment(ast,state);
            break;
        case "UpdateExpression":
            result = this.visitUpdateExpression(ast,state);
            break;
        case "WhileStatement":
            result = this.visitWhileStatement(ast,state);
            break;
        case "ObjectExpression":
            result = this.visitObjectExpression(ast, state);
            break;
        case "ArrayExpression":
            result = this.visitArrayExpression(ast, state);
            break;
        case "LogicalExpression":
            result = this.visitBinaryExpression(ast, state);
            break;
        }
        
        this._lastStatementLoc = ast.loc.end;
        return result;
    };
    
    FirstPass.prototype.visitObjectExpression = function(ast, state){
        var propertiesCount = ast.properties.length;
        var propertiesAst = ast.properties;
        var resultValue = {};
        for(var i = 0; i < propertiesCount; i++)
        {
            var propertyAst = propertiesAst[i];
            var propertyName; 
            if(propertyAst.key.type === "Literal")
            {
                propertyName = propertyAst.key.value;
            }
            else if(propertyAst.key.type === "Identifier")
            {
                propertyName = propertyAst.key.name;
            }
            else
            {
                console.warn(PumaScript.Loc(propertyAst) + "Error executing object expression. Property name not found!");
            }
            
            var propertyValue = this.accept(propertyAst.value, state);
            if(propertyValue.success)
            {
                propertyValue.makeValue();
                resultValue[propertyName] = propertyValue.value;
            }
            else
            {
                resultValue[propertyName] = undefined;
            }
        }
        return new Result(true, resultValue);
    };
            
    FirstPass.prototype.visitProgram = function(ast, state){
        if(ast.comments) {
            this.acceptArray(ast.comments, state);
            this._lastStatementLoc.column = 0;
            this._lastStatementLoc.line = 0;
        }
        return this.acceptArray(ast.body, state);
    };
    
    FirstPass.prototype.visitBlockStatement = function(ast, state){
        return this.acceptArray(ast.body, state);
    };
    
    FirstPass.prototype.visitMemberExpression = function(ast, state){
        var objResult = this.accept(ast.object, state);
        if (objResult.failed()) return defaultResult;
        objResult.makeValue();
        
        var obj = objResult.value;
        var propertyName = undefined;
        var propertyResult = undefined;
        
        // TODO check ECMAScript standard for additional cases when evaluating member expression
        if(ast.property.type === 'Identifier' && ast.property.name in obj)
        {
            propertyName = ast.property.name;
        }
        else
        {
            propertyResult = this.accept(ast.property, state);
            propertyResult.makeValue();
            
            if(propertyResult.value === undefined)
            {
                propertyName = ast.property.name;
            }
            else
            {
                propertyName = propertyResult.value;
            }
        }
        
        if (!(propertyName in obj))
            obj[propertyName] = undefined;
        
        var wrapper = new PropertyWrapper(obj, propertyName);
        return new Result(true, wrapper);
    };
    
    FirstPass.prototype.visitFunctionExpression = function(ast, state){
        var functionName = undefined;
        var addToFunctionState = false;
        
        if (ast.id !== null)
        {
            functionName = ast.id.name;
            addToFunctionState = true;
        }
        
        var functionSymbol = new FunctionSymbol(functionName, ast.params, ast.body, false, addToFunctionState)
        return new Result(true, functionSymbol);
    };
    
    FirstPass.prototype.visitFunctionDeclaration = function(ast, state){
        if(ast.id.type === "Identifier")
        {
            return this.addFunctionDeclaration(ast.id.name, ast.params, ast.body, state, ast.loc.start);
        }
        else
        {
            console.warn(PumaScript.Loc(ast) + "Invalid function declaration.")
            return defaultResult;
        }
    };
    
    FirstPass.prototype.addFunctionDeclaration = function(name, params, body, state, loc){
        var commentColumns = this._metaComments[loc.line]; 
        var commentLine = loc.line;
        var isMeta = false;
        
        if(commentColumns === undefined) { 
            commentColumns =  this._metaComments[loc.line-1];
            commentLine = loc.line-1;
        }
        
        if(commentColumns !== undefined){
            if(commentLine >= this._lastStatementLoc.line) {
                if(commentLine < loc.line) isMeta = true;
                else {
                    for(var i=0; i<commentColumns.length;i++) {
                        var column = commentColumns[i];
                        if(column>this._lastStatementLoc.column && column<loc.column) {
                            isMeta=true;
                            break;
                        }
                    }
                }
            }
        }
            
        return new Result(true, state.addSymbol(name, new FunctionSymbol(name, params, body, isMeta)));
    };
    
    FirstPass.prototype.visitVariableDeclaration = function(ast, state){
        if(ast.kind === "var")
        {
            return this.acceptArray(ast.declarations, state);
        }
        else
        {
            return defaultResult;
        }
    };
    
    FirstPass.prototype.visitVariableDeclarator = function(ast, state){
        if(ast.id.type === "Identifier")
        {
            return new Result(true, this.addLocalVariableDeclaration(ast.id.name, ast.init, state));
        }
        else
        {
            return defaultResult;
        }
    };
    
    FirstPass.prototype.addLocalVariableDeclaration = function(name, init, state){
        var symbol = state.addSymbol(name);
        if(init !== null)
        {
            var initResult = this.accept(init, state);
            if(initResult.success)
            {
                var symbol = state.getSymbol(name);
                initResult.makeValue();
                symbol.value = initResult.value;
            }
        }
        return symbol;
    };
    
    FirstPass.prototype.visitAssignmentExpression = function(ast, state){
        var leftResult = this.accept(ast.left, state);
        var rightResult = this.accept(ast.right, state);
        
        if(leftResult.failed()) return defaultResult;
        if(rightResult.failed()) return defaultResult;

        if(!(leftResult.value instanceof Symbol))
        {
            console.warn(PumaScript.Loc(ast.left) + "ReferenceError: Invalid left-hand side in assignment.");
            return defaultResult;
        }
        if(leftResult.value.isUndefined())
        {
            var undefinedName = ast.left.name;
            console.warn(PumaScript.Loc(ast.left) + "Implicit definition of property \"" + undefinedName + "\".");
            state.addSymbol(undefinedName);
            leftResult = this.accept(ast.left, state);
        }
        
        rightResult.makeValue();
        
        var symbol = leftResult.value;
        
        switch(ast.operator)
        {
        case "=":
            symbol.value = rightResult.value;
            break;
        case "+=":
            symbol.value += rightResult.value;
            break;
        case "-=":
            symbol.value -= rightResult.value;
            break;
        case "*=":
            symbol.value *= rightResult.value;
            break;
        case "%=":
            symbol.value %= rightResult.value;
            break;
        case "<<=":
            symbol.value <<= rightResult.value;
            break;
        case ">>=":
            symbol.value >>= rightResult.value;
            break;
        case ">>>=":
            symbol.value >>>= rightResult.value;
            break;
        case "&=":
            symbol.value &= rightResult.value;
            break;
        case "|=":
            symbol.value |= rightResult.value;
            break;
        case "^=":
            symbol.value ^= rightResult.value;
            break;
        }
        return new Result(true, symbol);
    };
    
    FirstPass.prototype.visitBinaryExpression = function(ast, state){
        var leftResult = this.accept(ast.left, state);
        var rightResult = this.accept(ast.right, state);
        if(leftResult.failed()) return defaultResult;
        if(rightResult.failed()) return defaultResult;

        leftResult.makeValue();
        rightResult.makeValue();
            
        var value;
        switch(ast.operator)
        {
        case "<":
            value = leftResult.value < rightResult.value;
            break;
        case ">":
            value = leftResult.value > rightResult.value;
            break;
        case "<=":
            value = leftResult.value <= rightResult.value;
            break;
        case ">=":
            value = leftResult.value >= rightResult.value;
            break;
        case "==":
            value = leftResult.value == rightResult.value;
            break;
        case "!=":
            value = leftResult.value != rightResult.value;
            break;
        case "===":
            value = leftResult.value === rightResult.value;
            break;
        case "!==":
            value = leftResult.value !== rightResult.value;
            break;
        case "+":
            value = leftResult.value + rightResult.value;
            break;
        case "-":
            value = leftResult.value - rightResult.value;
            break;
        case "*":
            value = leftResult.value * rightResult.value;
            break;
        case "/":
            value = leftResult.value / rightResult.value;
            break;
        case "%":
            value = leftResult.value % rightResult.value;
            break;
        case "<<":
            value = leftResult.value << rightResult.value;
            break;
        case ">>":
            value = leftResult.value >> rightResult.value;
            break;
        case ">>>":
            value = leftResult.value >>> rightResult.value;
            break;
        case "&":
            value = leftResult.value & rightResult.value;
            break;
        case "|":
            value = leftResult.value | rightResult.value;
            break;
        case "^":
            value = leftResult.value ^ rightResult.value;
            break;
        case "&&":
            value = leftResult.value && rightResult.value;
            break;
        case "||":
            value = leftResult.value || rightResult.value;
            break;
        default:
            console.warn(PumaScript.Loc(ast) + "binary operator \"" + operator + "\" not found");
        }
        return new Result(true, value);
    };
    
    FirstPass.prototype.visitUnaryExpression = function(ast, state){
        var argumentResult = this.accept(ast.argument, state);
        if(argumentResult.failed()) return defaultResult;

        argumentResult.makeValue();
            
        var value;
        switch(ast.operator)
        {
        case "delete":
            value = delete argumentResult.value;
            break;
        case "void":
            value = void argumentResult.value;
            break;
        case "typeof":
            value = typeof argumentResult.value;
            break;
        case "+":
            value = +argumentResult.value;
            break;
        case "-":
            value = -argumentResult.value;
            break;
        case "~":
            value = ~argumentResult.value;
            break;
        case "!":
            value = !argumentResult.value;
            break;
        // the "++" and "--" operators are identified as "UpdateExpression" by the parser
        // instead of "UnaryExpression" so a special handler was added for them
        }
        return new Result(true, value);
    };
    
    FirstPass.prototype.visitCallExpression = function(ast, state){
        var calleeResult = this.accept(ast.callee, state);
        var functionSymbol;
        var targetObject = window;
        
        if(calleeResult.success === true)
        {
            if(calleeResult.value instanceof PropertyWrapper)
            {
                targetObject = calleeResult.value.obj;
                functionSymbol = calleeResult.value.value;
            }
            else if(calleeResult.value instanceof FunctionSymbol)
            {
                functionSymbol = calleeResult.value;
            }
            else if(calleeResult.value instanceof Symbol)
            {
                functionSymbol = calleeResult.value.value;
            }
            else
            {
                console.warn(PumaScript.Loc(ast.callee) + "left expression is not a function");
            }
            
            if(functionSymbol instanceof FunctionSymbol)
            {
                if(functionSymbol.isAstConstructionFunction) return this.callAstConstruction(ast, ast.arguments, state);
                return this.callFunctionSymbol(functionSymbol, ast, ast.arguments, state);
            }
            else if(functionSymbol instanceof Function)
            {
                return this.callNativeFunction(targetObject, functionSymbol, ast.arguments, state);
            }
        }
        return defaultResult;
    };
    
    FirstPass.prototype.callNativeFunction = function(targetObject, nativeFunction, argumentsAst, state){
        var argumentValues = [];
        var result;
        // eval arguments
        for(n = 0; n < argumentsAst.length; n++)
        {
            // TODO do it right
            result = this.accept(argumentsAst[n], state);
            result.makeValue();
            argumentValues[n] = result.value;
        }
        
        return new Result(true, nativeFunction.apply(targetObject, argumentValues));
    };
    
    
    /**
     * @param {FunctionSymbol} functionSymbol
     * @param {Array} argumentsAst
     * @param {State} state
     */
    FirstPass.prototype.callFunctionSymbol = function(functionSymbol, callExpressionAst, argumentsAst, state){
        var argumentValues = [];
        var parameter;
        var n;
        var result;
        var argumentValue;
        var isMetaCall = functionSymbol.isMeta;
        var isNotMetaCall = !isMetaCall;
        
        // eval arguments
        for(n = 0; n < argumentsAst.length; n++)
        {
            if(isNotMetaCall)
            {
                // TODO if an argument cannot be evaluated cancel function call
                argumentValues[n] = this.accept(argumentsAst[n], state);
            }
            else
            {
                // TODO consider arguments that require value instead of AST
                argumentValues[n] = argumentsAst[n];
            }
        }
        
        // push new context into state
        state.pushStackFrame();
        
        // this is required by named FunctionExpressions because they should
        // exist only inside the scope of the function
        if(functionSymbol.addToFunctionState)
            state.addSymbol(functionSymbol.name, functionSymbol);
        
        // bind arguments values to parameters symbols
        // TODO consider cases where:
        // - there are less arguments than parameters
        // - there are more arguments than parameters
        for(n = 0; n < functionSymbol.parameters.length; n++)
        {
            parameter = functionSymbol.parameters[n];
            argumentValue = argumentValues[n];
            if(isNotMetaCall)
            {
                argumentValue.makeValue();
                argumentValue = argumentValue.value;
            }
            state.addSymbol(parameter.name, argumentValue);
        }
        
        // bind special meta function implicit arguments
        if(isMetaCall)
        {
            state.addSymbol("context", callExpressionAst);
            state.addSymbol("pumaProgram", this._programAst);
        }
        
        // call meta function data collection
        functionSymbol.registerCallStart(argumentValues);
        
        // call function body
        result = this.accept(functionSymbol.body, state);
        
        // pop context from state
        state.popStackFrame();
        
        if(isMetaCall && result.success)
        {
			var mergeResult = this.mergeMetaCallResult(result, callExpressionAst);
			if(mergeResult) {
				result = this.accept(callExpressionAst, state);
				result.makeValue();
			}
        }
        else
        {
            result.makeValue();
        }
        
        functionSymbol.registerCallReturn(result);
        
        return new Result(true, result.value);
    };
    
    FirstPass.prototype.visitReturnStatement = function(ast, state){
        var result = this.accept(ast.argument, state);
        result.setIsReturnResult(true);
        return result;
    };
    
    FirstPass.prototype.visitIdentifier = function(ast, state){
        var identifier = ast.name;
        return new Result(true, state.getSymbol(identifier));
    };
    
    FirstPass.prototype.visitLiteral = function(ast, state){
        return new Result(true, ast.value);
    };
    
    FirstPass.prototype.visitIfStatement = function(ast, state){
        var testResult = this.accept(ast.test, state);

        if(testResult.failed()) return defaultResult;
            
        testResult.makeValue();
        
        if(testResult.value)
        {
            return this.accept(ast.consequent, state);
        }
        else
        {
            if(ast.alternate !== null) return this.accept(ast.alternate, state);
			else return emptyResult;
        }
    };
	
	FirstPass.prototype.visitForStatement = function (ast, state) {
        // TODO check all empty cases for subitems
		var initResult = ast.init !== null ? this.accept(ast.init, state) : null;
		var testResult = this.accept(ast.test, state);
		testResult.makeValue();
		
		if(initResult !== null && initResult.failed() || testResult.failed()) return defaultResult;
		
		while(testResult.value) {
			var bodyResult = this.accept(ast.body, state);
			var updateResult = this.accept(ast.update, state);
			testResult = this.accept(ast.test, state);
			testResult.makeValue();			
		}
		if(bodyResult !== undefined)
        {
            bodyResult.makeValue();
        }
        else
        {
            bodyResult = new Result(true, undefined);
        }
		return bodyResult;
	};
    
    FirstPass.prototype.visitComment = function(ast, state) {
        //TODO Use RegEx
        if(ast.value.indexOf("@meta") >= 0) {
            var lineMetaComments = this._metaComments[ast.loc.end.line];
            if( lineMetaComments === undefined) {
               lineMetaComments = this._metaComments[ast.loc.end.line] = [];
            }
            lineMetaComments.push(ast.loc.end.column);
        }
        return defaultResult;
    }
    
    FirstPass.prototype.visitUpdateExpression = function(ast, state){
        var argumentResult = this.accept(ast.argument, state);
        if(argumentResult.failed()) return defaultResult;

        var symbol = argumentResult.value;
        switch(ast.operator)
        {
        case "++":
            symbol.value++;
            break;
        case "--":
            symbol.value--;
            break;
        }
        return new Result(true, symbol);
    };
    
    FirstPass.prototype.visitWhileStatement = function (ast, state) {
		var testResult = this.accept(ast.test, state);
		testResult.makeValue();

		if(testResult.failed()) return defaultResult;

		while(testResult.value) {
			var bodyResult = this.accept(ast.body, state);			
			testResult = this.accept(ast.test, state);
			testResult.makeValue();
		}
		
		bodyResult.makeValue();
		return bodyResult;
	};

    FirstPass.prototype.visitArrayExpression = function(ast, state){
        arrayReturn = [];
        
        for(index = 0; index < ast.elements.length; index++)
        {
            var elementValue = null;
            if (ast.elements[index] !== null)
            {
                var elementResult = this.accept(ast.elements[index], state);
                if (elementResult.failed()) return defaultResult;
                elementResult.makeValue();
                elementValue = elementResult.value;
            }
            arrayReturn.push(elementValue);
        }
        
        return new Result(true, arrayReturn);
    };
    
    FirstPass.prototype.visit = function(ast, state){
        
    };
    
    return FirstPass;
})();

function evalPuma(programStr)
{
    var ast = window.esprima.parse(programStr, {"comment": true, "loc": true });
	addParent(ast);
    return evalPumaAst(ast);
}

function evalPumaAst(programAst)
{
    var firstPass = new FirstPass(programAst);  
    var result = firstPass.run(new State);
    result.pumaAst = programAst;
    return result;
}

function addParent(ast)
{
	if(ast === undefined || ast === null) throw "invalid call to accept with null ast.";
	
	for(key in ast)
	{
		var node = ast[key];
		if(node === Object(node))
		{
			addParent(node);
			node["parent"] = ast;
		}
	}
}

PumaScript = {};

PumaScript.Loc = function(ast){
    return "[" + ast.loc.start.line + ", " + ast.loc.start.column + "] ";
}

window.onload = function(){
    // evalPuma("alert(\"hello \" + \"world\");");
}
