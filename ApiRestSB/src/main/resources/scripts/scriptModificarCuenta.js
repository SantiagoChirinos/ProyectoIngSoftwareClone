window.addEventListener("DOMContentLoaded", (eventt)=>{
    let botonA = document.getElementById("cambiar-nombre");
    let botonB = document.getElementById("cambiar-password");
    let botonC = document.getElementById("cambiar-telefono");
    let botonD = document.getElementById("cambiar-correo");
    let botonCedula = document.getElementById("buscarCliente");
    let cedula = "";
    let containerCambio=document.getElementById("datos-cambio");
    let botonCambio=document.getElementById("confirmar-cambio");
    let accion=-1;
    let botonHacerCambio=document.getElementById("confirmar-cambio");

    botonCedula.addEventListener("click",eventos=> {
        cedula = document.getElementById("cedula").value;
        if(esCadenaDeEnteros(cedula)){
            cedulaExiste(cedula);
        } else {
            let campo = document.getElementById('cedula');   
            campo.value = ''; // Vaciar el campo 
            campo.placeholder = 'Caracteres Invalidos, debe ser por ejemplo: 12345678'; // Mensaje de error 
           
        }    
    })

    botonA.addEventListener("click",eventos=> {    
        botonA.classList.add("active");
        botonB.classList.remove("active");
        botonC.classList.remove("active"); 
        botonD.classList.remove("active");
        botonCambio.classList.remove("hidden");
        containerCambio.innerHTML=`<input type="text" id="nuevo-nombre" placeholder="Ingrese el nuevo nombre"></input>
        <input type="text" id="nuevo-apellido" placeholder="Ingrese el nuevo apellido"></input>
        `
        accion=1;
    })

    botonB.addEventListener("click",eventos=> {    
        botonB.classList.add("active");
        botonA.classList.remove("active");
        botonC.classList.remove("active"); 
        botonD.classList.remove("active");
        botonCambio.classList.remove("hidden");
        containerCambio.innerHTML=`
        <input type="password" id="password1" placeholder="Ingrese la nueva contraseña">
        <input type="password" id="password2" placeholder="Confirme la nueva contraseña">
        <p>La contraseña debe tener al menos 10 caracteres, un número y una mayúscula</p>
        `
        accion=2;
    })

    botonC.addEventListener("click",eventos=> {    
        botonC.classList.add("active");
        botonB.classList.remove("active");
        botonA.classList.remove("active"); 
        botonD.classList.remove("active");
        botonCambio.classList.remove("hidden");
        containerCambio.innerHTML=`<input type="tel" id="telefono" name="telefono" placeholder="Ingrese el nuevo teléfono. Ejemplo: 0414-000-0000" pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}">`
        accion=3;
    })

    botonD.addEventListener("click",eventos=> {    
        botonD.classList.add("active");
        botonB.classList.remove("active");
        botonC.classList.remove("active"); 
        botonA.classList.remove("active");
        botonCambio.classList.remove("hidden");
        containerCambio.innerHTML=`<input type="email" id="email" name="email" placeholder="Ingrese el nuevo correo. Ejemplo: Ejemplo@ejemplo.com">`
        accion=4;
    })

    botonHacerCambio.addEventListener("click", evento=>{
        if(window.confirm("¿Seguro que desea continuar?")){
            modificarPerfil(accion,cedula);
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
     let cliente;
    for(let perfil of perfiles){
        if( (perfil.cedula == cedula) && (perfil.password == document.getElementById("password").value) ){
            clienteEncontrado=true;
            cliente = perfil; 
        }
    }
    if(clienteEncontrado){
        document.getElementById("info").classList.remove("hidden");
        document.getElementById("modificiones").classList.remove("hidden");
        const infoHtml = ` 
        <h3>Información del Cliente</h3> 
        <p><strong>Nombre:</strong> ${cliente.nombre}</p> 
        <p><strong>Apellido:</strong> ${cliente.apellido}</p> 
        <p><strong>Correo:</strong> ${cliente.correo}</p> 
        <p><strong>Telefono:</strong> ${cliente.telefono}</p> 
        `; 

        const infoDiv = document.getElementById("infoDelCliente");
        infoDiv.innerHTML = infoHtml; 
    } else {
        alert('Cédula o contraseña inválida');
    }

};

async function actualizarDato(perfil) { 
    const response = await fetch("http://localhost:8080/api/actualizarCuentaCliente", { 
        method: 'PUT', 
        headers: { 
            'Content-Type': 
            'application/json' 
        }, 
        body: JSON.stringify(perfil) }); 

    if (response.ok) { 
        alert("Perfil actualizado con éxito"); 
    } else { 
        console.log('Error al cambiar el perfil'); 
    } 
}

async function actualizarPassword(perfil) { 
    const response = await fetch("http://localhost:8080/api/actualizarCuentaCliente", { 
        method: 'PUT', 
        headers: { 
            'Content-Type': 
            'application/json' 
        }, 
        body: JSON.stringify(perfil) }); 
        const perfilActualizado= await response.json()

    if (perfilActualizado.password!="-1") { 
        alert("La contraseña se ha actualizado con éxito") 
    } else { 
        alert("Contraseña inválida")
    } 
}

let modificarPerfil = async(accion, cedula)=>{
    const peticion = await fetch("http://localhost:8080/api/perfiles", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
    })
    let cliente;
    const perfiles = await peticion.json(); 
    for(let perfil of perfiles){
        if( perfil.cedula == cedula ){
            cliente = perfil; 
        }
    }

    switch (accion) {
        case -1:
            console.log("Error")
            break;
        case 1:
            cliente.nombre=document.getElementById("nuevo-nombre").value;
            cliente.apellido=document.getElementById("nuevo-apellido").value;
            actualizarDato(cliente);
            break;
        case 2:
            if(document.getElementById("password1").innerText==document.getElementById("password2").innerText){
                cliente.password=document.getElementById("password1").value;
                actualizarPassword(cliente);
            }
            else{
                alert("Las contraseñas no son iguales");
            }
            break;
        case 3:
            cliente.telefono=document.getElementById("telefono").value;
            actualizarDato(cliente);
            break;
        case 4:
            cliente.correo=document.getElementById("email").value;
            actualizarDato(cliente);
            break;
    }
    const infoHtml = ` 
        <h3>Información del Cliente</h3> 
        <p><strong>Nombre:</strong> ${cliente.nombre}</p> 
        <p><strong>Apellido:</strong> ${cliente.apellido}</p> 
        <p><strong>Correo:</strong> ${cliente.correo}</p> 
        <p><strong>Telefono:</strong> ${cliente.telefono}</p> 
        `; 
    
    const infoDiv = document.getElementById("infoDelCliente");
    infoDiv.innerHTML = infoHtml; 
        
}

function esCadenaDeEnterosOFloatPositivos(cadena) { 
    return /^\d+(\.\d+)?$/.test(cadena); 
}

function esCadenaDeEnteros(cadena) { 
    return /^[0-9]+$/.test(cadena); 
}
