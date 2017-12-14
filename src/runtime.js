// Copyright (c) 2013 - present UTN-LIS

/**
 * @file: PumaScript main source code
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

    Result.prototype.isEmptyResult = function () {
        return this._isEmptyResult === true;
    };

    Result.prototype.setIsEmptyResult = function (value) {
        this._isEmptyResult = value;
    };

    /**
     * @constructor
     */
    function RuntimeConfig() {
        this._modeConfig = 'default';
        this._MODES = {
            DEFAULT: 'default',
            TEST: 'test'
        };
    }

    RuntimeConfig.prototype.getConfig = function () {
        return this._modeConfig;
    };

    RuntimeConfig.prototype.getModes = function () {
        return this._MODES;
    };

    RuntimeConfig.prototype.setConfig = function (modeConfig) {
        this._modeConfig = modeConfig;
    };

    function FirstPass(programAst) {
        this._metaComments = [];
        this._lastStatementLoc = {
            'line': 0,
            'column': 0
        };
        this._programAst = programAst;
        this._saveAstError = programAst;

        /**Each new property will be defined in the @visitorStatements dictionary. */
        this._visitorStatements = {
            'ArrayExpression': this.visitArrayExpression,
            'ArrowExpression': this.visitArrowExpression,
            'AssignmentExpression': this.visitAssignmentExpression,
            'BinaryExpression': this.visitBinaryExpression,
            'Block': this.visitComment,
            'BlockStatement': this.visitBlockStatement,
            'BreakStatement': this.visitBreakStatement,
            'CallExpression': this.visitCallExpression,
            'CatchClause': this.visitCatchClause,
            'ComprehensionExpression': this.visitComprehensionExpression,
            'ConditionalExpression': this.visitIfStatement,
            'ContinueStatement': this.visitContinueStatement,
            'DebuggerStatement': this.visitDebuggerStatement,
            'DoWhileStatement': this.visitDoWhileStatement,
            'EmptyStatement': this.visitEmptyStatement,
            'ExpressionStatement': this.accept,
            'ForInStatement': this.visitForInStatement,
            'ForStatement': this.visitForStatement,
            'FunctionDeclaration': this.visitFunctionDeclaration,
            'FunctionExpression': this.visitFunctionExpression,
            'GraphExpression': this.visitGraphExpression,
            'GraphIndexExpression': this.visitGraphIndexExpression,
            'GeneratorExpression': this.visitGeneratorExpression,
            'Identifier': this.visitIdentifier,
            'IfStatement': this.visitIfStatement,
            'LabeledStatement': this.visitLabeledStatement,
            'LetStatement': this.visitLetStatement,
            'Literal': this.visitLiteral,
            'LogicalExpression': this.visitLogicalExpression,
            'MemberExpression': this.visitMemberExpression,
            'NewExpression': this.visitNewExpression,
            'ObjectExpression': this.visitObjectExpression,
            'Program': this.visitProgram,
            'Property': this.visitProperty,
            'ReturnStatement': this.visitReturnStatement,
            'SequenceExpression': this.visitSequenceExpression,
            'SwitchStatement': this.visitSwitchStatement,
            'ThisExpression': this.visitThisExpression,
            'ThrowStatement': this.visitThrowStatement,
            'TryStatement': this.visitTryStatement,
            'UnaryExpression': this.visitUnaryExpression,
            'UpdateExpression': this.visitUpdateExpression,
            'VariableDeclaration': this.visitVariableDeclaration,
            'VariableDeclarator': this.visitVariableDeclarator,
            'WhileStatement': this.visitWhileStatement,
            'WithStatement': this.visitWithStatement,
            'YieldExpression': this.visitYieldExpression
        };
    }

    var defaultResult = new Result(false, null);
    var emptyResult = new Result(true, undefined);
    emptyResult.setIsEmptyResult(true);
    var runtimeConfig = new RuntimeConfig();

    FirstPass.prototype.acceptArray = function (arrayNodes, state) {
        var result = emptyResult,
            i;
        for (i = 0; i < arrayNodes.length; i++) {
            var nodeResult = this.accept(arrayNodes[i], state);
            if (!nodeResult.isEmptyResult()) {
                result = nodeResult;
            }

            if (nodeResult.isReturnResult()) break;
        }

        return result;
    };

    FirstPass.prototype.run = function (state) {
        return this.accept(this._programAst, state);
    };

    FirstPass.prototype.accept = function (ast, state) {
        if (ast === undefined || ast === null) throw 'invalid call to accept with null ast.';
        if (ast.type === 'ExpressionStatement') ast = ast.expression;
        this._saveAstError = ast;
        var result = defaultResult;
        if (this._visitorStatements[ast.type]) {
            result = this._visitorStatements[ast.type].call(this, ast, state);
        } else {
            console.warn('Statement ' + ast.type + ' not implemented');
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
            if (propertyAst.key.type === 'Literal') {
                propertyName = propertyAst.key.value;
            } else if (propertyAst.key.type === 'Identifier') {
                propertyName = propertyAst.key.name;
            } else {
                console.warn(loc(propertyAst) + 'Error executing object expression. Property name not found!');
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
        state.addSymbol('pumaProgram', this._programAst);
        var that = this;
        state.addSymbol('evalPumaAst', function (astPortion) {
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

    FirstPass.prototype.visitEmptyStatement = function () {
        return emptyResult;
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
        if (astPropertyName === 'prototype')
            astPropertyName = 'prototypeProperty';

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

        if (propertyName === 'prototypeProperty')
            propertyName = 'prototype';
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
        if (ast.id.type === 'Identifier') {
            var isMeta = this.isMetaFunction(ast.loc.start);
            ast.isMeta = isMeta;

            return this.addFunctionDeclaration(ast.id.name, ast.params, ast.body, state, isMeta);
        } else {
            console.warn(loc(ast) + 'Invalid function declaration.');
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
        if (ast.kind === 'var') {
            var result = this.acceptArray(ast.declarations, state);
            return result.success ? emptyResult : defaultResult;
        } else {
            return defaultResult;
        }
    };

    FirstPass.prototype.visitVariableDeclarator = function (ast, state) {
        if (ast.id.type === 'Identifier') {
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
            console.warn(loc(ast.left) + 'ReferenceError: Invalid left-hand side in assignment.');
            return defaultResult;
        }
        if (leftResult.value.isUndefined()) {
            var undefinedName = ast.left.name;
            console.warn(loc(ast.left) + 'Implicit definition of property "' + undefinedName + '".');
            state.addSymbol(undefinedName);
            leftResult = this.accept(ast.left, state);
        }

        rightResult.makeValue();

        var symbol = leftResult.value;

        switch (ast.operator) {
            case '=':
                symbol.value = rightResult.value;
                break;
            case '+=':
                symbol.value += rightResult.value;
                break;
            case '-=':
                symbol.value -= rightResult.value;
                break;
            case '*=':
                symbol.value *= rightResult.value;
                break;
            case '/=':
                symbol.value /= rightResult.value;
                break;
            case '%=':
                symbol.value %= rightResult.value;
                break;
            case '<<=':
                symbol.value <<= rightResult.value;
                break;
            case '>>=':
                symbol.value >>= rightResult.value;
                break;
            case '>>>=':
                symbol.value >>>= rightResult.value;
                break;
            case '&=':
                symbol.value &= rightResult.value;
                break;
            case '|=':
                symbol.value |= rightResult.value;
                break;
            case '^=':
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
            case '<':
                value = leftResult.value < rightResult.value;
                break;
            case '>':
                value = leftResult.value > rightResult.value;
                break;
            case '<=':
                value = leftResult.value <= rightResult.value;
                break;
            case '>=':
                value = leftResult.value >= rightResult.value;
                break;
            case '==':
                value = leftResult.value == rightResult.value; // eslint-disable-line eqeqeq
                break;
            case '!=':
                value = leftResult.value != rightResult.value; // eslint-disable-line eqeqeq
                break;
            case '===':
                value = leftResult.value === rightResult.value;
                break;
            case '!==':
                value = leftResult.value !== rightResult.value;
                break;
            case '+':
                value = leftResult.value + rightResult.value;
                break;
            case '-':
                value = leftResult.value - rightResult.value;
                break;
            case '*':
                value = leftResult.value * rightResult.value;
                break;
            case '/':
                value = leftResult.value / rightResult.value;
                break;
            case '%':
                value = leftResult.value % rightResult.value;
                break;
            case '<<':
                value = leftResult.value << rightResult.value;
                break;
            case '>>':
                value = leftResult.value >> rightResult.value;
                break;
            case '>>>':
                value = leftResult.value >>> rightResult.value;
                break;
            case '&':
                value = leftResult.value & rightResult.value;
                break;
            case '|':
                value = leftResult.value | rightResult.value;
                break;
            case '^':
                value = leftResult.value ^ rightResult.value;
                break;
            case '&&':
                value = leftResult.value && rightResult.value;
                break;
            case '||':
                value = leftResult.value || rightResult.value;
                break;
            case 'in':
                value = leftResult.value in rightResult.value;
                break;
            case 'instanceof':
                value = leftResult.value instanceof rightResult.value;
                break;
            default:
                console.warn(loc(ast) + 'binary operator "' + ast.operator + '" not found');
        }
        return new Result(true, value);
    };

    FirstPass.prototype.visitLogicalExpression = function (ast, state) {
        var leftResult = this.accept(ast.left, state);
        leftResult.makeValue();

        var rightResult;

        var value;
        switch (ast.operator) {
            case '||':
                if (leftResult.value) {
                    value = leftResult.value;
                } else {
                    rightResult = this.accept(ast.right, state);
                    rightResult.makeValue();
                    value = rightResult.value;
                }
                break;

            case '&&':
                if (leftResult.value) {
                    rightResult = this.accept(ast.right, state);
                    rightResult.makeValue();
                    value = rightResult.value;
                } else {
                    value = leftResult.value;
                }
                break;

            default:
                console.warn(loc(ast) + 'logical operator "' + ast.operator + '" not found');
        }
        return new Result(true, value);
    };

    FirstPass.prototype.visitUnaryExpression = function (ast, state) {
        var argumentResult = this.accept(ast.argument, state);
        if (argumentResult.failed()) return defaultResult;

        if (ast.operator !== 'delete') argumentResult.makeValue();

        var value;
        switch (ast.operator) {
            case 'delete':
                value = delete argumentResult.value.obj[ast.argument.property.name];
                break;
            case 'void':
                value = void argumentResult.value;
                break;
            case 'typeof':
                value = typeof argumentResult.value;
                break;
            case '+':
                value = +argumentResult.value;
                break;
            case '-':
                value = -argumentResult.value;
                break;
            case '~':
                value = ~argumentResult.value;
                break;
            case '!':
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
                console.warn(loc(ast.callee) + 'left expression is not a function');
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

    /**
     * Visitors that need to be developed. Warnings implemented for refactoring purposes.
     * Please move this message taking into account that are not developed yet.
     */

    FirstPass.prototype.visitArrowExpression = function(ast, state){
        console.warn('ArrowExpression visitor not implemented yet');
        return;
    };

    FirstPass.prototype.visitBreakStatement = function(ast, state){
        console.warn('BreakStatement visitor not implemented yet');
        return;
    };

    FirstPass.prototype.visitCatchClause = function(ast, state){
        console.warn('CatchClause visitor not implemented yet');
        return;
    };

    FirstPass.prototype.visitComprehensionExpression = function(ast, state){
        console.warn('ComprehensionExpression visitor not implemented yet');
        return;
    };

    FirstPass.prototype.visitContinueStatement = function(ast, state){
        console.warn('ContinueStatement visitor not implemented yet');
        return;
    };

    FirstPass.prototype.visitDebuggerStatement = function(ast, state){
        console.warn('DebuggerStatement visitor not implemented yet');
        return;
    };

    FirstPass.prototype.visitForInStatement = function(ast, state){
        console.warn('ForInStatement visitor not implemented yet');
        return;
    };

    FirstPass.prototype.visitGraphExpression = function(ast, state){
        console.warn('GraphExpression visitor not implemented yet');
        return;
    };

    FirstPass.prototype.visitGraphIndexExpression = function(ast, state){
        console.warn('GraphIndexExpression visitor not implemented yet');
        return;
    };

    FirstPass.prototype.visitGeneratorExpression = function(ast, state){
        console.warn('GeneratorExpression visitor not implemented yet');
        return;
    };

    FirstPass.prototype.visitLabeledStatement = function(ast, state){
        console.warn('LabeledStatement visitor not implemented yet');
        return;
    };

    FirstPass.prototype.visitLetStatement = function(ast, state){
        console.warn('LetStatement visitor not implemented yet');
        return;
    };

    FirstPass.prototype.visitProperty = function(ast, state){
        console.warn('Property visitor not implemented yet');
        return;
    };

    FirstPass.prototype.visitSequenceExpression = function(ast, state){
        console.warn('SequenceExpression visitor not implemented yet');
        return;
    };

    FirstPass.prototype.visitThrowStatement = function(ast, state){
        console.warn('ThrowStatement visitor not implemented yet');
        return;
    };

    FirstPass.prototype.visitTryStatement = function(ast, state){
        console.warn('TryStatement visitor not implemented yet');
        return;
    };

    FirstPass.prototype.visitWithStatement = function(ast, state){
        console.warn('WithStatement visitor not implemented yet');
        return;
    };

    FirstPass.prototype.visitYieldExpression = function(ast, state){
        console.warn('YieldExpression visitor not implemented yet');
        return;
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
            if (isNotMetaCall && argumentValue) {
                argumentValue.makeValue();
                argumentValue = argumentValue.value;
            }
            state.addSymbol(parameter.name, argumentValue);
        }

        // bind special meta function implicit arguments
        if (isMetaCall) {
            state.addSymbol('context', callExpressionAst);
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

    FirstPass.prototype.visitSwitchStatement = function (ast, state) {
        var c,
            hasDefault,
            discriminant,
            flagged,
            result;

        discriminant = this.accept(ast.discriminant, state);
        discriminant.makeValue();

        flagged = false;
        hasDefault = -1;

        if (ast.cases && ast.cases.length > 0) {
            for (c = 0; c < ast.cases.length; c++) {
                var ast_case = ast.cases[c];

                if (ast_case.test === null) { /* Is default case */
                    if (!!~hasDefault ^ flagged) { /* First Pass [M], Second Pass: Execute default and continue */
                        flagged = true;
                        hasDefault = -1;
                        result = ast_case.consequent.length > 0 ? this.acceptArray(ast_case.consequent, state) : emptyResult;
                        if (result.failed())
                            return defaultResult;
                    } else if (!~hasDefault && !flagged) { /* First Pass [NM]: Save default case number for second pass */
                        hasDefault = c;
                        result = emptyResult;
                    } else { /* Second Pass [M]: Should not be possible. Enforce flow control */
                        break;
                    }
                } else {
                    var test = this.accept(ast_case.test, state);

                    if (test.failed())
                        return defaultResult;
                    test.makeValue();

                    if (test.value === discriminant.value || flagged) {
                        flagged = true;
                        result = ast_case.consequent.length > 0 ? this.acceptArray(ast_case.consequent, state) : emptyResult;
                        if (result.failed())
                            return defaultResult;
                    } else {
                        result = emptyResult;
                    }
                }
                if (c + 1 >= ast.cases.length && !!~hasDefault && !flagged) { /* First Pass [NM]: Trace back to default case and execute */
                    c = hasDefault - 1;
                }
            }
        } else {
            result = new Result(true, undefined);
        }
        return result;
    };

    FirstPass.prototype.visitForStatement = function (ast, state) {
        var initResult = ast.init ? this.accept(ast.init, state) : emptyResult;
        var testResult = ast.test ? this.accept(ast.test, state) : new Result(true, true);
        var bodyResult = emptyResult;

        if (ast.test) {
            testResult.makeValue();
        }

        if (initResult.failed() || testResult.failed())
            return defaultResult;

        while (testResult.value) {
            bodyResult = this.accept(ast.body, state);
            /* If body is an Empty Statement, then pass it as is, conversly,
             * if result's value property is a Symbol, coerce it to primitive
             * as so it perdures unaffected by subsequent updates.
             */
            if (!bodyResult.isEmptyResult())
                bodyResult.makeValue();
            if (ast.update)
                this.accept(ast.update, state);
            if (ast.test) {
                testResult = this.accept(ast.test, state);
                testResult.makeValue();
            }
        }

        return bodyResult;
    };

    FirstPass.prototype.visitComment = function (ast) {
        if (ast.value.indexOf('@meta') >= 0) {
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
        // If is postfix operator return transient clone of symbol
        var _symbol = ast.prefix ? symbol : state.transientSymbol('@' + symbol.name, symbol.value);

        switch (ast.operator) {
            case '++':
                symbol.value++;
                break;
            case '--':
                symbol.value--;
                break;
        }
        return new Result(true, _symbol);
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

    FirstPass.prototype.visitDoWhileStatement = function (ast, state) {
        var testResult = this.accept(ast.test, state),
            bodyResult;

        testResult.makeValue();

        if (testResult.failed()) return defaultResult;

        do {
            bodyResult = this.accept(ast.body, state);
            testResult = this.accept(ast.test, state);
            testResult.makeValue();
        }
        while (testResult.value);

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
        return new Result(true, state.getSymbol('this'));
    };

    FirstPass.prototype.visitNewExpression = function (ast, state) {
        var calleeResult = this.accept(ast.callee, state);
        // the result can fail when processing a system type
        // since the identifier is not in the symbol table
        if (calleeResult.failed()) return defaultResult;
        calleeResult.makeValue();
        var typeValue = calleeResult.value;

        var STD_BIO = [
            'Object',
            'Function',
            'Boolean',
            'Number',
            'String',
            'RegExp',
            'Array',
            'Date',
            'Error',
            'EvalError',
            'InternalError',
            'RangeError',
            'ReferenceError',
            'SyntaxError',
            'TypeError',
            'URIError'];

        var newObject;

        /*
        *   TODO: USE FOLLOWING WHEN ES6 IS SUPPORTED BY PHANTOMJS
        *

        if (STD_BIO.includes(typeValue.name)) {

        *
        */
        if (~STD_BIO.indexOf(typeValue.name)) {
        /* ^^^ (REPLACE ON ES6 SUPPORT) ^^^ - Checks if object to be created is a ES5 Built-in object. */
            var argumentValues = [];
            var result;
            // Get the argument values
            for (var n = 0; n < ast.arguments.length; n++) {
                result = this.accept(ast.arguments[n], state);
                result.makeValue();
                argumentValues[n] = result.value;
            }
            /*
        *   TODO: USE FOLLOWING WHEN SPREAD OPERATOR IS SUPPORTED BY PHANTOMJS
        *

            newObject = new typeValue.prototype.constructor(...argumentValues);

        *
        *   WORKAROUND TILL THEN IS TO PASS THE ARRAY VALUES IN A STATIC MANNER UP TO A MAXIMUM
        *   OF 20 ARGUMENTS. IF LESS THAN THE ARGUMENTS ACCOUNTED FOR ARE PROVIDED THEN IT'S VALUES
        *   WILL BE COERCED TO NULL SO THEY DON'T AFFECT THE CREATION OF OBJECT('S). FUNCTION('S)
        *   CONSTRUCTOR, BEING NULL-ARGUMENT-SENSITIVE, WILL FAIL IF AMOUNT OF ARGUMENTS
        *   PROVIDED EXCEED 7 (SEVEN). THIS COULD BE SOLVED EXPANDING THE SWITCH-CASE BEYOND 7 OR BY
        *   AN EVAL CONTRUCTION. ARRAY'S ARE TRUNCATED TO THE AMOUNT OF ORIGINAL ARGUMENTS TO AVOID
        *   THE ABOVE CONFLICT. LARGE ARRAY'S COULD BE CREATED WITH EVAL ALSO.
        */

            if (argumentValues.length > 20) console.log('The amount of arguments provided exceeds the amount of arguments supported by this version.');

            if (typeValue.name === 'Function' && argumentValues.length > 7) console.log('The amount of arguments provided exceeds the amount of arguments supported for Function creation by this version.');

            var a = new Array(20);
            for (var i = 0; i < 20; i++) {
                a[i] = (i < argumentValues.length) ? argumentValues[i] : null;
            }

            switch (argumentValues.length) {
                case 0:
                    //No arguments... No need to spread... U WIN =D
                    newObject = new typeValue.prototype.constructor();
                    break;
                case 1:
                    newObject = new typeValue.prototype.constructor(a[0]);
                    break;
                case 2:
                    newObject = new typeValue.prototype.constructor(a[0], a[1]);
                    break;
                case 3:
                    newObject = new typeValue.prototype.constructor(a[0], a[1], a[2]);
                    break;
                case 4:
                    newObject = new typeValue.prototype.constructor(a[0], a[1], a[2], a[3]);
                    break;
                case 5:
                    newObject = new typeValue.prototype.constructor(a[0], a[1], a[2], a[3], a[4]);
                    break;
                case 6:
                    newObject = new typeValue.prototype.constructor(a[0], a[1], a[2], a[3], a[4], a[5]);
                    break;
                case 7:
                    newObject = new typeValue.prototype.constructor(a[0], a[1], a[2], a[3], a[4], a[5], a[6]);
                    break;
                default:
                    newObject = new typeValue.prototype.constructor(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[16], a[17], a[18], a[19], a[20]);

                    //Splice up to the original amount of items.
                    if (typeValue.name === 'Array') newObject.splice(argumentValues.length);
            }

        /*
        *   END OF WORKAROUND!
        *   DISCLAIMER: PUMASCRIPT TEAM IS NOT RESPONSIBLE FOR LOSS OF VISION, PARTIAL OR TOTAL.
        */
        } else {
            // create a new object from the prototype
            newObject = Object.create(typeValue.prototype);
            // set "this" to the new object
            state.setNewFrameThisBinding(newObject);
            // call the constructor
            this.callFunctionSymbol(typeValue, undefined, ast.arguments, state);
        }

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
            if (ast.type === 'Identifier' && ast.name.indexOf('$') === 0) {
                list.push({
                    id: ast,
                    parent: parentAst,
                    property: propertyName
                });
            } else {
                for (var i in ast) {
                    if (typeof (ast[i]) === 'object') this.findTemplateIds(ast[i], list, ast, i);
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

        if (isStatement && idMatchData.parent.type === 'ExpressionStatement') {
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
        } else {
            return escodegen.generate(this.programAstPruned);
        }
    };

    function addParent(ast) {
        var key;

        if (ast === undefined || ast === null) throw 'invalid call to accept with null ast.';

        for (key in ast) {
            var node = ast[key];
            if (node === Object(node)) {
                addParent(node);
                node.parent = ast;
            }
        }
    }

    function loc(ast) {
        return '[' + ast.loc.start.line + ', ' + ast.loc.start.column + '] ';
    }

    // puma API

    function evalPuma(programStr, modeConfig) {
        var ast = esprima.parse(programStr, {'comment': true, 'loc': true});
        var config = modeConfig || 'default';
        runtimeConfig.setConfig(config);
        addParent(ast);
        return evalPumaAst(ast);
    }

    function evalPumaAst(programAst) {
        var firstPass = new FirstPass(programAst);
        try {
            var result = firstPass.run(new State());
            var prune = new PrunePass(programAst);
            var programAstPruned = prune.start();

            var generator = new CodeGenerator(programAstPruned);
            var programStr = generator.generateCode();

            result.pumaAst = programAstPruned;
            result.output = programStr;

            return result;
        }
        catch(e) {
            if (runtimeConfig.getConfig() === runtimeConfig.getModes().DEFAULT) {
                throw TypeError(e.message);
            }
            else {
                // is used to detect errors from the puma-injector test mode
                return firstPass._saveAstError;
            }
        }
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
            if (key === 'parent') return undefined;
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
                        if (i !== 'parent' && typeof(ast[i]) === 'object') {
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
