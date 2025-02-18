class ErrorLexico {
    constructor(simbolo, columna, fila) {
        this.simbolo = simbolo;
        this.posicion = {
            columna: columna,
            fila: fila
        };
    }
}
