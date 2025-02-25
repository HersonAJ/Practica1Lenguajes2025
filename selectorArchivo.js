class SelectorArchivo {
    constructor(inputFileId, textAreaId, outputAreaId) {
        this.inputFile = document.getElementById(inputFileId);
        this.textArea = document.getElementById(textAreaId);
        this.outputArea = document.getElementById(outputAreaId);
        this.init();
    }

    init() {
        this.inputFile.addEventListener('change', (event) => this.cargarArchivo(event));
    }

    cargarArchivo(event) {
        const archivo = event.target.files[0];
        if (!archivo) {
            alert("No se seleccionó ningún archivo.");
            return;
        }

        const lector = new FileReader();
        lector.onload = (e) => {
            this.textArea.value = e.target.result;
            this.outputArea.value = e.target.result; // Copia el texto al área de salida
        };
        lector.readAsText(archivo);
    }
}

// Función para abrir el selector de archivos
function seleccionarArchivo() {
    document.getElementById("inputArchivo").click();
}

// Iniciar la clase cuando cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
    new SelectorArchivo("inputArchivo", "editor", "salida");
});