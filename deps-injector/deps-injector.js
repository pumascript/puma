
require.config({
    paths: {
        pumascript: '../src/pumascript'
    }
});



require(['pumascript'], function(puma){

    function PumaInjector(){
        this.version = "1.0"
        this.puma = puma;
        this.deps = [];
        this.loadDependecies();
    };

    PumaInjector.FORCE_INJECT = true;

    PumaInjector.prototype.loadDependecies = function() {
        var that = this;
        this.loadJSON("puma.json", function(response) {
            var myDependecies = [];
            var JSON_result = JSON.parse(response);
            console.log(JSON_result);
            for (var x in JSON_result){
                myDependecies.push(JSON_result[x]);
            }

            this.deps = myDependecies || [];
            that.installDeps(myDependecies);
        });
    }

    PumaInjector.prototype.loadJSON = function (file, callback) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', file, true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }

    PumaInjector.prototype.getExternalScript = function(url) {
        console.log('Getting the Lib from web');
        var xhttp = new XMLHttpRequest();
        var that = this;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // Action to be performed when the document is read;
                try {

                    console.info('********** Entrando a ', url, '****************************');
                    var result = that.puma.evalPuma(this.responseText);
                    console.log(result);
                    if(result.success) that.createScriptNode(url);
                }
                catch (e) {
                    console.log(result);
                    console.log('Error in puma interpretation');
                    // console.error(e);
                    if(PumaInjector.FORCE_INJECT) that.createScriptNode(url);
                }
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    };


    PumaInjector.prototype.createScriptNode = function(url){
        var script = document.createElement('script');
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    };

    PumaInjector.prototype.installDeps = function(deps){
        var dependencyList = deps || this.deps;

        //Retrieve the script from CDN's
        for(var i=0;i<dependencyList.length;i++){
            this.getExternalScript(dependencyList[i]);
        }
    };




    return new PumaInjector();
});