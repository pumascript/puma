var PumaEditor = function() {
  this._javaScriptEditor = this.instantiateCodeMirrorEditor("javascript");
  this._pumaScriptEditor = this.instantiateCodeMirrorEditor("puma"); 
  this.registerEvents();
};

PumaEditor.prototype.instantiateCodeMirrorEditor = function(section) {
    return  CodeMirror(document.getElementById(section), {
      mode: "text/javascript",
      extraKeys: {"Ctrl-Space": "autocomplete", "Ctrl-J": "autocomplete"},
      value: "",
      lineNumbers: true,
      height: 'auto',
      tabSize:2,
      foldGutter: true,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
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

PumaEditor.prototype.loadBackup = function(editor) {
  this.setEditorValue(this._pumaScriptEditor, localStorage.getItem("puma-backup"));
};

PumaEditor.prototype.translate = function() {
  var result = {};
  var programStr = this.editorValue(this._pumaScriptEditor);
  
  //Save the last execution in local storage
  if(programStr !== '') {
    localStorage.setItem("puma-backup", localStorage.getItem("puma"));
    localStorage.setItem("puma", programStr);    
  }
  
  if(programStr !== undefined && programStr !== null) {
    result = evalPuma(programStr);
  }
  this.setEditorValue(this._javaScriptEditor, result.output);
  console.log(result);
};

PumaEditor.prototype.registerEvents = function(){
  that = this;
  $("#translatePuma").click(function() {
    that.translate();
  });
  
  $("#loadPuma").click(function() {
    that.load();
  });
  
  $("#loadBackupPuma").click(function() {
    that.loadBackup();
  });
};