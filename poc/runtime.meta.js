Symbol.prototype.initMetaData = function(){
    this._meta = {};
    Object.defineProperty(this, "meta", {
        get : function(){ 
            return this._meta;
        },
    });    
};

Symbol.Undefined = new Symbol(Symbol.UNDEFINED, "undefined");

Symbol.prototype.updateMetaData = function(newValue){
    var type = typeof(newValue);
    if(this._meta[type] === undefined)
    {
        if(Symbol.EmitTypeWarnings && Object.keys(this._meta).length >= 1)
        {
            console.warn("Symbol \"" + this.name + "\" takes more than one type in their lifetime.");
        }
        this._meta[type] = 1;
    }
    else
    {
        this._meta[type]++;
    }
};

Symbol.EmitTypeWarnings = false;
    