
require.config({
    paths: {
        pumascript: '../src/pumascript'
    }
});


require(['pumascript'], function(puma){
    
    function PumaInjector(dependencies){
        this.version = "1.0"
        this.puma = puma;
        this.deps = dependencies || [];
        this.installDeps();
    };
    
    PumaInjector.prototype.getExternalScript = function(url) {
        console.log('Getting the Lib from web');
        var xhttp = new XMLHttpRequest();
        var that = this;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // Action to be performed when the document is read;
                try {
                    that.puma.evalPuma(this.responseText);
                }
                catch (e) {
                    console.log('Error in puma interpretation');
                    console.error(e);
                }
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    };

    PumaInjector.prototype.installDeps = function(deps){
        var dependencyList = deps || this.deps;

        //Retrieve the script from CDN's
        for(var i=0;i<dependencyList.length;i++){
            this.getExternalScript(dependencyList[i]);
        }
    };
    
    return new PumaInjector(["https://code.jquery.com/jquery-2.2.4.js"]);
});