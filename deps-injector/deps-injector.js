
require.config({
    paths: {
        pumascript: '../src/pumascript'
    }
});



require(['pumascript'], function (puma) {

    function PumaInjector() {
        var script = document.createElement('script');
        this.version = "1.0";
        script.setAttribute("crossorigin", "anonymous");
        this.puma = puma;
        this.deps = myDependecies || [];
        this.installDeps(myDependecies);
    };

    PumaInjector.CONFIGURATION = 'TEST'; // used as test for runtime error control or injector for dependency injection

    PumaInjector.FORCE_INJECT = true;

    PumaInjector.prototype.getExternalScript = function (url) {
        console.log('Getting the Lib from web');
        var xhttp = new XMLHttpRequest();
        var that = this;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // Action to be performed when the document is read;
                try {
                    PumaInjector.CONFIGURATION === 'TEST' ? that.pumaTest(url, this.responseText, that) : that.pumaInjector(url, this.responseText, that);
                }
                catch (e) {
                    console.log('Error in puma interpretation');
                    if (PumaInjector.FORCE_INJECT) that.createScriptNode(url);
                }
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    };

    PumaInjector.prototype.pumaTest = function(url, responseText, that) {
        console.info('********** Entering ', url, '****************************');
        var result = that.puma.evalPuma(responseText, 'inyector');

        if (result.success !== undefined) {
            if (result.success) {
                console.info('++++++++++++++ Successful injection ++++++++++++++++++');
                that.createScriptNode(url);
            } else {
                console.error(`Error when interpreting the file, puma does not support any internal components.
                The error occurred in the line: ${result.pumaAst.loc.end.line}, column: ${result.pumaAst.loc.end.column}
                The component that generates error is the following: ${result.output}`);
                if (PumaInjector.FORCE_INJECT) that.createScriptNode(url);
            }
        }
        else {
            console.error(`Error when interpreting the file, puma does not support any internal components.
            The error occurred in the line: ${result.loc.end.line}, column: ${result.loc.end.column}
            The component that generates error is the following: ${result.name}`);
        }
        console.info('*************************END INJECTION**********************************');
    }

    PumaInjector.prototype.pumaInjector = function(url, responseText, that) {
        var result = that.puma.evalPuma(responseText);
        that.createScriptNode(url);
    }


    PumaInjector.prototype.createScriptNode = function (url) {
        var script = document.createElement('script');
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    };

    PumaInjector.prototype.installDeps = function (deps) {
        var dependencyList = deps || this.deps;

        //Retrieve the script from CDN's
        for (var key in dependencyList) {
            this.getExternalScript(dependencyList[key].url);
        }
    };

    return new PumaInjector();
});