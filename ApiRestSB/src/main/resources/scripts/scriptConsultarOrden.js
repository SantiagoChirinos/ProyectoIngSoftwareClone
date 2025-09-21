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
                    <rd>${orden.productos}</td>
                    <td>${orden.cantidadesProductos}</td>
                    <td>${orden.estado}</td>
                    <td>${orden.fechaCreacion}</td>
                    <td>${orden.fechaEntrega}</td>
                `;
                tableBody.appendChild(fila);
            });
        })
        .catch(error => {
            alert(error.message);
        });
}

function verMas(id) {
    let url = `http://localhost:8080/api/orden/${id}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se encontró la orden.');
            }
            return response.json();
        })
        .then(orden => {
            // Crear una tabla para mostrar los detalles de los productos y cantidades
            let detallesDiv = document.createElement('div');
            detallesDiv.classList.add('detalles');

            let productosTabla = document.createElement('table');
            productosTabla.innerHTML = `
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    ${orden.productos.map((producto, index) => `
                        <tr>
                            <td>${producto}</td>
                            <td>${orden.cantidadesProductos[index]}</td>
                        </tr>
                    `).join('')}
                </tbody>
            `;

            detallesDiv.appendChild(productosTabla);

            // Añadir los detalles en la fila correspondiente de la orden
            let fila = document.querySelector(`#tabla tbody tr td button[onclick="verMas(${id})"]`).parentNode.parentNode;
            fila.appendChild(detallesDiv);
        })
        .catch(error => {
            alert(error.message);
        });
}
