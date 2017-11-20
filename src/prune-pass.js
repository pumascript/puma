// Copyright (c) 2013 - present UTN-LIS

define([], function () {

    /**
     * @constructor
     */
    function PrunePass(programAst) {
        this._programAst = programAst;
        this._pruneBody = [];
    }

    PrunePass.prototype.start = function () {
        if (this._programAst === null) throw 'null ast';
        var tree = this._programAst.body;
        var prunedAst = this.walk(tree);
        return prunedAst;
    };

    PrunePass.prototype.walk = function (tree) {
        for (var i = 0; i < tree.length; i++) {
            if (tree[i].isMeta === false || tree[i].isMeta === undefined) {
                this._pruneBody.push(tree[i]);
            }
        }

        this._programAst.body = this._pruneBody;

        return this._programAst;
    };

    return PrunePass;
});
