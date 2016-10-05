// Copyright (c) 2013 - present UTN-LIS

//htmlSeguroByChelo

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

//funcion recursiva para crear nodos
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

function safeHtml(objeto, textoHtml) {
	//Primero debo vaciar lo que tiene el elemento (ya que innerHtml es lo que hace al principio)
	//borrar los hijos de objeto
	while (objeto.firstChild) {
		objeto.removeChild(objeto.firstChild);
	}
    var parser = new DOMParser();
    var textoParseado = parser.parseFromString(textoHtml,'text/html');
    //Ahora me posiciono en el nodo body (por debajo del él estan todos los nodos creados por el usuario
    var htmlUsuario = textoParseado.firstChild.lastChild;
	//por ahora las blacklist solo las agrego, pero aún no se cargan por el usuario.
	var BLTags = [];
	var BLAtributos = [];
	var BLTagAtributos = [];
    var blackList = crearBlackList(BLTags, BLAtributos, BLTagAtributos);
    //Voy a recorrer los nodos con la función recursiva crearHijos
    crearHijos(objeto, htmlUsuario, blackList);
	return objeto;
    }
