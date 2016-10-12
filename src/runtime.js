// Copyright (c) 2013 - present UTN-LIS

/*global define, console */
/*
    PumaScript main source code
 */
define([
    'escodegen',
    'esprima',
    '../src/global',
    '../src/state',
    '../src/symbols/symbol',
    '../src/symbols/function-symbol',
    '../src/symbols/property-wrapper',
    '../src/prune-pass'
], function (escodegen, esprima, Global, State, Symbol, FunctionSymbol, PropertyWrapper, PrunePass) {

    'use strict';

    /**
     * @constructor
     */
    function Result(success, value) {
        this.success = success;
        this.value = value;
    }

    Result.prototype.failed = function () {
        return this.success !== true;
    };

    Result.prototype.makeValue = function () {
        if (this.value instanceof Symbol) {
            this.value = this.value.value;
        }
    };

    Result.prototype.isReturnResult = function () {
        return this._isReturnResult === true;
    };

    Result.prototype.setIsReturnResult = function (value) {
        this._isReturnResult = value;
    };

    /**
     * @constructor
     */
    function FirstPass(programAst) {
        this._metaComments = [];
        this._lastStatementLoc = {
            "line": 0,
            "column": 0
        };
        this._programAst = programAst;
    }

    var defaultResult = new Result(false, null);
    var emptyResult = new Result(true, null);

    FirstPass.prototype.acceptArray = function (arrayNodes, state) {
        var result = defaultResult,
            i;
        for (i = 0; i < arrayNodes.length; i++) {
            result = this.accept(arrayNodes[i], state);
            if (result.isReturnResult()) break;
        }
        return result;
    };

    FirstPass.prototype.run = function (state) {
        return this.accept(this._programAst, state);
    };

    FirstPass.prototype.accept = function (ast, state) {
        if (ast === undefined || ast === null) throw "invalid call to accept with null ast.";

        var nodeType = ast.type;
        var result = defaultResult;

        switch (nodeType) {
        case "ArrayExpression":
            result = this.visitArrayExpression(ast, state);
            break;
        case "ArrowExpression":
            console.log("ArrowExpression visitor not implemented yet");
            //result = this.visitArrowExpression(ast, state);
            break;
        case "AssignmentExpression":
            result = this.visitAssignmentExpression(ast, state);
            break;
        case "BinaryExpression":
            result = this.visitBinaryExpression(ast, state);
            break;
        case "Block":
            result = this.visitComment(ast, state);
            break;
        case "BlockStatement":
            result = this.visitBlockStatement(ast, state);
            break;
        case "BreakStatement":
            console.log("BreakStatement visitor not implemented yet");
            //result = this.visitBreakStatement(ast, state);
            break;
        case "CallExpression":
            result = this.visitCallExpression(ast, state);
            break;
        case "CatchClause":
            console.log("CatchClause visitor not implemented yet");
            //result = this.visitCatchClause(ast, state);
            break;
        case "ComprehensionExpression":
            console.log("ComprehensionExpression visitor not implemented yet");
            //result = this.visitComprehensionExpression(ast, state);
            break;
        case "ConditionalExpression":
            console.log("ConditionalExpression visitor not implemented yet");
            //result = this.visitConditionalExpression(ast, state);
            break;
        case "ContinueStatement":
            console.log("ContinueStatement visitor not implemented yet");
            //result = this.visitContinueStatement(ast, state);
            break;
        case "DebuggerStatement":
            console.log("DebuggerStatement visitor not implemented yet");
            //result = this.visitDebuggerStatement(ast, state);
            break;
        case "EmptyStatement":
            console.log("EmptyStatement visitor not implemented yet");
            //result = this.visitEmptyStatement(ast, state);
            break;
        case "ExpressionStatement":
            result = this.accept(ast.expression, state);
            break;
        case "ForInStatement":
            console.log("ForInStatement visitor not implemented yet");
            //result = this.visitForInStatement(ast, state);
            break;
        case "ForStatement":
            result = this.visitForStatement(ast, state);
            break;
        case "FunctionDeclaration":
            result = this.visitFunctionDeclaration(ast, state);
            break;
        case "FunctionExpression":
            result = this.visitFunctionExpression(ast, state);
            break;
        case "GraphExpression":
            console.log("GraphExpression visitor not implemented yet");
            //result = this.visitGraphExpression(ast, state);
            break;
        case "GraphIndexExpression":
            console.log("GraphIndexExpression visitor not implemented yet");
            //result = this.visitGraphIndexExpression(ast, state);
            break;
        case "GeneratorExpression":
            console.log("GeneratorExpression visitor not implemented yet");
            //result = this.visitGeneratorExpression(ast, state);
            break;
        case "Identifier":
            result = this.visitIdentifier(ast, state);
            break;
        case "IfStatement":
            result = this.visitIfStatement(ast, state);
            break;
        case "LabeledStatement":
            console.log("LabeledStatement visitor not implemented yet");
            //result = this.visitLabeledStatement(ast, state);
            break;
        case "LetStatement":
            console.log("LetStatement visitor not implemented yet");
            //result = this.visitLetStatement(ast, state);
            break;
        case "Literal":
            result = this.visitLiteral(ast, state);
            break;
        case "LogicalExpression":
            result = this.visitLogicalExpression(ast, state);
            break;
        case "MemberExpression":
            result = this.visitMemberExpression(ast, state);
            break;
        case "NewExpression":
            result = this.visitNewExpression(ast, state);
            break;
        case "ObjectExpression":
            result = this.visitObjectExpression(ast, state);
            break; 
        case "Program":
            result = this.visitProgram(ast, state);
            break;
        case "Property":
            console.log("Property visitor not implemented yet");
            //result = this.visitProperty(ast, state);
            break;
        case "ReturnStatement":
            result = this.visitReturnStatement(ast, state);
            break;
        case "SequenceExpression":
            console.log("SequenceExpression visitor not implemented yet");
            //result = this.visitSequenceExpression(ast, state);
            break;
        case "SwitchCase":
            console.log("SwitchCase visitor not implemented yet");
            //result = this.visitSwitchCase(ast, state);
            break;
        case "SwitchStatement":
            console.log("SwitchStatement visitor not implemented yet");
            //result = this.visitSwitchStatement(ast, state);
            break;
        case "ThisExpression":
            result = this.visitThisExpression(ast, state);
            break;
        case "ThrowStatement":
            console.log("ThrowStatement visitor not implemented yet");
            //result = this.visitThrowStatement(ast, state);
            break;
        case "TryStatement":
            console.log("TryStatement visitor not implemented yet");
            //result = this.visitTryStatement(ast, state);
            break;
        case "UnaryExpression":
            result = this.visitUnaryExpression(ast, state);
            break;
        case "UpdateExpression":
            result = this.visitUpdateExpression(ast, state);
            break;
        case "VariableDeclaration":
            result = this.visitVariableDeclaration(ast, state);
            break;
        case "VariableDeclarator":
            result = this.visitVariableDeclarator(ast, state);
            break;
        case "WhileStatement":
            result = this.visitWhileStatement(ast, state);
            break;
        case "WithStatement":
            console.log("WithStatement visitor not implemented yet");
            //result = this.visitWithStatement(ast, state);
            break;
        case "YieldExpression":
            console.log("YieldExpression visitor not implemented yet");
            //result = this.visitYieldExpression(ast, state);
            break;
                
        case "Default":
            console.log("PumaScript visitor: " + nodeType + "not implemented yet");
            break;
        }

        this._lastStatementLoc = ast.loc.end;
        return result;
    };

    FirstPass.prototype.visitObjectExpression = function (ast, state) {
        var propertiesCount = ast.properties.length;
        var propertiesAst = ast.properties;
        var resultValue = {};
        for (var i = 0; i < propertiesCount; i++) {
            var propertyAst = propertiesAst[i];
            var propertyName;
            if (propertyAst.key.type === "Literal") {
                propertyName = propertyAst.key.value;
            } else if (propertyAst.key.type === "Identifier") {
                propertyName = propertyAst.key.name;
            } else {
                console.warn(loc(propertyAst) + "Error executing object expression. Property name not found!");
            }

            var propertyValue = this.accept(propertyAst.value, state);
            if (propertyValue.success) {
                propertyValue.makeValue();
                resultValue[propertyName] = propertyValue.value;
            } else {
                resultValue[propertyName] = undefined;
            }
        }
        return new Result(true, resultValue);
    };

    FirstPass.prototype.visitProgram = function (ast, state) {
        state.addSymbol("pumaProgram", this._programAst);
        var that = this;
        state.addSymbol("evalPumaAst", function (astPortion) {
            return that.accept(astPortion, state);
        });

        if (ast.comments) {
            this.acceptArray(ast.comments, state);
            this._lastStatementLoc.column = 0;
            this._lastStatementLoc.line = 0;
        }
        return this.acceptArray(ast.body, state);
    };

    FirstPass.prototype.visitBlockStatement = function (ast, state) {
        return this.acceptArray(ast.body, state);
    };

    FirstPass.prototype.visitMemberExpression = function (ast, state) {
        var objResult = this.accept(ast.object, state);
        if (objResult.failed()) return defaultResult;
        objResult.makeValue();

        var obj = objResult.value,
            propertyName,
            propertyResult;

        //Particular cases for native data type
        if (typeof (obj) === 'string') obj = new String(obj);
        if (typeof (obj) === 'number') obj = new Number(obj);
        if (typeof (obj) === 'boolean') obj = new Boolean(obj);

        // if the property name is "prototype" then rename it to avoid conflicts
        var astPropertyName = ast.property.name;
        if (astPropertyName === "prototype")
            astPropertyName = "prototypeProperty";

        // TODO check ECMAScript standard for additional cases when evaluating member expression
        if (ast.property.type === 'Identifier' && ast.computed === false) {
            propertyName = astPropertyName;
        } else {
            propertyResult = this.accept(ast.property, state);
            propertyResult.makeValue();

            if (propertyResult.value === undefined) {
                propertyName = astPropertyName;
            } else {
                propertyName = propertyResult.value;
            }
        }

        if (propertyName == "prototypeProperty")
            propertyName = "prototype";
        if (!(propertyName in obj)) {
            obj[propertyName] = undefined;
        }
        var wrapper = new PropertyWrapper(obj, propertyName);
        return new Result(true, wrapper);
    };

    FirstPass.prototype.visitFunctionExpression = function (ast) {
        var addToFunctionState = false,
            functionName;

        if (ast.id !== null) {
            functionName = ast.id.name;
            addToFunctionState = true;
        }
        var isMeta = this.isMetaFunction(ast.loc.start);
        var functionSymbol = new FunctionSymbol(functionName, ast.params, ast.body, isMeta, addToFunctionState);
        return new Result(true, functionSymbol);
    };

    FirstPass.prototype.visitFunctionDeclaration = function (ast, state) {
        if (ast.id.type === "Identifier") {
            var isMeta = this.isMetaFunction(ast.loc.start);
            ast.isMeta = isMeta;

            return this.addFunctionDeclaration(ast.id.name, ast.params, ast.body, state, isMeta);
        } else {
            console.warn(loc(ast) + "Invalid function declaration.");
            return defaultResult;
        }
    };

    FirstPass.prototype.isMetaFunction = function (loc) {
        var commentColumns = this._metaComments[loc.line];
        var commentLine = loc.line;
        var isMeta = false;

        if (commentColumns === undefined) {
            commentColumns = this._metaComments[loc.line - 1];
            commentLine = loc.line - 1;
        }

        if (commentColumns !== undefined) {
            if (commentLine >= this._lastStatementLoc.line) {
                if (commentLine < loc.line) isMeta = true;
                else {
                    for (var i = 0; i < commentColumns.length; i++) {
                        var column = commentColumns[i];
                        if (column > this._lastStatementLoc.column && column <= loc.column) {
                            isMeta = true;
                            break;
                        }
                    }
                }
            }
        }
        return isMeta;
    };

    FirstPass.prototype.addFunctionDeclaration = function (name, params, body, state, isMeta) {
        var functionSymbol = new FunctionSymbol(name, params, body, isMeta);
        functionSymbol.prototype = {};
        return new Result(true, state.addSymbol(name, functionSymbol));
    };

    FirstPass.prototype.visitVariableDeclaration = function (ast, state) {
        if (ast.kind === "var") {
            return this.acceptArray(ast.declarations, state);
        } else {
            return defaultResult;
        }
    };

    FirstPass.prototype.visitVariableDeclarator = function (ast, state) {
        if (ast.id.type === "Identifier") {
            return new Result(true, this.addLocalVariableDeclaration(ast.id.name, ast.init, state));
        } else {
            return defaultResult;
        }
    };

    FirstPass.prototype.addLocalVariableDeclaration = function (name, init, state) {
        var symbol = state.addSymbol(name);
        if (init !== null) {
            var initResult = this.accept(init, state);
            if (initResult.success) {
                symbol = state.getSymbol(name);
                initResult.makeValue();
                symbol.value = initResult.value;
            }
        }
        return symbol;
    };

    FirstPass.prototype.visitAssignmentExpression = function (ast, state) {
        var leftResult = this.accept(ast.left, state);
        var rightResult = this.accept(ast.right, state);

        if (leftResult.failed()) return defaultResult;
        if (rightResult.failed()) return defaultResult;

        if (!(leftResult.value instanceof Symbol)) {
            console.warn(loc(ast.left) + "ReferenceError: Invalid left-hand side in assignment.");
            return defaultResult;
        }
        if (leftResult.value.isUndefined()) {
            var undefinedName = ast.left.name;
            console.warn(loc(ast.left) + "Implicit definition of property \"" + undefinedName + "\".");
            state.addSymbol(undefinedName);
            leftResult = this.accept(ast.left, state);
        }

        rightResult.makeValue();

        var symbol = leftResult.value;

        switch (ast.operator) {
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
        case "/=":
            symbol.value /= rightResult.value;
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

    FirstPass.prototype.visitBinaryExpression = function (ast, state) {
        var leftResult = this.accept(ast.left, state);
        var rightResult = this.accept(ast.right, state);
        if (leftResult.failed()) return defaultResult;
        if (rightResult.failed()) return defaultResult;

        leftResult.makeValue();
        rightResult.makeValue();

        var value;
        switch (ast.operator) {
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
        case "in":
            value = leftResult.value in rightResult.value;
            break;
        case "instanceof":
            value = leftResult.value instanceof rightResult.value;
            break;
        default:
            console.warn(loc(ast) + "binary operator \"" + ast.operator + "\" not found");
        }
        return new Result(true, value);
    };

    FirstPass.prototype.visitLogicalExpression = function (ast, state) {
        var leftResult = this.accept(ast.left, state);
        leftResult.makeValue();

        var rightResult;

        var value;
        switch (ast.operator) {
        case "||":
            if (leftResult.value) {
                value = leftResult.value;
            } else {
                rightResult = this.accept(ast.right, state);
                rightResult.makeValue();
                value = rightResult.value;
            }
            break;

        case "&&":
            if (leftResult.value) {
                rightResult = this.accept(ast.right, state);
                rightResult.makeValue();
                value = rightResult.value;
            } else {
                value = leftResult.value;
            }
            break;

        default:
            console.warn(loc(ast) + "logical operator \"" + ast.operator + "\" not found");
        }
        return new Result(true, value);
    };

    FirstPass.prototype.visitUnaryExpression = function (ast, state) {
        var argumentResult = this.accept(ast.argument, state);
        if (argumentResult.failed()) return defaultResult;

        if (ast.operator !== "delete") argumentResult.makeValue();

        var value;
        switch (ast.operator) {
        case "delete":
            value = delete argumentResult.value.obj[ast.argument.property.name];
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

    FirstPass.prototype.visitCallExpression = function (ast, state) {
        var calleeResult = this.accept(ast.callee, state);
        var functionSymbol;
        var targetObject = Global;

        if (calleeResult.success === true) {
            if (calleeResult.value instanceof PropertyWrapper) {
                targetObject = calleeResult.value.obj;
                functionSymbol = calleeResult.value.value;
            } else if (calleeResult.value instanceof FunctionSymbol) {
                functionSymbol = calleeResult.value;
            } else if (calleeResult.value instanceof Symbol) {
                functionSymbol = calleeResult.value.value;
            } else {
                console.warn(loc(ast.callee) + "left expression is not a function");
            }

            if (functionSymbol instanceof FunctionSymbol) {
                if (functionSymbol.isAstConstructionFunction) return this.callAstConstruction(ast, ast.arguments, state);
                return this.callFunctionSymbol(functionSymbol, ast, ast.arguments, state);
            } else if (functionSymbol instanceof Function) {
                return this.callNativeFunction(targetObject, functionSymbol, ast.arguments, state);
            }
        }
        return defaultResult;
    };

    FirstPass.prototype.callNativeFunction = function (targetObject, nativeFunction, argumentsAst, state) {
        var argumentValues = [];
        var result;
        // eval arguments
        for (var n = 0; n < argumentsAst.length; n++) {
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
    FirstPass.prototype.callFunctionSymbol = function (functionSymbol, callExpressionAst, argumentsAst, state) {
        var argumentValues = [];
        var parameter;
        var n;
        var result;
        var argumentValue;
        var isMetaCall = functionSymbol.isMeta;
        var isNotMetaCall = !isMetaCall;

        // eval arguments
        for (n = 0; n < argumentsAst.length; n++) {
            if (isNotMetaCall) {
                // TODO if an argument cannot be evaluated cancel function call
                argumentValues[n] = this.accept(argumentsAst[n], state);
            } else {
                // TODO consider arguments that require value instead of AST
                argumentValues[n] = argumentsAst[n];
            }
        }

        // push new context into state
        state.pushStackFrame();

        // this is required by named FunctionExpressions because they should
        // exist only inside the scope of the function
        if (functionSymbol.addToFunctionState)
            state.addSymbol(functionSymbol.name, functionSymbol);

        // bind arguments values to parameters symbols
        // TODO consider cases where:
        // - there are less arguments than parameters
        // - there are more arguments than parameters
        for (n = 0; n < functionSymbol.parameters.length; n++) {
            parameter = functionSymbol.parameters[n];
            argumentValue = argumentValues[n];
            if (isNotMetaCall) {
                argumentValue.makeValue();
                argumentValue = argumentValue.value;
            }
            state.addSymbol(parameter.name, argumentValue);
        }

        // bind special meta function implicit arguments
        if (isMetaCall) {
            state.addSymbol("context", callExpressionAst);
        }

        // call meta function data collection
        functionSymbol.registerCallStart(argumentValues);

        // call function body
        result = this.accept(functionSymbol.body, state);

        // pop context from state
        state.popStackFrame();

        if (isMetaCall && result.success) {
            var mergeResult = this.mergeMetaCallResult(result, callExpressionAst);
            if (mergeResult) {
                result = this.accept(callExpressionAst, state);
                result.makeValue();
            }
        } else {
            result.makeValue();
        }

        functionSymbol.registerCallReturn(result);

        return new Result(true, result.value);
    };

    FirstPass.prototype.visitReturnStatement = function (ast, state) {
        var result = new Result(true, undefined);
        if (ast.argument) {
            result = this.accept(ast.argument, state);
        }
        result.setIsReturnResult(true);
        return result;
    };

    FirstPass.prototype.visitIdentifier = function (ast, state) {
        var identifier = ast.name;
        return new Result(true, state.getSymbol(identifier));
    };

    FirstPass.prototype.visitLiteral = function (ast) {
        return new Result(true, ast.value);
    };

    FirstPass.prototype.visitIfStatement = function (ast, state) {
        var testResult = this.accept(ast.test, state);

        if (testResult.failed()) return defaultResult;

        testResult.makeValue();

        if (testResult.value) {
            return this.accept(ast.consequent, state);
        } else {
            if (ast.alternate !== null) return this.accept(ast.alternate, state);
            else return emptyResult;
        }
    };

    FirstPass.prototype.visitForStatement = function (ast, state) {
        // TODO check all empty cases for subitems
        var initResult = ast.init !== null ? this.accept(ast.init, state) : null;
        var testResult = this.accept(ast.test, state);
        var bodyResult;

        testResult.makeValue();

        if (initResult !== null && initResult.failed() || testResult.failed()) return defaultResult;

        while (testResult.value) {
            bodyResult = this.accept(ast.body, state);
            this.accept(ast.update, state);
            testResult = this.accept(ast.test, state);
            testResult.makeValue();
        }
        if (bodyResult !== undefined) {
            bodyResult.makeValue();
        } else {
            bodyResult = new Result(true, undefined);
        }
        return bodyResult;
    };

    FirstPass.prototype.visitComment = function (ast) {
        //TODO Use RegEx
        if (ast.value.indexOf("@meta") >= 0) {
            var lineMetaComments = this._metaComments[ast.loc.end.line];
            if (lineMetaComments === undefined) {
                lineMetaComments = this._metaComments[ast.loc.end.line] = [];
            }
            lineMetaComments.push(ast.loc.end.column);
        }
        return defaultResult;
    };

    FirstPass.prototype.visitUpdateExpression = function (ast, state) {
        var argumentResult = this.accept(ast.argument, state);
        if (argumentResult.failed()) return defaultResult;

        var symbol = argumentResult.value;
        switch (ast.operator) {
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
        var testResult = this.accept(ast.test, state),
            bodyResult;

        testResult.makeValue();

        if (testResult.failed()) return defaultResult;

        while (testResult.value) {
            bodyResult = this.accept(ast.body, state);
            testResult = this.accept(ast.test, state);
            testResult.makeValue();
        }

        bodyResult.makeValue();
        return bodyResult;
    };

    FirstPass.prototype.visitArrayExpression = function (ast, state) {
        var arrayReturn = [],
            index = 0;

        for (index = 0; index < ast.elements.length; index++) {
            var elementValue = null;
            if (ast.elements[index] !== null) {
                var elementResult = this.accept(ast.elements[index], state);
                if (elementResult.failed()) return defaultResult;
                elementResult.makeValue();
                elementValue = elementResult.value;
            }
            arrayReturn.push(elementValue);
        }

        return new Result(true, arrayReturn);
    };

    FirstPass.prototype.visitThisExpression = function (ast, state) {
        return new Result(true, state.getSymbol("this"));
    };

    FirstPass.prototype.visitNewExpression = function (ast, state) {
        var calleeResult = this.accept(ast.callee, state);
        // the result can fail when processing a system type
        // since the identifier is not in the symbol table
        if (calleeResult.failed()) return defaultResult;
        calleeResult.makeValue();
        var typeValue = calleeResult.value;

        // create a new object from the prototype
        var newObject = Object.create(typeValue.prototype);
        // set "this" to the new object
        state.setNewFrameThisBinding(newObject);
        // call the constructor
        this.callFunctionSymbol(typeValue, undefined, ast.arguments, state);

        return new Result(true, newObject);
    };

    FirstPass.prototype.visit = function () { // ast, state

    };

    /**
     * Merges the result returned by a meta function call with the function call context.
     * @param {Result} result Result object returned by the meta function call
     * @param {*} callExpressionAst Original Esprima call expression node.
     * @return {boolean} return true if callExpressionAst is changed, false otherwise.
     */
    FirstPass.prototype.mergeMetaCallResult = function (result, callExpressionAst) {
        // resolve to value if it's a symbol
        result.makeValue();
        var resultValue = result.value;

        if (resultValue !== null) {
            for (var attr in resultValue) {
                if (resultValue.hasOwnProperty(attr)) callExpressionAst[attr] = resultValue[attr];
            }
            return true;
        }
        return false;
    };

    FirstPass.prototype.findTemplateIds = function (ast, list, parentAst, propertyName) {
        if (list === undefined) list = [];

        if (ast !== null) {
            if (ast.type === "Identifier" && ast.name.indexOf("$") === 0) {
                list.push({
                    id: ast,
                    parent: parentAst,
                    property: propertyName
                });
            } else {
                for (var i in ast) {
                    if (typeof (ast[i]) === "object") this.findTemplateIds(ast[i], list, ast, i);
                }
            }
        }
        return list;
    };

    FirstPass.prototype.callAstConstruction = function (callExpressionAst, argumentsAst, state) {
        var ast = null;
        var idsToReplace, i, id, idData, symbol;
        if (argumentsAst.length === 1) {
            ast = pumaCloneAst(argumentsAst[0]);

            // replace $id in template with symbols in context
            idsToReplace = this.findTemplateIds(ast);
            for (i in idsToReplace) {
                idData = idsToReplace[i];
                id = idData.id.name.substring(1);

                symbol = state.getSymbol(id);
                if (symbol.isUndefined()) {
                    console.warn(loc(idData.id) + 'Template parameter not found in scope "$' + id + '".');
                } else {
                    if (idData.parent) {
                        this.mergeNodes(idData, pumaCloneAst(symbol.value));
                    } else {
                        ast = pumaCloneAst(symbol.value);
                    }
                }
            }
        } else {
            return defaultResult;
        }
        return new Result(true, ast);
    };

    FirstPass.prototype.mergeNodes = function (idMatchData, astToMerge) {
        var isStatement = (astToMerge.type.indexOf('Statement') > -1);

        if (isStatement && idMatchData.parent.type === "ExpressionStatement") {
            for (var key in astToMerge) {
                idMatchData.parent[key] = astToMerge[key];
            }
        } else {
            idMatchData.parent[idMatchData.property] = astToMerge;
        }
    };

    /**
     * @constructor
     */
    function CodeGenerator(programAstPruned) {
        this.programAstPruned = programAstPruned;
    }

    CodeGenerator.prototype.generateCode = function () {
        if (Global.escodegen) { // browser === true
            return Global.escodegen.generate(this.programAstPruned);
        } else{
            return escodegen.generate(this.programAstPruned);
        }
        return escodegen.generate(this.programAstPruned);
    };

    function addParent(ast) {
        var key;

        if (ast === undefined || ast === null) throw "invalid call to accept with null ast.";

        for (key in ast) {
            var node = ast[key];
            if (node === Object(node)) {
                addParent(node);
                node.parent = ast;
            }
        }
    }

    function loc(ast) {
        return "[" + ast.loc.start.line + ", " + ast.loc.start.column + "] ";
    }

    // puma API

    function evalPuma(programStr) {
        var ast = esprima.parse(programStr, {"comment": true, "loc": true});
        addParent(ast);
        return evalPumaAst(ast);
    }

    function evalPumaAst(programAst) {
        var firstPass = new FirstPass(programAst);
        var result = firstPass.run(new State());

        var prune = new PrunePass(programAst);
        var programAstPruned = prune.start();

        var generator = new CodeGenerator(programAstPruned);
        var programStr = generator.generateCode();

        result.pumaAst = programAstPruned;
        result.output = programStr;

        return result;
    }

    /**
     * Creates a deep copy of the provided AST object. It must be a Puma AST.
     * @param {Object} ast Puma AST object that will be copied
     * @return {Object} Cloned object.
     */
    function pumaCloneAst(ast) {
        // TODO implement a faster clone function

        // Exclude the parent node so it doesn't create a circular reference
        var replacer = function (key, value) {
            if (key === "parent") return undefined;
            else return value;
        };

        return JSON.parse(JSON.stringify(ast, replacer));
    }

    /**
     * Find AST nodes by type attribute. Type attribute must use the same names than Esprima parser.
     * Returns an array with all the nodes. An empty array if none is found.
     *
     * @param {Object} ast AST node to search on.
     * @param {string} typeName The value of "type" property of the nodes to lookup
     * @retrun {Array}
     */
    function pumaFindByType(ast, typeName) {
        var internalPumaFindByType = function (ast, typeName, list) {
            if (ast !== null) {
                if (ast.type === typeName) {
                    list.push(ast);
                }
                else {
                    for (var i in ast) {
                        if (i !== 'parent' && typeof(ast[i]) === 'object') internalPumaFindByType(ast[i], typeName, list);
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
    function pumaFindByProperty(ast, propertyChain, value, compareFunction) {
        var propertyList = propertyChain.split('.');
        var propertyLength = propertyList.length;
        var matchLength = propertyLength - 1;

        function matchProperty(ast, propertyList, value) {
            var innerAst = ast;
            for (var i = 0; i < propertyLength; i++) {
                if (innerAst === null || innerAst === undefined) return false;
                innerAst = innerAst[propertyList[i]];
                if (i === matchLength && compareFunction === undefined && innerAst === value) return true;
                if (i === matchLength && compareFunction !== undefined && compareFunction(innerAst, value)) return true;
            }
            return false;
        }

        function internalPumaFindByProperty(ast, propertyList, value, list, compareFunction) {
            if (ast !== null) {
                if (matchProperty(ast, propertyList, value, compareFunction)) {
                    list.push(ast);
                }
                else {
                    for (var i in ast) {
                        if (i !== 'parent' && typeof(ast[i]) === "object") {
                            internalPumaFindByProperty(ast[i], propertyList, value, list, compareFunction);
                        }
                    }
                }
            }
            return list;
        }

        return internalPumaFindByProperty(ast, propertyList, value, [], compareFunction);
    }

    var exports = {
        evalPuma: evalPuma,
        evalPumaAst: evalPumaAst,
        pumaCloneAst: pumaCloneAst,
        pumaFindByProperty: pumaFindByProperty,
        pumaFindByType: pumaFindByType
    };

    return exports;
});
