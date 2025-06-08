//Estado global para almacenar plantillas:
let plantillas = []

/* 
    Quiero crear una instancia de Template

    new Template(titulo, mensaje, hashtag)
*/
/*
    1. Capturar los elementos con los querySelector.
        a. Validación de los valores
    2. Crear la instancia => new Template (tituloDOM, messageDOM, hashtagDOM)
*/

// Sirve para saber si estoy editando:
let editIndex = null;

//Capturo el valor de guardar:
const btnSave = document.querySelector("#save-template-btn")

btnSave.addEventListener("click", function(){
    // let valueTitle = inputTitle.value;
    // let valueHashtag = inputHashtag.value;
    // let valueMessage = inputMessage.value;

    //Capturo los valores:
    const inputTitle = document.querySelector("#template-title");
    const inputHashtag = document.querySelector("#template-hashtag");
    const inputMessage = document.querySelector("#template-message");

    const newTemplate = new Template(inputTitle.value.trim(),
                                    inputMessage.value.trim(),
                                    inputHashtag.value.trim());
    
    if (editIndex !== null) {
        window.templateStore.editTemplate(editIndex, newTemplate);
        editIndex = null;
        btnSave.innerHTML = '<i class="fas fa-save"></i><span>Guardar Plantilla</span>';
    } else {
        window.templateStore.addTemplate(newTemplate);
    }
    
    //Eliminamos el llamado a esta función porque ahora es parte de nuestro listener
    //  renderizarUI();

    //Limpieza de los selectores:
    inputTitle.value = "";
    inputHashtag.value = "";
    inputMessage.value = "";
    //Actualización de la estadística:
    const totalTemplates = document.querySelector("#total-templates");
    console.log(state);
})

function eliminarPlantilla(index){
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará la plantilla de forma permanente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
   }).then((result) => {
      if (result.isConfirmed) {
        window.templateStore.removeTemplate(index);
        Swal.fire('Eliminado', 'La plantilla ha sido eliminada.', 'success');
      }
      // Si cancela, no hace nada
   });
}

function cargarEdicion(index){
    const state = window.templateStore.getState();
    const plantilla = state(index);
    document.querySelector("#template-title").value = plantilla.titulo;
    document.querySelector("#template-hashtag").value = plantilla.hashtag;
    document.querySelector("#template-mensaje").value = plantilla.mensaje;
    editIndex = index;
    btnSave.innerHTML = '<i class="fas fa-edit"></i><span>Actualizar Plantilla</span>';
}

function renderizarUI(state){
    console.log("renderUI");
    //Renderizar el arreglo dentro de el contenedor div
    const containerTemplate = document.querySelector("#templates-container")
    //Limpiar el contenedor
    containerTemplate.innerHTML = "";
    //Vamos a renderizarlo:
    state.forEach((element, index)=>{
        containerTemplate.innerHTML += `
        <div class="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-purple-300 transition duration-300 hover:shadow-md">
            <div class="flex flex-col lg:flex-row lg:items-start gap-4">
                <div class="flex-1">
                    <div class="flex items-start justify-between mb-3">
                        <div>
                            <h3 class="text-lg font-semibold text-gray-800 mb-1">${element.titulo} - ${index}</h3>
                            <div class="flex gap-2 mb-2">
                                <span class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">${element.hashtag}</span>
                            </div>
                        </div>
                        <div class="text-xs text-gray-500">
                            <i class="fas fa-calendar mr-1"></i>
                        </div>
                    </div>
                    <div class="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                        <p class="text-gray-700 text-sm leading-relaxed">
                            ${element.mensaje}
                        </p>
                    </div>
                </div>
                
                <div class="flex flex-row lg:flex-col gap-2 lg:ml-4">
                    <button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 flex items-center gap-2 text-sm">
                        <i class="fas fa-copy"></i>
                        <span class="hidden sm:inline">Copiar</span>
                    </button>
                    <button onclick="cargarEdicion(${index})" class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 flex items-center gap-2 text-sm">
                        <i class="fas fa-edit"></i>
                        <span class="hidden sm:inline">Editar</span>
                    </button>
                    <button onclick="eliminarPlantilla(${index})" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 flex items-center gap-2 text-sm">
                        <i class="fas fa-trash"></i>
                        <span class="hidden sm:inline">Eliminar</span>
                    </button>
                </div>
            </div>
        </div>
        `
    });
    //Actualización de la estadística:
    const totalTemplates = document.querySelector("#total-templates");
    totalTemplates.textContent = state.length;
}

