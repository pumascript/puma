// Copyright (c) 2013 - present UTN-LIS

'use strict';

require.config({
    paths: {
        jquery: 'node_modules/jquery/dist/jquery.min',
        bootstrap: 'node_modules/bootstrap/dist/js/bootstrap',
        cm: 'node_modules/codemirror/',
        pumascript: '../src/pumascript'
    },
    shim: {
        bootstrap: {
            exports: 'bootstrap',
            deps: ['jquery']
        }
    }
});

require([
    'jquery',
    'cm/lib/codemirror',
    'pumascript',
    'bootstrap',
    'cm/addon/hint/show-hint',
    'cm/addon/hint/xml-hint',
    'cm/addon/hint/html-hint',
    'cm/addon/hint/javascript-hint',
    'cm/addon/fold/foldcode',
    'cm/addon/fold/foldgutter',
    'cm/addon/fold/brace-fold',
    'cm/mode/xml/xml',
    'cm/mode/javascript/javascript',
    'cm/mode/css/css',
    'cm/mode/htmlmixed/htmlmixed'
], function ($, CodeMirror, puma) {

    function PumaEditor() {
        this._javaScriptEditor = this.instantiateCodeMirrorEditor('javascript');
        this._pumaScriptEditor = this.instantiateCodeMirrorEditor('puma');
        this.registerEvents();
    }

    PumaEditor.prototype.instantiateCodeMirrorEditor = function (section) {
        return CodeMirror(document.getElementById(section), {
            mode: 'javascript',
            extraKeys: {
                'Ctrl-Space': 'autocomplete',
                'Ctrl-J': 'autocomplete',
                'Ctrl-Q': function (cm) {
                    cm.foldCode(cm.getCursor());
                }
            },
            lineNumbers: true,
            lineWrapping: true,
            indentUnit: 4,
            tabSize: 4,
            foldGutter: true,
            gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
        });
    };

    PumaEditor.prototype.editorValue = function (editor) {
        return editor.getValue() || '';
    };

    PumaEditor.prototype.setEditorValue = function (editor, value) {
        return editor.setValue(value);
    };

    PumaEditor.prototype.load = function () {
        var value = localStorage.getItem('puma') || '';
        this.setEditorValue(this._pumaScriptEditor, value);
    };

    PumaEditor.prototype.loadBackup = function () {
        var value = localStorage.getItem('puma-backup') || '';
        this.setEditorValue(this._pumaScriptEditor, value);
    };

    PumaEditor.prototype.translate = function () {
        var result = {};
        var programStr = this.editorValue(this._pumaScriptEditor);

        //Save the last execution in local storage
        if (programStr !== '') {
            localStorage.setItem('puma-backup', localStorage.getItem('puma'));
            localStorage.setItem('puma', programStr);
        }

        if (programStr !== undefined && programStr !== null) {
            //Exporting to window puma runtime
            window.puma = puma;
            result = puma.evalPuma(programStr);

            this.setEditorValue(this._javaScriptEditor, result.output);

            console.log(result);
        }
    };

    PumaEditor.prototype.registerEvents = function () {
        $('#translatePuma').click(this.translate.bind(this));

        $('#loadPuma').click(this.load.bind(this));

        $('#loadBackupPuma').click(this.loadBackup.bind(this));
    };

    // eslint-disable-next-line no-unused-vars
    var pumaEditorInstance = new PumaEditor();
});
