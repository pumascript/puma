var BLTags = [];
var BLAtributos = [];
var BLTagAtributos = [];

function probar() { //boton usar InnerHtml
    var divVacio = document.getElementById("divVacio");
    var textoHtml = document.getElementById("stringHtml").value;
    divVacio.innerHTML = textoHtml;
}

//funcion recursiva
function crearHijos(padre, htmlUsuario, blackList) {
    for (var i=0; i < htmlUsuario.childNodes.length; i++){
        var elementoACrear = htmlUsuario.childNodes[i].tagName //con esto se que elemento debo crear
        //si elementoACrear es undefined, es porque el elemento a crear es texto y por ende no tiene hijos
        if (typeof elementoACrear == 'undefined'){
            var eHtml = document.createTextNode(htmlUsuario.childNodes[i].textContent);
        }
        else {
            //valido los tags de la blackList
            if (blackList.tags[elementoACrear] === true){
                //si no se desea dejar info al usuario lo creo vacio al textNode
                var eHtml = document.createTextNode('TAG-'+elementoACrear+'-NOPERMITIDO');
            }
            else {
                var eHtml = document.createElement(elementoACrear);
                //seteo atributos
                for (var f=0; f < htmlUsuario.childNodes[i].attributes.length; f++){
                    var nombre = htmlUsuario.childNodes[i].attributes[f].name;
                    var valor = htmlUsuario.childNodes[i].attributes[f].value;
                    //reviso blackList de atributos 
                    if(blackList.atributos[nombre] !== true){
                        //ahora debo revisar la blacklist tagAtributos
                        //Primero verifico que existe el objeto para el elementoACrear
                        if(blackList.tagAtributos[elementoACrear] !== undefined){
                            if(blackList.tagAtributos[elementoACrear][nombre] !== true){
                            eHtml.setAttribute(nombre, valor);
                            }
                        }
                        else {
                            //si no esta definido el tag, entonces no existe en la blacklist tagAtributo
                            eHtml.setAttribute(nombre, valor);
                        }
                    }  
                } 
                ehtml = crearHijos(eHtml, htmlUsuario.childNodes[i], blackList);
                }
        }
        padre.appendChild(eHtml);
    }
}

