var PumaEditor = function() {
  this._javaScriptEditor = this.instantiateCodeMirrorEditor("javascript");
  this._pumaScriptEditor = this.instantiateCodeMirrorEditor("puma"); 
  this.initEvents();
};

PumaEditor.prototype.instantiateCodeMirrorEditor = function(section) {
    return  CodeMirror(document.getElementById(section), {
          mode: "text/javascript",
          extraKeys: {"Ctrl-Space": "autocomplete", "Ctrl-J": "autocomplete"},
          value: "",
		      lineNumbers: true,
          tabSize:2
        }); 
};

PumaEditor.prototype.editorValue = function(editor) {
  return editor.getValue();
};

PumaEditor.prototype.setEditorValue = function(editor, value) {
  return editor.setValue(value);
};

PumaEditor.prototype.load = function(editor) {
  this.setEditorValue(this._pumaScriptEditor, localStorage.getItem("puma"));
};

PumaEditor.prototype.translate = function() {
  var result = {};
  var programStr = this.editorValue(this._pumaScriptEditor);
  //Save the last execution in local storage
  localStorage.setItem("puma", programStr);
  
  if(programStr !== undefined && programStr !== null) {
    result = evalPuma(programStr);
  }
  var jsresult = window.escodegen.generate(result.pumaAst);
  this.setEditorValue(this._javaScriptEditor, jsresult);
  console.log(result);
};

PumaEditor.prototype.initEvents = function(){
  that = this;
  $("#translatePuma").click(function() {
    that.translate();
  });
  
  $("#loadPuma").click(function() {
    that.load();
  });
};