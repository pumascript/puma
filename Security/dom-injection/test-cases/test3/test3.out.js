//byChelo
function agregar(){
	var divVacio = document.getElementById("divVacio");
    var textoHtml = document.getElementById("stringHtml").value;
	prueba(safeHtml(divVacio, textoHtml));
}

function prueba(objeto){
	console.log('Todo ok');
}