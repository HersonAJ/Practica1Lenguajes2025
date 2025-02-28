class Analizadores {
    static esLetra(char) {
        switch (char) {
            case 'A': case 'B': case 'C': case 'D': case 'E': case 'F':
            case 'G': case 'H': case 'I': case 'J': case 'K': case 'L':
            case 'M': case 'N': case 'O': case 'P': case 'Q': case 'R':
            case 'S': case 'T': case 'U': case 'V': case 'W': case 'X':
            case 'Y': case 'Z':
            case 'a': case 'b': case 'c': case 'd': case 'e': case 'f':
            case 'g': case 'h': case 'i': case 'j': case 'k': case 'l':
            case 'm': case 'n': case 'o': case 'p': case 'q': case 'r':
            case 's': case 't': case 'u': case 'v': case 'w': case 'x':
            case 'y': case 'z':
                return true;
            default:
                return false;
        }
    }

    static esDigito(char) {
        switch (char) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                return true;
            default:
                return false;
        }
    }

    static esOperador(char) {
        const operadores = ['^', '*', '/', '+', '-', '<', '>', '=', '&', '|'];
        for (let i = 0; i < operadores.length; i++) {
            if (char === operadores[i]) {
                return true;
            }
        }
        return false;
    }

    static esPuntuacion(char) {
        const puntuacion = ['.', ',', ';', ':'];
        for (let i = 0; i < puntuacion.length; i++) {
            if (char === puntuacion[i]) {
                return true;
            }
        }
        return false;
    }

    static esAgrupacion(char) {
        const agrupacion = ['(', ')', '[', ']', '{', '}'];
        for (let i = 0; i < agrupacion.length; i++) {
            if (char === agrupacion[i]) {
                return true;
            }
        }
        return false;
    }

    static esSaltoDeLinea(char) {
        return char === '\n'
    }

    static esEspacio (char) {
        return char ===' '
    }
}