function crearBlackList(BLUsuario1, BLUsuario2, BLUsuario3){
    var blackList = new Object();
    //creo las tres listas negras (por tags, por atributo y por tags-atributo
    blackList['tags'] = new Object();
    blackList['atributos'] = new Object();
    blackList['tagAtributos'] = new Object(); //por cada tag bloqueo n atributos
    //bloqueo los tags no permitidos (VAN EN MAYUSCULAS porque así devuelve la propiedad tagName)
    //por defecto siempre bloqueo el tag SCRIPT
    blackList.tags['SCRIPT'] = true;
    //Ahora agrego los tags que puso el usuario
    for(var i = 0; i < BLUsuario1.length; i++){
        blackList.tags[BLUsuario1[i]] = true;
    }
    //bloqueo los atributos no permitidos (estos si van en minusculas)
    //Por defecto bloqueo todos los Eventos on
    blackList.atributos['onmouseover'] = true;
    blackList.atributos['onclick'] = true;
    blackList.atributos['onabort'] = true;
    blackList.atributos['onautocomplete'] = true;
    blackList.atributos['onautocompleteerror'] = true;
    blackList.atributos['onbeforecopy'] = true;
    blackList.atributos['onbeforecut'] = true;
    blackList.atributos['onbeforepaste'] = true;
    blackList.atributos['onblur'] = true;
    blackList.atributos['oncancel'] = true;
    blackList.atributos['oncanplay'] = true;
    blackList.atributos['oncanplaythrough'] = true;
    blackList.atributos['onchange'] = true;
    blackList.atributos['onclose'] = true;
    blackList.atributos['oncontextmenu'] = true;
    blackList.atributos['oncopy'] = true;
    blackList.atributos['oncuechange'] = true;
    blackList.atributos['oncut'] = true;
    blackList.atributos['ondblclick'] = true;
    blackList.atributos['ondrag'] = true;
    blackList.atributos['ondragend'] = true;
    blackList.atributos['ondragenter'] = true;
    blackList.atributos['ondragleave'] = true;
    blackList.atributos['ondragover'] = true;
    blackList.atributos['ondragstart'] = true;
    blackList.atributos['ondrop'] = true;
    blackList.atributos['ondurationchange'] = true;
    blackList.atributos['onemptied'] = true;
    blackList.atributos['onended'] = true;
    blackList.atributos['onerror'] = true;
    blackList.atributos['onfocus'] = true;
    blackList.atributos['oninput'] = true;
    blackList.atributos['oninvalid'] = true;
    blackList.atributos['onkeydown'] = true;
    blackList.atributos['onkeypress'] = true;
    blackList.atributos['onkeyup'] = true;
    blackList.atributos['onload'] = true;
    blackList.atributos['onloadeddata'] = true;
    blackList.atributos['onloadedmetadata'] = true;
    blackList.atributos['onloadstart'] = true;
    blackList.atributos['onmousedown'] = true;
    blackList.atributos['onmouseenter'] = true;
    blackList.atributos['onmouseleave'] = true;
    blackList.atributos['onmousemove'] = true;
    blackList.atributos['onmouseout'] = true;
    blackList.atributos['onmouseup'] = true;
    blackList.atributos['onmousewheel'] = true;
    blackList.atributos['onpaste'] = true;
    blackList.atributos['onpause'] = true;
    blackList.atributos['onplay'] = true;
    blackList.atributos['onplaying'] = true;
    blackList.atributos['onprogress'] = true;
    blackList.atributos['onratechange'] = true;
    blackList.atributos['onreset'] = true;
    blackList.atributos['onresize'] = true;
    blackList.atributos['onscroll'] = true;
    blackList.atributos['onsearch'] = true;
    blackList.atributos['onseeked'] = true;
    blackList.atributos['onseeking'] = true;
    blackList.atributos['onselect'] = true;
    blackList.atributos['onselectstart'] = true;
    blackList.atributos['onshow'] = true;
    blackList.atributos['onstalled'] = true;
    blackList.atributos['onsubmit'] = true;
    blackList.atributos['onsuspend'] = true;
    blackList.atributos['ontimeupdate'] = true;
    blackList.atributos['ontoggle'] = true;
    blackList.atributos['onvolumechange'] = true;
    blackList.atributos['onwaiting'] = true;
    blackList.atributos['onwebkitfullscreenchange'] = true;
    blackList.atributos['onwebkitfullscreenerror'] = true;
    blackList.atributos['onwheel'] = true;
    //Ahora bloqueo los que pidio el usuario
    for(var i = 0; i < BLUsuario2.length; i++){
        blackList.atributos[BLUsuario2[i]] = true;
    }
    
    //ultima blacklist (por tagAtributo)
    for (var i = 0; i < BLUsuario3.length; i++){
        blackList.tagAtributos[BLUsuario3[i].nombre] = new Object();
        for(var s = 0; s < BLUsuario3[i].atributos.length; s++){
            blackList.tagAtributos[BLUsuario3[i].nombre][BLTagAtributos[i].atributos[s]] = true;
        }
    }
    //Ejemplo.. de blacklist por TAG-Atributos 
    //blackList.tagAtributos['DIV'] = new Object();
    //blackList.tagAtributos['DIV']['class'] = true; 
    //blackList.tagAtributos['DIV']['id'] = true; //para el tag Div, bloqueo atributo class e id.
    
    return blackList;
}

