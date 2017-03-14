
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

    PumaInjector.FORCE_INJECT = true;
    
    PumaInjector.prototype.getExternalScript = function(dependency) {
        console.log('Getting the Lib from web');
        var xhttp = new XMLHttpRequest();
        var that = this;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // Action to be performed when the document is read;
                try {
                    var result = that.puma.evalPuma(this.responseText);
                    if(result.success) that.createScriptNode(dependency);
                }
                catch (e) {
                    console.log('Error in puma interpretation');
                    console.error(e);
                    if(PumaInjector.FORCE_INJECT) that.createScriptNode(dependency);
                }
            }
        };
        xhttp.open("GET", dependency.url, true);
        xhttp.send();
    };


    PumaInjector.prototype.createScriptNode = function(dependency){
        var script = document.createElement('script');
        script.src = dependency.url;
        script.setAttribute("crossorigin", "anonymous");
        script.integrity = dependency.checksum;
        document.getElementsByTagName('head')[0].appendChild(script);
    };

    PumaInjector.prototype.installDeps = function(deps){
        var dependencyList = deps || this.deps;

        //Retrieve the script from CDN's
        for(var i=0;i<dependencyList.length;i++){
            this.getExternalScript(dependencyList[i]);
        }
    };
    
    return new PumaInjector([{url: "https://code.jquery.com/jquery-2.2.4.js",
                             checksum: "sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI="}]);
});