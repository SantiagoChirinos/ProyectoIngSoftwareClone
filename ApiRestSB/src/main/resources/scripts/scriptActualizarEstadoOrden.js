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
                    <td>${orden.productos.join(', ')}</td> <!-- Asegúrate de que productos sea un array -->
                    <td>${orden.cantidadesProductos.join(', ')}</td> <!-- Asegúrate de que cantidadesProductos sea un array -->
                    <td>${orden.estado}</td>
                    <td>${orden.fechaCreacion}</td>
                    <td>${orden.fechaEntrega}</td>
                `;
                fila.onclick = function() {
                    seleccionarFila(fila, orden.id); // Al hacer clic, seleccionar la fila y guardar el ID
                };
                tableBody.appendChild(fila);
            });
        })
        .catch(error => {
            alert(error.message);
        });
}

function seleccionarFila(fila, id) {
    // Resaltar la fila seleccionada
    const filas = document.querySelectorAll('#tabla tbody tr');
    filas.forEach(f => f.classList.remove('selected')); // Limpiar selección anterior
    fila.classList.add('selected'); // Agregar clase de selección a la fila actual
    ordenSeleccionadaId = id; // Guardar el ID de la orden seleccionada
}

function actualizarProducto() {
    // Verifica si se ha seleccionado una orden
    if (ordenSeleccionadaId === null) {
        alert("Por favor, seleccione una orden para actualizar.");
        return;
    }

    // Obtiene el nuevo estado del select
    const nuevoEstado = document.getElementById("disp").value;

    // Construye la URL para la solicitud PUT
    let url = `http://localhost:8080/api/ModEstadoOrden/${ordenSeleccionadaId}`; // Asegúrate de que esta URL sea correcta para tu API

    // Crea el objeto de la orden a actualizar
    const ordenActualizada = {
        estado: nuevoEstado // Solo actualiza el estado
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