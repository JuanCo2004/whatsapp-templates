/*
PATRON STORE
Vamos a crear una función encargada de manipular las plantillas
    - Vamos a poder insertar elementos
    - Vamos a poder ver el elemento
    - Vamos a poder reemplazar
*/
function createStore(initialStore = []){
    //Vamos a crear el estado principal del store:
    let state = initialStore;
    //Observers => Funciones que se encargaran de los cambios:
    const listeners = [];

    //Vamos a usar un método para mostrar el valor del state:
    function getState(){
        return state;
    }

    //Esta función se va a encargar de manipular el nuevo estado:
    function setState(newState){
        state = newState;

        //Cuando el estado cambie vamos a llamar a las funciones
        //Para eso se requiere iterar el arreglo listeners
    }

    function addTemplate(newTemplate){
        //Insertar este nuevo elemento en el array state:
        const newState = [...state, newTemplate]
        setState(newState)
    }

    function subscribe(listener){
        listeners.push(listener);

        // Aseguramos que no se suscriban 2 listener iguales
        return () => {
            // Buscar el listener
            const index = listener.indexOf(listener);
            // Retorna la posición (index)
            if(index > -1){
                listeners.splice(index,1);
            }
        }

    }
    
    return{
        getState,
        addTemplate,
        setState
    }
}

// Plantillas iniciales de ejemplo
const initialTemplates = [
    { id: 1, nombre: "Bienvenida", contenido: "Hola, bienvenido a nuestro servicio." },
    { id: 2, nombre: "Recordatorio", contenido: "Este es un recordatorio de su cita." }
];

const templateStore = createStore(initialTemplates);

//Para crear una variable de manera global en todos mis archivos:
window.templateStore = templateStore;