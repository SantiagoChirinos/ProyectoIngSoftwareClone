window.onload = function(){
    listarJuegos();
};

let listarJuegos = async () => {
    const peticion = await fetch('http://localhost:8080/api/juegos',
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'

        }}
    );

    const juegos = await peticion.json();

    let contenidoTabla = "";
    for(juego of juegos){
        let contenidoFila = `<tr>
        <td>${juego.id}</td>
        <td>${juego.nombre}</td>
        <td>${juego.genero}</td>
        <td>${juego.año}</td>
        <td>
        <i onClick="editarJuego(${juego.id})" class="material-icons button edit">edit</i>
        <i onClick="borrarJuego(${juego.id})" class="material-icons button delete">delete</i>
        </td>
        </tr>`
        contenidoTabla += contenidoFila;
    }

document.querySelector("#tabla tbody").outerHTML = contenidoTabla;
};


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

        
    
