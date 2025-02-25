class AnalizadorLexico {
    constructor(texto) {
        this.texto = texto;
        this.tokens = [];
        this.errores = [];
        this.posicion = 0;
        this.columna = 0;
        this.fila = 0;
    }

    analizar() {
        this.fila = 1;
        this.columna = 1;
        while (this.posicion < this.texto.length) {
            const char = this.texto[this.posicion];
            if (Funciones.esLetra(char)) {
                this.analizarIdentificador();
            } else if (Funciones.esDigito(char)) {
                this.analizarNumero();
            } else if (Funciones.esOperador(char)) {
                this.agregarToken("Operador", char, this.columna, this.fila);
                this.columna++;
                this.posicion++;
            } else if (Funciones.esPuntuacion(char)) {
                this.agregarToken("Puntuacion", char, this.columna, this.fila);
                this.columna++;
                this.posicion++;
            } else if (Funciones.esAgrupacion(char)) {
                this.agregarToken("Agrupacion", char, this.columna, this.fila);
                this.columna++;
                this.posicion++;
            } else if (char === ' ') {
                this.columna++;
                this.posicion++;
            } else if (char === '\n') {
                this.fila++;
                this.columna = 1;
                this.posicion++;
            } else {
                this.errores.push(new ErrorLexico(char, this.columna, this.fila));
                this.columna++;
                this.posicion++;
            }
        }
    }

    analizarIdentificador() {
        let inicio = this.posicion;
        let longitudLexema = 0;
        while (this.posicion < this.texto.length && (Funciones.esLetra(this.texto[this.posicion]) || Funciones.esDigito(this.texto[this.posicion]))) {
            this.posicion++;
            longitudLexema++;
        }
        const valor = this.texto.substring(inicio, this.posicion);
        this.agregarToken("Identificador", valor, this.columna, this.fila);
        this.columna += longitudLexema;
    }

    analizarNumero() {
        let inicio = this.posicion;
        let longitudLexema = 0;
        while (this.posicion < this.texto.length && Funciones.esDigito(this.texto[this.posicion])) {
            this.posicion++;
            longitudLexema++;
        }
        if (this.posicion < this.texto.length && this.texto[this.posicion] === '.') {
            this.posicion++;
            longitudLexema++;
            while (this.posicion < this.texto.length && Funciones.esDigito(this.texto[this.posicion])) {
                this.posicion++;
                longitudLexema++;
            }
        }
        const valor = this.texto.substring(inicio, this.posicion);
        this.agregarToken("Numero", valor, this.columna, this.fila);
        this.columna += longitudLexema;
    }

    agregarToken(tipo, valor, columna, fila) {
        this.tokens.push(new Token(tipo, valor, columna, fila));
    }

    imprimirTokens() {
        console.log("Tokens analizados:");
        this.tokens.forEach(token => {
            console.log(`Tipo: ${token.tipo}, Valor: ${token.valor}, Columna: ${token.posicion.columna}, Fila: ${token.posicion.fila}`);
        });
    }

    imprimirErrores() {
        console.log("Errores léxicos:");
        this.errores.forEach(error => {
            console.log(`Símbolo: ${error.simbolo}, Columna: ${error.posicion.columna}, Fila: ${error.posicion.fila}`);
        });
    }
}
