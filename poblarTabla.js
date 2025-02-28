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

function poblarTablaErrores(errores) {
    const tabla = document.getElementById('tablaErrores').getElementsByTagName('tbody')[0];
    tabla.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos

    errores.forEach(error => {
        const fila = tabla.insertRow();
        const celdaCadena = fila.insertCell(0);
        const celdaColumna = fila.insertCell(1);
        const celdaFila = fila.insertCell(2);

        celdaCadena.textContent = error.simbolo;
        celdaColumna.textContent = error.posicion.columna;
        celdaFila.textContent = error.posicion.fila;
    });
}

function cargarTokens() {
    const tokens = JSON.parse(sessionStorage.getItem('tokens'));
    if (tokens) {
        poblarTablaTokens(tokens);
    }
}

function cargarErrores() {
    const errores = JSON.parse(sessionStorage.getItem('errores'));
    if (errores) {
        poblarTablaErrores(errores);
    }
}

