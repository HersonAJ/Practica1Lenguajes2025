class Main {
    static analizarTexto() {
        const texto = document.getElementById('editor').value;
        const analizador = new AnalizadorLexico(texto);
        analizador.analizar();
        analizador.imprimirTokens();
        analizador.imprimirErrores();
        poblarTablaTokens(analizador.tokens);
    }
}
