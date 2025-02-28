document.addEventListener("DOMContentLoaded", function() {


    window.abrirGuardarComo = function abrirGuardarComo() {
        const texto = document.getElementById('editor').value;
        const nombreArchivo = prompt("Nombre del archivo:", "analizado.txt");
        if (nombreArchivo) {
            GuardarTexto.guardarComoArchivo(texto, nombreArchivo);
        }
    };

    window.analizarTexto = function analizarTexto() {
        const textarea = document.getElementById('editor');
        if (!textarea) {
            console.error("Elemento con id 'editor' no encontrado");
            return;
        }

        const texto = textarea.value;
        if (texto.trim() === "") {
            alert("Por favor, ingrese texto o cargue un archivo.");
            return;
        }

        const analizador = new AnalizadorLexico(texto);
        analizador.analizar();
        analizador.imprimirTokens();
        analizador.imprimirErrores();

        sessionStorage.setItem('tokens', JSON.stringify(analizador.tokens));
        sessionStorage.setItem('errores', JSON.stringify(analizador.errores));

        alert("Texto Analizado");
    };

    window.verReporte = function verReporte() {
        const seleccion = document.getElementById('seleccionReporte');
        if (!seleccion) {
            console.error("Elemento con id 'seleccionReporte' no encontrado");
            return;
        }

        const errores = JSON.parse(sessionStorage.getItem('errores')) || [];

        if (seleccion.value === "RecuentoTokens.html" && errores.length > 0) {
            alert("No se puede mostrar el reporte de Recuento de Tokens porque existen errores.");
        } else {
            window.location.href = seleccion.value;
        }
    };

    window.buscar = function buscar() {
        const editor = document.getElementById('editor');
        const buscarInput = document.getElementById('buscar');
        const salida = document.getElementById('salida');
        const resultadosBusqueda = document.getElementById('resultadosBusqueda');

        if (!editor || !buscarInput || !salida || !resultadosBusqueda) {
            console.error("Uno o más elementos no fueron encontrados en el DOM");
            return;
        }

        let texto = editor.value;
        let buscar = buscarInput.value;
        let resultado = Busqueda.buscarTexto(texto, buscar);

        salida.innerHTML = resultado.textoResaltado;
        resultadosBusqueda.innerText = `Se encontraron ${resultado.coincidencias} coincidencias.`;
    };

    window.copiarTexto = function copiarTexto() {
        let texto = document.getElementById('editor').value;
        document.getElementById('salida').innerText = texto;
    };

    window.ajustarTextarea = function ajustarTextarea() {
        let textarea = document.getElementById('editor');
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    };

});