window.templateStore.suscribe(renderizarUI);
window.templateStore.suscribe(savePersistenceData);

renderizarUI(window.templateStore.getState());

/*HU13: Buscar plantillas por palabra clave*/
const inputSearch = document.querySelector("#search-templates");

inputSearch.addEventListener("input", (e) => {
    const keyword = e.target.value.trim().toLowerCase();
    const allTemplates = window.templateStore.getState();

    if (keyword === "") {
        renderizarUI(allTemplates);
        return;
    }

    const filteredTemplates = allTemplates.filter(template =>
        template.titulo.toLowerCase().includes(keyword)
    );

    renderizarUI(filteredTemplates);
});

/* HU14 - Borrar todas las plantillas con confirmación*/
const btnDeleteAll = document.querySelector("#btn-delete-all");

btnDeleteAll.addEventListener("click", function() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará todas las plantillas permanentemente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, borrar todas',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Vaciar el arreglo de plantillas en el store
            window.templateStore.clearAllTemplates();
            Swal.fire('¡Borrado!', 'Todas las plantillas han sido eliminadas.', 'success');
        }
    });
});

/*HU15: Filtrar plantillas por hashtag */
// Estado para mantener el hashtag seleccionado en el filtro
let filtroHashtag = "Todos los hashtags";

const selectFiltro = document.querySelector("#filter-hashtag");

// Función para obtener todos los hashtags únicos del estado
function obtenerHashtagsUnicos(state) {
    const hashtags = new Set();
    state.forEach(item => {
        if(item.hashtag && item.hashtag.trim() !== "") {
            hashtags.add(item.hashtag.trim());
        }
    });
    return Array.from(hashtags).sort();
}

// Función para actualizar las opciones del filtro
function actualizarOpcionesFiltro(state) {
    const hashtags = obtenerHashtagsUnicos(state);
    selectFiltro.innerHTML = `<option value="Todos los hashtags">Todos los hashtags</option>`;
    hashtags.forEach(ht => {
        selectFiltro.innerHTML += `<option value="${ht}">${ht}</option>`;
    });

    // Mantener el valor seleccionado tras actualización
    selectFiltro.value = filtroHashtag;
}

// Función para filtrar plantillas según el filtro seleccionado
function filtrarPlantillasPorHashtag(state, hashtag) {
    if (hashtag === "Todos los hashtags") {
        return state;
    }
    return state.filter(p => p.hashtag === hashtag);
}

// Nuevo renderizado filtrado
function renderizarUIFiltrado(state) {
    const estadoFiltrado = filtrarPlantillasPorHashtag(state, filtroHashtag);
    renderizarUI(estadoFiltrado);  // Usamos la función que ya tienes para renderizar
    actualizarOpcionesFiltro(state); // Actualizamos opciones cada vez que se renderiza (por si hay hashtags nuevos)
}

// Escuchar cambios en el selector de filtro
selectFiltro.addEventListener("change", (e) => {
    filtroHashtag = e.target.value;
    renderizarUIFiltrado(window.templateStore.getState());
});

// Cambiar las suscripciones para usar el render filtrado
window.templateStore.suscribe(renderizarUIFiltrado);
window.templateStore.suscribe(savePersistenceData);

// Inicializar
actualizarOpcionesFiltro(window.templateStore.getState());
renderizarUIFiltrado(window.templateStore.getState());