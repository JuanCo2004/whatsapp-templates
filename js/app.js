//Estado global para almacenar plantillas:
const plantillas = [];

// Función para agregar una plantilla
function agregarPlantilla(titulo, mensaje, hashtag) {
    const plantilla = new Template(titulo, mensaje, hashtag);
    plantillas.push(plantilla);
}

// Función para eliminar una plantilla por índice
function eliminarPlantilla(indice) {
    if (indice >= 0 && indice < plantillas.length) {
        plantillas.splice(indice, 1);
    }
}

// Función global para mostrar todas las plantillas y su estado local
function renderPlantillas() {
    if (plantillas.length === 0) {
        console.log("No hay plantillas almacenadas.");
        return;
    }

    console.log("Estado global: Lista de plantillas almacenadas:");
    plantillas.forEach((plantilla, index) => {
        console.log(`\nPlantilla #${index + 1}:`);
        console.log(plantilla.render());
    });
}