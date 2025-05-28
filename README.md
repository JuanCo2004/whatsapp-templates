# whatsapp-templates
### Descripción técnica de las propiedades y métodos de la clase Template implementada.
La clase Template representa una plantilla individual que contiene datos locales del usuario como el título, el mensaje y el hashtag. Esta clase encapsula el estado local como un método para visualizarlo.

#### Propiedades:
- **Título**: Almacena el título de la plantilla.
- **Mensaje**: Contiene el contenido principal del mensaje de la plantilla.
- **HashTag**: Representa una etiqueta o palabra clave asociada a la plantilla (estado local).

#### Método: 
*render(): string*
Este método retorna una cadena de texto que representa el estado local completo de la instancia. Sirve para mostrar la información de forma clara y estructurada en la salida.
Incluye titulo, mensaje y hashtag formateados.