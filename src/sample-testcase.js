// Source code:
// Código usando W3C FileAPI estándar
var reader = new FileReader();  
reader.onload = function loaded(evt) {  
     console.log( evt.target.result );
};
reader.readAsText("input.txt", "UTF-16");

// Target code:
// Código usando WinRT API de Microsoft Windows 8
var reader = Windows.Storage.FileIO;
reader.done(function (fileContent) {
	console.log(fileContent);
});
reader.readTextAsync("input.txt");

// Meta program
meta.FileReader = function(){
    // constructor function is called when new is used or the function is called directly, 
    // like:
    //     "new FileReader()"
    //     "FileReader()" 
    //
    return @{ Windows.Storage.FileIO };
};

meta.FileReader.prototype.readAsText = function(filename, encoding){
    return @{ ileft.readTextAsync( $filename ); };
};

meta.FileReader.prototype.onload = set function(value){
    // return the new expression
    return @{
        ileft.done( $value );
    };
};

meta.FileReader.prototype.result = get function(){
    
};