//byChelo
function agregar(){
	var divVacio = document.getElementById("divVacio");
    var textoHtml = document.getElementById("stringHtml").value;
    divVacio = htmlSeguro(divVacio, textoHtml);
}