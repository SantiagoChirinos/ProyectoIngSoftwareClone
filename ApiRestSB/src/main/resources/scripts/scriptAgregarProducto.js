let boton = document.getElementById("button");
let borrarBoton = document.querySelector('input[value="Borrar Contenido"]');

boton.addEventListener("click", evento => {
        if(window.confirm("¿seguro que quiere continuar?")){
        registrarProducto();
    }
});

let registrarProducto = async () => {
    let campos = {};
    campos.nombre = document.getElementById("nombre").value;
    campos.identificacion = document.getElementById("identificacion").value;
    campos.descripcion = document.getElementById("descripcion").value;
    campos.disp = document.getElementById("disp").value;
    campos.precio = document.getElementById("precio").value;

    // Verificación del campo de nombre
    let nombreInput = document.getElementById("nombre");
    if (campos.nombre.trim() === "") {
        alert("Por favor, ingrese un nombre.");
        nombreInput.style.border = "2px solid red";
        return; // No se registra el producto
    } else {
        nombreInput.style.border = ""; // Restablecer borde si es válido
    }

    // Verificación del campo de identificación
    let idInput = document.getElementById("identificacion");
    if (isNaN(campos.identificacion) || campos.identificacion.trim() === "") {
        alert("Por favor, ingrese un número válido en el campo de identificación.");
        idInput.style.border = "2px solid red";
        return; // No se registra el producto
    } else {
        idInput.style.border = ""; // Restablecer borde si es válido
    }
    
    // Verificación del campo de precio
    let precioInput = document.getElementById("precio");
    if (isNaN(campos.precio) || campos.precio.trim() === "") {
        alert("Por favor, ingrese un número válido en el campo de precio.");
        precioInput.style.border = "2px solid red";
        return; // No se registra el producto
    } else {
        precioInput.style.border = ""; // Restablecer borde si es válido
    }

    try {
        const peticion = await fetch("http://localhost:8080/api/productos",
        {   
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(campos)  
        });

        if (!peticion.ok) {
            if (peticion.status === 400 || peticion.status === 409) {
                alert("Identificación de producto repetida. Por favor, ingrese una identificación única.");
                idInput.style.border = "2px solid red";
                return;
            }
            throw new Error('Error al registrar el producto');
        }

        // Si la petición es exitosa
        alert('Producto registrado exitosamente');
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al registrar el producto. Por favor, inténtelo de nuevo.');
    }
}

borrarBoton.addEventListener("click", evento => {
    borrarContenidoFormulario();
});

let borrarContenidoFormulario = () => {
    document.getElementById("nombre").value = "";
    document.getElementById("identificacion").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("precio").value = "";
    
    // Restablecer los bordes de los campos si fueron marcados en rojo
    document.getElementById("nombre").style.border = "";
    document.getElementById("identificacion").style.border = "";
    document.getElementById("precio").style.border = "";
}
