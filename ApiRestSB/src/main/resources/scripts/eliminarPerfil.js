window.addEventListener("DOMContentLoaded", (eventt)=>{
    let botonConfirmar = document.getElementById("confirmar");
    let botonCedula = document.getElementById("buscarCliente");
    let cedula = "";
    let cliente;

    if(localStorage.getItem('rol') == 2){
        document.getElementById('password').classList.add('hidden');
    }

    botonCedula.addEventListener("click",eventos=> {
        cedula = document.getElementById("cedula").value;
        if(esCadenaDeEnteros(cedula) == true){
            cedulaExiste(cedula);
        } else {
            var campo = document.getElementById('cedula');  
            var valor = campo.value;   
            campo.value = ''; // Vaciar el campo 
            campo.placeholder = 'Cararteres Invalidos, debe ser por ejemplo: 12345678'; // Mensaje de error 
           
        }    
    })

    botonConfirmar.addEventListener("click",eventos=> {
        eliminarPerfil(cedula);
    })
})

let cedulaExiste = async (cedula) => {
    const peticion = await fetch("http://localhost:8080/api/perfiles", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    const perfiles = await peticion.json(); 
    let clienteEncontrado=false;

    if(localStorage.getItem('rol') == 2){
        for(let perfil of perfiles){
            if( perfil.cedula == cedula ){
                clienteEncontrado=true;
                cliente = perfil; 
            }
        }
    } else {
        for(let perfil of perfiles){
            if( perfil.cedula == cedula && perfil.password == document.getElementById("password").value){
                clienteEncontrado=true;
                cliente = perfil; 
            }
        }
    }
    

    if(clienteEncontrado){
        document.getElementById("info").classList.remove("hidden");
        document.getElementById("Confirmacion").classList.remove("hidden");
        const infoHtml = ` 
        <h3>Información del Cliente</h3> 
        <p><strong>Nombre:</strong> ${cliente.nombre + cliente.apellido}</p> 
        <p><strong>Cedula:</strong> ${cliente.cedula}</p> 
        <p><strong>Telefono:</strong> ${cliente.telefono}</p> 
        <p><strong>Correo:</strong> ${cliente.correo}</p> 
        `; 

        const infoDiv = document.getElementById("infoDelCliente"); 
        infoDiv.innerHTML = infoHtml; 

    } else {
        alert('Cliente no Encontrado');
    }

};

async function eliminarPerfil(cedula) { 
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar el perfil con cédula ${cedula}?`); 
    if (confirmacion) { 
    try { 
        const respuesta = await fetch(`http://localhost:8080/api/borrarCuenta/${cedula}`, { 
            method: 'DELETE', 
            headers: { 
                'Accept': 'application/json', 
                'Content-type': 'application/json' 
            } 
        }); 
        if (respuesta.ok) { 
            alert('Perfil eliminado correctamente'); 
        } else { 
            alert('Error al eliminar el perfil'); 
        } 
    } catch (error) { 
        console.error('Error:', error); 
        alert('Error al conectar con el servidor'); 
    }} else { 
        alert('Eliminación cancelada'); 
    } 
}

function esCadenaDeEnteros(cadena) { 
    return /^[0-9]+$/.test(cadena); 
}
