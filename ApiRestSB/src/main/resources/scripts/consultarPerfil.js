window.addEventListener("DOMContentLoaded", (eventt)=>{
    let botonConsultar = document.getElementById("buscarPorCedula");
    let cedula = "";

    botonConsultar.addEventListener("click",eventos=> {
        cedula = document.getElementById("cedulaInput").value;
        if(esCadenaDeEnteros(cedula) == true){
            cedulaExiste(cedula);
        } else {
            var campo = document.getElementById('cedulaInput');  
            var valor = campo.value;   
            campo.value = ''; // Vaciar el campo 
            campo.placeholder = 'Cararteres Invalidos, debe ser por ejemplo: 12345678'; // Mensaje de error 
           
        }    
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
    
    clienteEncontrado=false;
    for(let perfil of perfiles){
        if( perfil.cedula == cedula ){
            clienteEncontrado=true;
            cliente = perfil; 
        }
    }

    if(clienteEncontrado==true){
        buscarDatos(cliente);
    } else {
        alert('Cliente no Encontrado');
    }

};

function buscarDatos(datos) {

    // Mostrar los datos en el HTML
    document.getElementById('cedula').textContent = datos.cedula;
    document.getElementById('nombre').textContent = datos.nombre;
    document.getElementById('apellido').textContent = datos.apellido;
    document.getElementById('nacimiento').textContent = datos.nacimiento;
    document.getElementById('correo').textContent = datos.correo;
    document.getElementById('telefono').textContent = datos.telefono;
    document.getElementById('saldo').textContent = datos.saldo;
    
    if(datos.privilegio == 0){
        document.getElementById('cuadroPrivilegio').textContent = 'Cliente'; 
    }
    if(datos.privilegio == 1){
        document.getElementById('cuadroPrivilegio').textContent = 'Empleado';
    }
    if(datos.privilegio == 2){
        document.getElementById('cuadroPrivilegio').textContent = 'Admin';
    }

    // Mostrar el recuadro de información
    document.getElementById('info').classList.remove('hidden');
}

function esCadenaDeEnteros(cadena) { 
    return /^[0-9]+$/.test(cadena); 
}