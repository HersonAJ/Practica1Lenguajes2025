class Token {
    constructor(tipo, valor, columna, fila) {
        this.tipo = tipo;
        this.valor = valor;
        this.posicion = {
            columna: columna,
            fila: fila
        };
    }
}
