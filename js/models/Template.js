//Creamos la clase Template:
class Template{
    constructor(titulo, mensaje, hashtag){
        this.titulo = titulo;
        this.mensaje = mensaje;
        this.hashtag = hashtag;
    }
    // Método para mostrar el estado local de la plantilla
    render() {
        return `
            Título: ${this.titulo}
            Mensaje: ${this.mensaje}
            Hashtag: ${this.hashtag}
        `;
    }
}

