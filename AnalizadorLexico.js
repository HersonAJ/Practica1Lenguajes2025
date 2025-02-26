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
            } else if (Funciones.esDigito(char) || (char === '.' && this.posicion > 0 && Funciones.esDigito(this.texto[this.posicion - 1]))) {
                this.analizarNumeroODecimal();
            } else if (Funciones.esOperador(char)) {
                this.analizarOperador(char);
            } else if (Funciones.esPuntuacion(char)) {
                this.agregarToken("Puntuacion", char, this.columna, this.fila);
                this.columna++;
                this.posicion++;
            } else if (Funciones.esAgrupacion(char)) {
                this.agregarToken("Agrupacion", char, this.columna, this.fila);
                this.columna++;
                this.posicion++;
            } else if (Funciones.esEspacio(char)) {
                this.columna++;
                this.posicion++;
            } else if (Funciones.esSaltoDeLinea(char)) {
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

    analizarNumeroODecimal() {
        let inicio = this.posicion;
        let longitudLexema = 0;
        let tienePunto = false;

        while (this.posicion < this.texto.length && (Funciones.esDigito(this.texto[this.posicion]) || this.texto[this.posicion] === '.')) {
            if (this.texto[this.posicion] === '.') {
                if (tienePunto) {
                    this.errores.push(new ErrorLexico(this.texto.substring(inicio, this.posicion + 1), this.columna, this.fila));
                    return;
                }
                tienePunto = true;
            }
            this.posicion++;
            longitudLexema++;
        }

        if (tienePunto && (this.posicion === inicio + 1 || this.texto[this.posicion - 1] === '.')) {
            this.errores.push(new ErrorLexico(this.texto.substring(inicio, this.posicion), this.columna, this.fila));
            return;
        }

        const valor = this.texto.substring(inicio, this.posicion);
        this.agregarToken(tienePunto ? "Decimal" : "Numero", valor, this.columna, this.fila);
        this.columna += longitudLexema;
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

    analizarOperador(char) {
        if (char === '&' && this.texto[this.posicion + 1] === '&') {
            this.agregarToken("Operador Logico", '&&', this.columna, this.fila);
            this.columna += 2;
            this.posicion += 2;
        } else if (char === '|' && this.texto[this.posicion + 1] === '|') {
            this.agregarToken("Operador Logico", '||', this.columna, this.fila);
            this.columna += 2;
            this.posicion += 2;
        } else if (['<', '>', '='].includes(char) && this.texto[this.posicion + 1] === '=') {
            this.agregarToken("Operador Relacional", char + '=', this.columna, this.fila);
            this.columna += 2;
            this.posicion += 2;
        } else if (['+', '-', '*', '/', '^'].includes(char)) {
            this.agregarToken("Operador Aritmetico", char, this.columna, this.fila);
            this.columna++;
            this.posicion++;
        } else if (['<', '>'].includes(char)) {
            this.agregarToken("Operador Relacional", char, this.columna, this.fila);
            this.columna++;
            this.posicion++;
        } else if (char === '=') {
            this.agregarToken("Operador de Asignacion", char, this.columna, this.fila);
            this.columna++;
            this.posicion++;
        }
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
