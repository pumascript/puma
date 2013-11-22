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
    function FunctionSymbol(parameters, body)
    {
        this.parameters = parameters;
        this.body = body;
    }
    
    return FunctionSymbol;
})();

Symbol = (function(){
    var UNDEFINED = "__UNDEFINED__";
    
    function Symbol(name, value)
    {
        this.value = value;
        this.name = name;
    }
    
    Symbol.Undefined = new Symbol(UNDEFINED, "undefined");
    
    Symbol.prototype.isUndefined = function(){
        return this.name === UNDEFINED;
    };
    
    return Symbol;
})();

State = (function(){
    function State()
    {
        this._stackFrame = [];
        this._symbols = {};
    }
    
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
        if(stackFrameIndex < 0 || this._stackFrame.length === 0) return Symbol.Undefined;
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
    function FirstPass()
    {
    }
    
    var defaultResult = new Result(false, null);
    
    FirstPass.prototype.acceptArray = function(arrayNodes, state){
        var result = defaultResult;
        for(var i = 0; i < arrayNodes.length; i++)
        {
            result = this.accept(arrayNodes[i], state);
            if(result.isReturnResult()) break;
        }
        return result;
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
            result = this.visitMemberExperssion(ast, state);
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
        case "ReturnStatement":
            result = this.visitReturnStatement(ast, state);
            break;
        }
        return result;
    };
            
    FirstPass.prototype.visitProgram = function(ast, state){
        return this.acceptArray(ast.body, state);
    };
    
    FirstPass.prototype.visitBlockStatement = function(ast, state){
        return this.acceptArray(ast.body, state);
    };
    
    FirstPass.prototype.visitMemberExperssion = function(ast, state){
    };
    
    FirstPass.prototype.visitFunctionExpression = function(ast, state){
    };
    
    FirstPass.prototype.visitFunctionDeclaration = function(ast, state){
        if(ast.id.type === "Identifier")
        {
            return this.addFunctionDeclaration(ast.id.name, ast.params, ast.body, state);
        }
        else
        {
            console.warn("Invalid function declaration.")
            return defaultResult;
        }
    };
    
    FirstPass.prototype.addFunctionDeclaration = function(name, params, body, state){
        return new Result(true, state.addSymbol(name, new FunctionSymbol(params, body)));
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
            console.warn("ReferenceError: Invalid left-hand side in assignment.");
            return defaultResult;
        }
        if(leftResult.value.isUndefined())
        {
            var undefinedName = ast.left.name;
            console.warn("Implicit definition of property \"" + undefinedName + "\".");
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
            console.warn("binary operator \"" + operator + "\" not found");
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
        case "!":
            value = !argumentResult.value;
            break;
        // TODO add all operators in ECMA-262 section 11.4 Unary Operators
        }
        return new Result(true, value);
    };
    
    FirstPass.prototype.visitCallExpression = function(ast, state){
        var calleeResult = this.accept(ast.callee, state);
        var functionSymbol;
        
        if(calleeResult.success === true)
        {
            if(calleeResult.value instanceof Symbol)
            {
                functionSymbol = calleeResult.value.value;
            }
            else if(calleeResult.value instanceof FunctionSymbol)
            {
                functionSymbol = calleeResult.value;
            }
            else
            {
                console.warn("left expression is not a function");
            }
            
            if(functionSymbol instanceof FunctionSymbol)
            {
                return this.callFunctionSymbol(functionSymbol, ast.arguments, state)
            }
        }
        return defaultResult;
    };
    
    /**
     * @param {FunctionSymbol} functionSymbol
     * @param {Array} argumentsAst
     * @param {State} state
     */
    FirstPass.prototype.callFunctionSymbol = function(functionSymbol, argumentsAst, state){
        var argumentValues = [];
        var parameter;
        var n;
        var result;
        
        // eval arguments
        for(n = 0; n < argumentsAst.length; n++)
        {
            // TODO if an argument cannot be evaluated cancel function call
            argumentValues[n] = this.accept(argumentsAst[n], state);
        }
        
        // push new context into state
        state.pushStackFrame();
        
        // bind arguments values to parameters symbols
        // TODO consider cases where:
        // - there are less arguments than parameters
        // - there are more arguments than parameters
        for(n = 0; n < functionSymbol.parameters.length; n++)
        {
            parameter = functionSymbol.parameters[n];
            argumentValues[n].makeValue();
            state.addSymbol(parameter.name, argumentValues[n].value);
        }
        // call function body
        result = this.accept(functionSymbol.body, state);
        
        // pop context from state
        state.popStackFrame();
        
        result.makeValue();
        
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
        }
    };
    
    FirstPass.prototype.visit = function(ast, state){
        
    };
    
    return FirstPass;
})();

function evalPuma(programStr)
{
    var ast = window.esprima.parse(programStr);
    
    var firstPass = new FirstPass();
    return firstPass.accept(ast, new State);
}

window.onload = function(){
    // evalPuma("alert(\"hello \" + \"world\");");
}
