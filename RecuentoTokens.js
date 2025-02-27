function contarLexemas(tokens) {
    const conteoLexemas = {};
    tokens.forEach(token => {
        if (!conteoLexemas[token.valor]) {
            conteoLexemas[token.valor] = 0;
        }
        conteoLexemas[token.valor]++;
    });
    return conteoLexemas;
}

function poblarTablaRecuentoLexemas(conteoLexemas) {
    const tabla = document.getElementById('tablaRecuentoLexemas').getElementsByTagName('tbody')[0];
    tabla.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos

    for (const lexema in conteoLexemas) {
        const fila = tabla.insertRow();
        const celdaLexema = fila.insertCell(0);
        const celdaCantidad = fila.insertCell(1);

        celdaLexema.textContent = lexema;
        celdaCantidad.textContent = conteoLexemas[lexema];
    }
}

function cargarRecuentoLexemas() {
    const tokens = JSON.parse(sessionStorage.getItem('tokens'));
    if (tokens) {
        const conteoLexemas = contarLexemas(tokens);
        poblarTablaRecuentoLexemas(conteoLexemas);
    }
}

// Llamar a la función cargarRecuentoLexemas cuando la página esté cargada
window.onload = cargarRecuentoLexemas;
