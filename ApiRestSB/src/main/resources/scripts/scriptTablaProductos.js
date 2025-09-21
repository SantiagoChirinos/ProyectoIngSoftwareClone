window.onload = function() {
    listarPeliculas();
};

//LISTAR PRODUCTOS
let listarPeliculas = async()=>{

    const peticion = await fetch("http://localhost:8080/api/productos",
    {   method: 'GET',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        }, 
    });

    const peliculas = await peticion.json()

    let contenidoTabla ="";

    for (const pelicula of peliculas) {
        let contenidoFila = `<tr>
        <td>${pelicula.identificacion}</td>
        <td>${pelicula.nombre}</td>
        <td>${pelicula.descripcion}</td>
        <td>${pelicula.disp}</td>
        <td>${pelicula.precio}</td>
        </tr>`

    contenidoTabla += contenidoFila;
    }

    document.querySelector("#tabla tbody").outerHTML = contenidoTabla;

}

let filtrarProductos = async () => {
    const disponibilidad = document.getElementById("filterDisponibilidad").value;
    const peticion = await fetch("http://localhost:8080/api/productos",
    {   method: 'GET',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        }, 
    });

    const peliculas = await peticion.json()

    let contenidoTabla ="";

    for (const pelicula of peliculas) {
        if (disponibilidad === "all" || pelicula.disp === disponibilidad) {
            let contenidoFila = `<tr>
            <td>${pelicula.identificacion}</td>
            <td>${pelicula.nombre}</td>
            <td>${pelicula.descripcion}</td>
            <td>${pelicula.disp}</td>
            <td>${pelicula.precio}</td>
            </tr>`

            contenidoTabla += contenidoFila;
        }
    }

    document.querySelector("#tabla tbody").outerHTML = contenidoTabla;
}

let borrarJuego = async(id)=>{

    const peticion = await fetch("http://localhost:8080/api/juego/"+id,
    {   method: 'DELETE',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        }, 
    });

    listarJuegos();

}

let idEditar;

let editarJuego = async (id)=>{
    mostrarFormulario();


    idEditar = id;
    const peticion = await fetch('http://localhost:8080/api/juego/'+id,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'

        }}
    );
    const juego = await peticion.json();
    document.getElementById("nombre").value = juego.nombre;
    document.getElementById("genero").value = juego.genero;
    document.getElementById("año").value = juego.año;
    let botonModificar = document.getElementById("btnModificar");
}
let boton = document.getElementById("btnModificar");

boton.addEventListener("click", evento =>{
    aplicarCambios(idEditar);
});
let aplicarCambios = async (id)=>{
campos = {};
campos.id = id;
campos.nombre = document.getElementById("nombre").value;
campos.genero = document.getElementById("genero").value;
campos.año = document.getElementById("año").value;

const peticion = await fetch('http://localhost:8080/api/juegos',
    {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(campos)
    }
);

listarJuegos();

}
function mostrarFormulario(){
    let formulario = document.getElementById("formulario").style.visibility="visible";
}
