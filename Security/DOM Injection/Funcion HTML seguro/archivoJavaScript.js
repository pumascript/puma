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
                    //reviso blackList de atributos ... CONTINUAR ACA
                    if(nombre.substring(0, 2) != 'on'){
                        eHtml.setAttribute(nombre, valor);
                    }    
                } 
                ehtml = crearHijos(eHtml, htmlUsuario.childNodes[i], blackList);
                }
        }
        padre.appendChild(eHtml);
    }
}

function crearBlackList(){
    var blackList = new Object();
    //creo las tres listas negras (por tags, por atributo y por tags-atributo
    blackList['tags'] = new Object();
    blackList['atributos'] = new Object();
    blackList['tag-atributos'] = new Object(); //por cada tag bloqueo n atributos
    //bloqueo los tags no permitidos (VAN EN MAYUSCULAS porque así devuelve la propiedad tagName)
    blackList.tags['SCRIPT'] = true;
    //bloqueo los atributos no permitidos
    blackList.atributos['onmouseover'] = true;
    return blackList;
}

function htmlSeguro(objeto, textoHtml) {
    var parser = new DOMParser();
    var textoParseado = parser.parseFromString(textoHtml,'text/html');
    //Ahora me posiciono en el nodo body (por debajo del él estan todos los nodos creados por el usuario
    var htmlUsuario = textoParseado.firstChild.lastChild;
    var blackList = crearBlackList();
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