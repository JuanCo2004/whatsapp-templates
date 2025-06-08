# whatsapp-templates
Historias de usuario adicionales para el proyecto:
## HU13: Buscar plantillas por palabra clave
Como usuario, quiero buscar plantillas escribiendo una palabra clave para encontrar rápidamente las que necesito sin tener que revisar manualmente toda la lista.
. Criterios de Aceptación:
- Se debe filtrar dinámicamente la lista de plantillas mientras el usuario escribe en el campo de búsqueda.
- Si no hay resultados coincidentes, debe mostrarse un mensaje claro de "No se encontraron plantillas".
- La búsqueda debe ser insensible a mayúsculas y funcionar también con palabras parciales.

## HU14 – Borrar todas las plantillas
Como usuario, quiero un botón para borrar todas las plantillas de una vez, para limpiar mi espacio de trabajo rápidamente.
Debe confirmar antes de borrar para evitar pérdidas accidentales.

## HU15: Filtrar plantillas por hashtag
Como usuario, quiero filtrar las plantillas usando un selector de hashtags para visualizar solo las que pertenecen a una categoría específica.
. Criterios de Aceptación:
- Al seleccionar un hashtag del menú desplegable, solo se deben mostrar las plantillas que lo contienen.
- Si se selecciona "Todos los hashtags", deben mostrarse todas las plantillas sin filtro.
- El filtro debe mantenerse aplicado incluso al editar o eliminar una plantilla, sin resetearse automáticamente


### Descripción técnica de las propiedades y métodos de la clase Template implementada
La clase Template representa una plantilla individual que contiene datos locales del usuario como el título, el mensaje y el hashtag. Esta clase encapsula el estado local como un método para visualizarlo.

#### Propiedades:
- **Título**: Almacena el título de la plantilla.
- **Mensaje**: Contiene el contenido principal del mensaje de la plantilla.
- **HashTag**: Representa una etiqueta o palabra clave asociada a la plantilla (estado local).

#### Método: 
*render(): string*
Este método retorna una cadena de texto que representa el estado local completo de la instancia. Sirve para mostrar la información de forma clara y estructurada en la salida.
Incluye titulo, mensaje y hashtag formateados.

### Implementación del patrón Store
**. Estado único:**
let plantillas = [] es el estado central que representa las plantillas actuales.

**. Funciones para modificar el estado:**

- btnSave (evento click) crea una nueva plantilla y actualiza el estado.

- eliminarPlantilla(index) elimina una plantilla del estado.

**. Renderizado desde el estado:**
La función renderizarUI() lee el estado plantillas y actualiza la interfaz mostrando las plantillas actuales.

### Cambios para mantener la inmutabilidad del estado:
Para evitar modificar directamente el estado original, implementé los siguientes cambios:

. En lugar de usar plantillas.push(newTemplate) que muta el array original, use:

plantillas = [...plantillas, newTemplate]
Esto crea un nuevo array que copia todos los elementos anteriores más el nuevo, sin modificar el array original.

. Para eliminar una plantilla, en lugar de modificar el array con métodos mutantes (como splice), use:

plantillas = plantillas.filter((_, i) => i !== index)
Esto devuelve un nuevo array sin el elemento eliminado, sin cambiar el array original.


### Sincronización y Persistencia en la Gestión de Plantillas

#### Sincronización: Patrón Store con Observadores

Se utilizó un **patrón Store personalizado** para centralizar el estado de las plantillas y sincronizar automáticamente los cambios con la interfaz de usuario (UI). Esto se logró mediante una lista de funciones suscritas (listeners) que se ejecutan automáticamente cuando el estado cambia.

##### Componentes clave:
- **`state`**: almacena internamente el array de plantillas.
- **`setState(newState)`**: actualiza el estado y notifica a los observadores.
- **`suscribe(listener)`**: registra funciones que reaccionan a los cambios (como el renderizado).
- **`addTemplate()`, `editTemplate()`, `removeTemplate()`**: modifican el estado y disparan actualizaciones automáticas en la UI.

Este patrón garantiza que cualquier cambio en el estado se refleje **en tiempo real** en la interfaz.

---

#### Persistencia: `localStorage`

Para mantener los datos incluso tras cerrar el navegador, se implementó persistencia usando el API `localStorage`.

##### Funciones implementadas:
- **`savePersistenceData(state)`**: guarda el estado en `localStorage` en formato JSON.
- **`getPersistenceData()`**: recupera el estado almacenado y lo parsea.
- **`deletePersistenceData()`**: limpia todos los datos almacenados.

El Store se inicializa con los datos persistidos al cargar la aplicación:

```js
const templateStore = createStore(getPersistenceData());