function htmlSeguro(objeto, textoHtml) {
    var parser = new DOMParser();
    var textoParseado = parser.parseFromString(textoHtml,'text/html');
    //Ahora me posiciono en el nodo body (por debajo del él estan todos los nodos creados por el usuario
    var htmlUsuario = textoParseado.firstChild.lastChild;
    var blackList = crearBlackList(BLTags, BLAtributos, BLTagAtributos);
    //Voy a recorrer los nodos con la función recursiva crearHijos
    crearHijos(objeto, htmlUsuario, blackList);
    }

function probarConDom() { //boton usar el DOM
    var divVacio = document.getElementById("divVacio");
    var textoHtml = document.getElementById("stringHtml").value;
    //vacio el divVacio
    var divNuevo = document.createElement('DIV');
    divNuevo.setAttribute('id','divVacio');
    divNuevo.setAttribute('class','cajaDiv');
    divVacio.parentNode.replaceChild(divNuevo, divVacio);
    htmlSeguro(divNuevo, textoHtml);
}

function agregarBlackList1(){
    var nombreTag = document.getElementById("BLTags");
    if(nombreTag.value.trim() == ""){
        alert('No puede dejar el campo vacio');
    }
    else {
        
        var elemento = nombreTag.value.trim();
        elemento = elemento.toUpperCase();
        BLTags.push(elemento);
        var texto = new String();
        for(var i = 0; i < BLTags.length; i++){
            texto += "\n- "+BLTags[i];
        }
        alert('Blacklist Tags: '+texto);
        nombreTag.value = "";
        }
    }

function agregarBlackList2(){
    var nombreAtributo = document.getElementById("BLAtributos");
    if(nombreAtributo.value.trim() == ""){ //Con trim() elimino los espacios en blanco
        alert('No puede dejar el campo vacio');
    }
    else {
        var elemento = nombreAtributo.value.trim();
        elemento = elemento.toLowerCase();
        BLAtributos.push(elemento);
        var texto = new String();
        for(var i = 0; i < BLAtributos.length; i++){
            texto += "\n- "+BLAtributos[i];
        }
        alert('Blacklist Atributos: '+texto);
        nombreAtributo.value = "";
    }
    
}

function agregarBlackList3(){
    var nombreTag = document.getElementById("BLTagAtributos1");
    var nombreAtributos = document.getElementById("BLTagAtributos2");
    var seguir = true;
    if((nombreTag.value.trim() == "") || (nombreAtributos.value.trim() == "")) {
        alert('No puede dejar ningun campo vacio');
    }
    else {
        //Agrego primero el tag
        var objetoTag = new Object();
        var aux = nombreTag.value.trim();
        objetoTag['nombre'] = aux.toUpperCase();
        //Ahora agrego todos los atributos
        var vectorAtrib = [];
        objetoTag['atributos'] = vectorAtrib;
        cadena = nombreAtributos.value.trim();
        while(seguir){
            //busco un espacio en blanco entre palabras (para saber si existe más de un atributo)
            if(cadena.search(' ') == -1){ //si no encuentro espacios en blanco entonces es el último atributo
                cadena = cadena.toLowerCase();
                objetoTag.atributos.push(cadena);
                seguir = false;
            }
            else {
                var atrib = cadena.substring(0, cadena.search(' '));
                atrib = atrib.toLowerCase();
                objetoTag.atributos.push(atrib);
                //armo cadena nueva, sacando la palabra ya agregada
                cadena = cadena.substring(cadena.search(' ') + 1, cadena.length);
            }
        }
        //Guardo el objetoTag en la lista negra
        BLTagAtributos.push(objetoTag);
        var texto = new String();
        for(var i = 0; i < BLTagAtributos.length; i++){
            texto += "\n- "+BLTagAtributos[i].nombre;
            for(var s = 0; s < BLTagAtributos[i].atributos.length; s++){
                texto += "\n   - "+BLTagAtributos[i].atributos[s];
            }
        }
        alert('Blacklist Tag-Atributos: '+texto);
        nombreTag.value = "";
        nombreAtributos.value = "";
    }
}