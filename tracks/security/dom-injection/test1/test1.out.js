// Copyright (c) 2013 - present UTN-LIS

//byChelo
function agregar(){
	var divVacio = document.getElementById("divVacio");
    var textoHtml = document.getElementById("stringHtml").value;
    safeHtml(divVacio, textoHtml);
}
