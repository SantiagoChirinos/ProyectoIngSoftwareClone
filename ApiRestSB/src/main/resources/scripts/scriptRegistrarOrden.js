let botonRegistrar = document.getElementById("button");
let botonBorrar = document.querySelector('input[value="Borrar"]');

botonRegistrar.addEventListener("click", evento => {
    evento.preventDefault();
    if(window.confirm("¿seguro que quiere continuar?")) // Evita el envío del formulario
    registrarOrden();
});

botonBorrar.addEventListener("click", evento => {
    borrarContenidoFormulario();
});

let registrarOrden = async () => {
    let campos = {};
    campos.cedulaCliente = document.getElementById("cedulaCliente").value;
    campos.productos = document.getElementById("productos").value.split(',');
    campos.cantidadesProductos = document.getElementById("cantidadesProductos").value.split(',').map(Number);
    campos.estado = document.getElementById("disp").value;
    campos.fechaCreacion = document.getElementById("fechaCreacion").value;
    campos.fechaEntrega = document.getElementById("fechaEntrega").value;

    // Verificación de campos vacíos
    if (campos.cedulaCliente.trim() === "" || campos.productos.length === 0 || campos.cantidadesProductos.length === 0 || campos.fechaCreacion.trim() === "" || campos.fechaEntrega.trim() === "") {
        alert("Por favor, complete todos los campos correctamente antes de registrar.");
        return; // No se registra la orden
    }

    // Verificación de que la cédula solo contenga números
    if (!/^\d+$/.test(campos.cedulaCliente)) {
        alert("La cédula del cliente debe contener solo números.");
        return;
    }

    // Verificación de que las cantidades de productos solo contengan números
    if (campos.cantidadesProductos.some(isNaN)) {
        alert("Las cantidades de productos deben contener solo números.");
        return;
    }

    // Verificación de fechas
    let fechaCreacion = new Date(campos.fechaCreacion);
    let fechaEntrega = new Date(campos.fechaEntrega);
    if (fechaCreacion >= fechaEntrega) {
        alert("La fecha de creación debe ser menor que la fecha de entrega.");
        return;
    }

    try {
        const peticion = await fetch("http://localhost:8080/api/orden", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(campos)
        });
        const orden= await peticion.json()
        if (!peticion.ok) {
            throw new Error('Error al registrar la orden. Verifique los datos ingresados.');
        }else{
            if(orden.cedulaCliente==-1){
                alert("No se ha encontrado al cliente");
            }
            else{
                // Si la petición es exitosa
                alert('Orden registrada exitosamente');
            }
        }

    } catch (error) {
        alert(error.message);
    }
}



let borrarContenidoFormulario = () => {
    document.getElementById("cedulaCliente").value = "";
    document.getElementById("productos").value = "";
    document.getElementById("cantidadesProductos").value = "";
    document.getElementById("disp").value = "Abierta";
    document.getElementById("fechaCreacion").value = "";
    document.getElementById("fechaEntrega").value = "";
}
