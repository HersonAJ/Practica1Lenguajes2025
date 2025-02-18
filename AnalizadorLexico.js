class AnalizadorLexico {
    constructor(texto) {
        this.texto = texto;
        this.tokens = [];
        this.errores = [];
        this.posicion = 0;
        this.columna = 0;
        this.fila =0;
    }


        analizar() {
            this.fila = 1;
            this.columna = 1;
            while (this.posicion < this.texto.length) {
              const char = this.texto[this.posicion];
              if (esLetra(char)) {
                this.analizarIdentificador();
              } else if (esDigito(char)) {
                this.analizarNumero();
              } else if (esOperador(char)) {
                this.agregarToken("Operador", char, this.columna, this.fila);
                this.columna++;
                this.posicion++;
              } else if (esPuntuacion(char)) {
                this.agregarToken("Puntuacion", char, this.columna, this.fila);
                this.columna++;
                this.posicion++;
              } else if (esAgrupacion(char)) {
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
        while (this.posicion < this.texto.length && (esLetra(this.texto[this.posicion]) || esDigito(this.texto[this.posicion]))) {
            this.posicion++;
        }
        const valor = this.texto.substring(inicio, this.posicion);
        this.agregarToken("Identificador", valor, this.columna, this.fila);
    }

    analizarNumero() {
        let inicio = this.posicion;
        while (this.posicion < this.texto.length && esDigito(this.texto[this.posicion])) {
            this.posicion++;
        }
        if (this.posicion < this.texto.length && this.texto[this.posicion] === '.') {
            this.posicion++;
            while (this.posicion < this.texto.length && esDigito(this.texto[this.posicion])) {
                this.posicion++;
            }
        }
        const valor = this.texto.substring(inicio, this.posicion);
        this.agregarToken("Numero", valor, this.columna, this.fila);
    }


    agregarToken(tipo, valor, columna, fila) {
        this.tokens.push(new Token(tipo, valor, columna, fila));
    }

    imprimirTokens() {
        console.log("Tokens analizados:");
        this.tokens.forEach(token => {
            console.log(`Tipo: ${token.tipo}, Valor: ${token.valor}, Posición: ${token.posicion}`);
        });
    }

    imprimirErrores() {
        console.log("Errores léxicos:");
        this.errores.forEach(error => {
            console.log(`Símbolo: ${error.simbolo}, Posición: ${error.posicion}`);
        });
    }
}
function esLetra(char) {
    for (let i = 0; i < 26; i++) {
        if (char === String.fromCharCode(65 + i) || char === String.fromCharCode(97 + i)) {
            return true;
        }
    }
    return false;
}

function esDigito(char) {
    for (let i = 0; i < 10; i++) {
        if (char === String.fromCharCode(48 + i)) {
            return true;
        }
    }
    return false;
}

function esOperador(char) {
    const operadores = ['^', '*', '/', '+', '-', '<', '>', '=', '&', '|'];
    for (let i = 0; i < operadores.length; i++) {
        if (char === operadores[i]) {
            return true;
        }
    }
    return false;
}

function esPuntuacion(char) {
    const puntuacion = ['.', ',', ';', ':'];
    for (let i = 0; i < puntuacion.length; i++) {
        if (char === puntuacion[i]) {
            return true;
        }
    }
    return false;
}

function esAgrupacion(char) {
    const agrupacion = ['(', ')', '[', ']', '{', '}'];
    for (let i = 0; i < agrupacion.length; i++) {
        if (char === agrupacion[i]) {
            return true;
        }
    }
    return false;
}


function analizarTexto() {
    const texto = document.getElementById('editor').value;
    const analizador = new AnalizadorLexico(texto);
    analizador.analizar();
    analizador.imprimirTokens();
    analizador.imprimirErrores();
}