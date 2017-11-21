module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "amd": true,
        "phantomjs": true,
        "qunit": true,
        "jquery": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "globals": {},
    "rules": {
        "no-console": 0,
        "block-scoped-var": 2,
        "eqeqeq": 2,
        "no-alert": 2,
        "no-empty-function": [2, { "allow": ["arrowFunctions", "constructors"] }],
        "no-eval": 2,
        "no-multi-spaces": [2, {
            "ignoreEOLComments": true,
            "exceptions": { "VariableDeclarator": true, "Property": true }
        }],
        "no-multi-str": 2,
        "no-new": 2,
        "prefer-promise-reject-errors": [2, { "allowEmptyReject": true }],
        "no-unused-vars": [1, { "args": "none" }],
        "no-use-before-define": [2, { "functions": false, "classes": false }],
        "global-require": 1,
        "no-path-concat": 2,
        "comma-dangle": [2, "never"],
        "comma-style": [2, "last"],
        "indent": [2, 4, { "SwitchCase": 1 }],
        "keyword-spacing": [1, { "before": true, "after": true }],
        "linebreak-style": [process.env.NODE_ENV === 'testing' ? 2 : 0, "unix"],
        "no-trailing-spaces": [2, { "ignoreComments": false }],
        "no-whitespace-before-property": 2,
        "quotes": [2, "single"],
        "semi": [2, "always"],
        "semi-style": [2, "last"]
    }
};