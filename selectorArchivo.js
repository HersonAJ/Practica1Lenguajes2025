class SelectorArchivo {
    constructor(inputFileId, textAreaId) {
        this.inputFile = document.getElementById(inputFileId);
        this.textArea = document.getElementById(textAreaId);
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
            ajustarTextarea(); // Ajustar tamaño tras carga
        };
        lector.readAsText(archivo);
    }
}

function seleccionarArchivo() {
    document.getElementById("inputArchivo").click();
}

// Función para ajustar el tamaño del textarea automáticamente
function ajustarTextarea() {
    const textArea = document.getElementById("editor");
    textArea.style.height = "auto"; // Reiniciar tamaño
    textArea.style.height = textArea.scrollHeight + "px"; // Ajustar al contenido
}

// Iniciar la clase cuando cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
    new SelectorArchivo("inputArchivo", "editor");
});


