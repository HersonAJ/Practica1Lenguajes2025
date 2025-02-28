class AnalizadorLexico {
    constructor(texto) {
        this.texto = texto;
        this.tokens = [];
        this.errores = [];
        this.posicion = 0;
        this.columna = 0;
        this.fila = 0;
        this.enError = false;
    }

    analizar() {
        this.fila = 1;
        this.columna = 1;
        while (this.posicion < this.texto.length) {
            if (this.enError) {
                this.analizarError();
            } else {
                const char = this.texto[this.posicion];
                if (Analizadores.esLetra(char)) {
                    this.analizarIdentificador();
                } else if (Analizadores.esDigito(char)) {
                    this.analizarNumeroODecimal();
                } else if (Analizadores.esOperador(char)) {
                    this.analizarOperador(char);
                } else if (Analizadores.esPuntuacion(char)) {
                    this.agregarToken("Puntuacion", char, this.columna, this.fila);
                    this.columna++;
                    this.posicion++;
                } else if (Analizadores.esAgrupacion(char)) {
                    this.agregarToken("Agrupacion", char, this.columna, this.fila);
                    this.columna++;
                    this.posicion++;
                } else if (Analizadores.esEspacio(char)) {
                    this.columna++;
                    this.posicion++;
                } else if (Analizadores.esSaltoDeLinea(char)) {
                    this.fila++;
                    this.columna = 1;
                    this.posicion++;
                } else {
                    this.enError = true;
                    this.analizarError();
                }
            }
        }
    }

    analizarIdentificador() {
        let inicio = this.posicion;
        let longitudLexema = 0;
        while (this.posicion < this.texto.length && (Analizadores.esLetra(this.texto[this.posicion]) || Analizadores.esDigito(this.texto[this.posicion]))) {
            this.posicion++;
            longitudLexema++;
        }
        const valor = this.texto.substring(inicio, this.posicion);
        if (!this.enError) {
            this.agregarToken("Identificador", valor, this.columna, this.fila);
        }
        this.columna += longitudLexema;
    }

    analizarNumeroODecimal() {
        let inicio = this.posicion;
        let longitudLexema = 0;
        let tienePunto = false;

        while (this.posicion < this.texto.length && (Analizadores.esDigito(this.texto[this.posicion]) || this.texto[this.posicion] === '.')) {
            if (this.texto[this.posicion] === '.') {
                if (tienePunto) {
                    this.enError = true;
                    this.errores.push(new ErrorLexico(this.texto.substring(inicio, this.posicion + 1), this.columna, this.fila));
                    return;
                }
                tienePunto = true;
            }
            this.posicion++;
            longitudLexema++;
        }

        if (tienePunto && (this.posicion === inicio + 1 || this.texto[this.posicion - 1] === '.')) {
            this.enError = true;
            this.errores.push(new ErrorLexico(this.texto.substring(inicio, this.posicion), this.columna, this.fila));
            return;
        }

        const valor = this.texto.substring(inicio, this.posicion);
        if (!this.enError) {
            this.agregarToken(tienePunto ? "Decimal" : "Numero", valor, this.columna, this.fila);
        }
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

    analizarError() {
        let inicio = this.posicion;
        let longitudLexema = 0;

        // Mover hacia atrás para capturar el inicio de la palabra
        while (inicio > 0 && !Analizadores.esEspacio(this.texto[inicio - 1]) && !Analizadores.esSaltoDeLinea(this.texto[inicio - 1])) {
            inicio--;
        }

        // Mover hacia adelante para capturar el final de la palabra
        while (this.posicion < this.texto.length && !Analizadores.esEspacio(this.texto[this.posicion]) && !Analizadores.esSaltoDeLinea(this.texto[this.posicion])) {
            this.posicion++;
            longitudLexema++;
        }

        const valor = this.texto.substring(inicio, this.posicion);
        this.errores.push(new ErrorLexico(valor, this.columna, this.fila));
        this.posicion = inicio + valor.length; // Asegurar que la posición no avance innecesariamente
        this.columna += longitudLexema;
        this.enError = false;
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
