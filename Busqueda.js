class Busqueda {
    static buscarTexto(texto, buscar) {
        let textoResaltado = '';
        let coincidencias = 0;
        let inicio = 0;

        // Buscar coincidencias manualmente
        while (inicio < texto.length) {
            let indice = -1;  // Inicializar índice a -1 para indicar que no se encontró
            // Buscar el índice de la primera aparición de la palabra a buscar
            for (let i = inicio; i <= texto.length - buscar.length; i++) {
                if (texto.substring(i, i + buscar.length) === buscar) {
                    indice = i;
                    break;  // Salir del bucle al encontrar la primera coincidencia
                }
            }

            // Si se encuentra una coincidencia
            if (indice !== -1) {
                coincidencias += 1;  // Incrementar el contador de coincidencias
                // Agregar texto antes de la coincidencia y la coincidencia resaltada
                textoResaltado += texto.substring(inicio, indice) + '<span class="highlight">' + buscar + '</span>';
                // Mover el inicio después de la coincidencia
                inicio = indice + buscar.length;
            } else {
                // Agregar el resto del texto si no hay más coincidencias
                textoResaltado += texto.substring(inicio);
                break;  // Salir del bucle
            }
        }

        // Reemplazar saltos de línea (\n) con <br>
        let textoConSaltos = '';
        for (let i = 0; i < textoResaltado.length; i++) {
            if (textoResaltado[i] === '\n') {
                textoConSaltos += '<br>';
            } else {
                textoConSaltos += textoResaltado[i];
            }
        }

        return {
            textoResaltado: textoConSaltos,  
            coincidencias
        };
    }
}