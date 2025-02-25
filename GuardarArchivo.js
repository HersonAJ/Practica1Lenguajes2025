class GuardarTexto {
    static guardarComoArchivo(texto, nombreArchivo) {
        if (!nombreArchivo.endsWith(".txt")) {
            nombreArchivo += ".txt"; // Asegurar que el archivo tenga extensión .txt
        }

        const blob = new Blob([texto], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = nombreArchivo;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}
