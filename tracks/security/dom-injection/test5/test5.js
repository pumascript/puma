// Copyright (c) 2013 - present UTN-LIS

//byChelo
function agregar(){
	var divVacio = document.getElementById("divVacio");
    var textoHtml = document.getElementById("stringHtml").value;
	var a = document.getElementById('contenido1');
	a.firstElementChild.innerHTML = textoHtml;
}
