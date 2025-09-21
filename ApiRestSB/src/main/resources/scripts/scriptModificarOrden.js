let ordenSeleccionadaId = null; // Variable para almacenar el ID de la orden seleccionada

function buscarOrden() {
    let searchInput = document.getElementById("searchInput");
    let cedulaCliente = searchInput.value.trim();

    // Verificación del campo de búsqueda
    if (cedulaCliente === "") {
        alert("Por favor, ingrese una cédula para buscar.");
        searchInput.style.border = "2px solid red";
        return;
    } else if (!/^\d+$/.test(cedulaCliente)) {
        alert("La cédula debe contener solo números.");
        searchInput.style.border = "2px solid red";
        return;
    } else {
        searchInput.style.border = ""; // Restablecer borde si es válido
    }

    let url = `http://localhost:8080/api/orden/${cedulaCliente}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se encontraron órdenes para esta cédula.');
            }
            return response.json();
        })
        .then(ordenes => {
            if (ordenes.length === 0) {
                alert('No se encontraron órdenes para esta cédula.');
                return;
            }

            let tableBody = document.querySelector('#tabla tbody');
            tableBody.innerHTML = ""; // Limpiar la tabla antes de agregar nuevas filas

            ordenes.forEach(orden => {
                let fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${orden.cedulaCliente}</td>
                    <td>${orden.productos.join(', ')}</td>
                    <td>${orden.cantidadesProductos.join(', ')}</td>
                    <td>${orden.estado}</td>
                    <td>${orden.fechaCreacion}</td>
                    <td>${orden.fechaEntrega}</td>
                `;
                fila.onclick = function() {
                    seleccionarFila(fila, orden); // Al hacer clic, seleccionar la fila y guardar la orden
                };
                tableBody.appendChild(fila);
            });
        })
        .catch(error => {
            alert(error.message);
        });
}

function seleccionarFila(fila, orden) {
    // Resaltar la fila seleccionada
    const filas = document.querySelectorAll('#tabla tbody tr');
    filas.forEach(f => f.classList.remove('selected')); // Limpiar selección anterior
    fila.classList.add('selected'); // Agregar clase de selección a la fila actual
    ordenSeleccionadaId = orden.id; // Guardar el ID de la orden seleccionada

    // Llenar los campos del formulario con los datos de la orden seleccionada // No se puede modificar
    document.getElementById("productos").value = orden.productos.join(', ');
    document.getElementById("cantidadesProductos").value = orden.cantidadesProductos.join(', ');
    document.getElementById("disp").value = orden.estado;
    document.getElementById("fechaCreacion").value = orden.fechaCreacion;
    document.getElementById("fechaEntrega").value = orden.fechaEntrega;
}

function actualizarProducto() {
    // Verifica si se ha seleccionado una orden
    if (ordenSeleccionadaId === null) {
        alert("Por favor, seleccione una orden para actualizar.");
        return;
    }

    // Obtiene los nuevos datos del formulario
    const productos = document.getElementById("productos").value.split(',').map(p => p.trim());
    const cantidadesProductos = document.getElementById("cantidadesProductos").value.split(',').map(c => c.trim());
    const nuevoEstado = document.getElementById("disp").value;
    const fechaCreacion = document.getElementById("fechaCreacion").value;
    const fechaEntrega = document.getElementById("fechaEntrega").value;

    // Construye la URL para la solicitud PUT
    let url = `http://localhost:8080/api/orden/${ordenSeleccionadaId}`; // Asegúrate de que esta URL sea correcta para tu API

    // Crea el objeto de la orden a actualizar
    const ordenActualizada = {
        id: ordenSeleccionadaId, // Mantener el ID para la actualización
        productos: productos, // Actualiza los productos
        cantidadesProductos: cantidadesProductos, // Actualiza las cantidades
        estado: nuevoEstado, // Actualiza el estado
        fechaCreacion: fechaCreacion, // Actualiza la fecha de creación
        fechaEntrega: fechaEntrega // Actualiza la fecha de entrega
    };

    // Realiza la solicitud PUT
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ordenActualizada)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al actualizar la orden.');
        }
        alert('Orden actualizada con éxito.');
        buscarOrden(); // Vuelve a buscar las órdenes para actualizar la tabla
    })
    .catch(error => {
        alert(error.message);
    });
}