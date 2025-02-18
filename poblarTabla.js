function poblarTablaTokens(tokens) {
    const tabla = document.getElementById('tablaTokens').getElementsByTagName('tbody')[0];
    tabla.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos

    tokens.forEach(token => {
        const fila = tabla.insertRow();
        const celdaToken = fila.insertCell(0);
        const celdaLexema = fila.insertCell(1);
        const celdaColumna = fila.insertCell(2);
        const celdaFila = fila.insertCell(3);

        celdaToken.textContent = token.tipo;
        celdaLexema.textContent = token.valor;
        celdaColumna.textContent = token.posicion.columna;
        celdaFila.textContent = token.posicion.fila;
    });
}

function analizarTexto() {
    const texto = document.getElementById('editor').value;
    const analizador = new AnalizadorLexico(texto);
    analizador.analizar();
    analizador.imprimirTokens();
    analizador.imprimirErrores();

    // Guardar los tokens en sessionStorage
    sessionStorage.setItem('tokens', JSON.stringify(analizador.tokens));
}

function cargarTokens() {
    const tokens = JSON.parse(sessionStorage.getItem('tokens'));
    if (tokens) {
        poblarTablaTokens(tokens);
    }
}

