// Copyright (c) 2013 - present UTN-LIS

/**
 * @file: PumaScript Type Inference Engine
 */

define([], {
    init: function (types, recursive) {
        this.types = types === 'extended' ? 'extended' : 'native';
        this.recursive = recursive || false;
    },

    /**
     *   TODO
     * ~ Implicit conversions
     * ~ Instance of classes
     * ~ Log type history
     * ~ Collections
     */
    resolveType: function (value) {
        return typeof value;
    }
});
