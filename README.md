# whatsapp-templates
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