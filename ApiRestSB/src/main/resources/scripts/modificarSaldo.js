window.addEventListener("DOMContentLoaded", (eventt)=>{
    let botonA = document.getElementById("aumentarSaldo");
    let botonD = document.getElementById("disminuirSaldo");
    let botonConfirmarA = document.getElementById("confirmarCambioAumento");
    let botonConfirmarD = document.getElementById("confirmarCambioDisminuye");
    let botonCedula = document.getElementById("buscarCliente");
    let cedula = "";
    let cliente;


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

    botonA.addEventListener("click",eventos=> {    
        document.getElementById("montoMas").classList.remove("hidden");
        document.getElementById("confirmarCambioAumento").classList.remove("hidden");
        document.getElementById("montoMenos").classList.add("hidden"); 
        document.getElementById("confirmarCambioDisminuye").classList.add("hidden");
    })

    botonD.addEventListener("click",eventos=> {
        document.getElementById("montoMenos").classList.remove("hidden");
        document.getElementById("confirmarCambioDisminuye").classList.remove("hidden");
        document.getElementById("montoMas").classList.add("hidden"); 
        document.getElementById("confirmarCambioAumento").classList.add("hidden");
    })

    botonConfirmarA.addEventListener("click",eventos=> {
        monto = document.getElementById("montoMas").value;
        if(esCadenaDeEnterosOFloatPositivos(monto)){
            modificarSaldo('aumentar', cedula);
        } else {
            let campo = document.getElementById('montoMas'); 
            let valor = campo.value;
            campo.value = ''; // Vaciar el campo 
            campo.placeholder = 'Caracter Invalido, tiene que ser un numero positivo por ejemplo: 99.99'; 
        }
        
    })

    botonConfirmarD.addEventListener("click",eventos=> {
        monto = document.getElementById("montoMenos").value;
        if(esCadenaDeEnterosOFloatPositivos(monto)){
            modificarSaldo('disminuir', cedula);
        } else {
            let campo = document.getElementById('montoMenos'); 
            let valor = campo.value;
            campo.value = ''; // Vaciar el campo 
            campo.placeholder = 'Caracter Invalido, tiene que ser un numero positivo por ejemplo: 99.99'; 
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
    
    let clienteEncontrado=false;
    for(let perfil of perfiles){
        if( perfil.cedula == cedula ){
            clienteEncontrado=true;
            cliente = perfil; 
        }
    }
    if(clienteEncontrado){
        document.getElementById("info").classList.remove("hidden");
        document.getElementById("modificarSaldo").classList.remove("hidden");
        const infoHtml = ` 
        <h3>Información del Cliente</h3> 
        <p><strong>Nombre:</strong> ${cliente.nombre}</p> 
        <p><strong>Correo:</strong> ${cliente.correo}</p> 
        <p><strong>Telefono:</strong> ${cliente.telefono}</p> 
        <p><strong>Saldo:</strong><span id="clienteSaldo"> ${cliente.saldo}</span></p> 
        `; 

        const infoDiv = document.getElementById("infoDelCliente"); 
        infoDiv.innerHTML = infoHtml; 
        
        document.getElementById("tituloModificarSaldo").classList.remove("hidden");
        document.getElementById("aumentarSaldo").classList.remove("hidden");
        document.getElementById("disminuirSaldo").classList.remove("hidden");

    } else {
        alert('Cliente no Encontrado');
    }

};

async function actualizarSaldo(perfil) { 
    const response = await fetch("http://localhost:8080/api/actualizaSaldo", { 
        method: 'PUT', 
        headers: { 
            'Content-Type': 
            'application/json' 
        }, 
        body: JSON.stringify(perfil) }); 

    if (response.ok) { 
        const perfilActualizado = await response.json(); 
        console.log('Saldo actualizado:', perfilActualizado); 
    } else { 
        console.log('No se encontró el perfil'); 
    } 
}

let modificarSaldo = async(tipoDeModificacion, cedula)=>{
    const peticion = await fetch("http://localhost:8080/api/perfiles", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
    })
    const perfiles = await peticion.json(); 
    for(let perfil of perfiles){
        if( perfil.cedula == cedula ){
            cliente = perfil; 
        }
    }
    
    if(tipoDeModificacion=='aumentar'){
        montoStr = document.getElementById("montoMas").value;
    } else {
        montoStr = document.getElementById("montoMenos").value;
    }

    let monto = parseFloat(montoStr);

    if(tipoDeModificacion == 'disminuir'){
        monto = monto*(-1);
    }

    saldoNuevo = monto + cliente.saldo;

    cliente.saldo = saldoNuevo;
    if(monto<0){
        monto = monto*(-1);
    }
    if(window.confirm("¿Quieres " + tipoDeModificacion + " " + monto + "Bs a la cuenta de " + cliente.nombre +"?")){
        actualizarSaldo(cliente);
        refrescarSaldo(saldoNuevo);
        windows.location.href = 'MenuPrincipal';
    }
        
}

function validarMonto(input) {
    const regex = /^\d+(\.\d{0,3})?$/;

    if (!regex.test(input.value) || parseFloat(input.value) <= 0) {
        input.setCustomValidity('Ingrese un número mayor a 0 con hasta tres decimales');
    } else {
        input.setCustomValidity(''); 
    }
}

function esCadenaDeEnterosOFloatPositivos(cadena) { 
    return /^\d+(\.\d+)?$/.test(cadena); 
}

function esCadenaDeEnteros(cadena) { 
    return /^[0-9]+$/.test(cadena); 
}

function refrescarSaldo(nuevoSaldo) { 
    document.getElementById('clienteSaldo').textContent = " " + nuevoSaldo; 
}