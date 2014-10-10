//byChelo
function agregar(){
	var divVacio = document.getElementById("divVacio");
    var textoHtml = document.getElementById("stringHtml").value;
	var a = document.getElementById('contenido1');
	a.firstElementChild = htmlSeguro(a.firstElementChild, textoHtml);
}