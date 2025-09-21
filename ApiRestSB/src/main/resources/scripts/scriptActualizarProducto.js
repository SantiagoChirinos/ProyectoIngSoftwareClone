let boton = document.getElementById("button");


function buscarProducto() {
    let identificacion = document.getElementById("searchInput").value;
    if (identificacion.trim() === "") { alert("Por favor, ingrese un ID de producto para buscar."); searchInput.style.border = "2px solid red"; return; } else { searchInput.style.border = ""; // Restablecer borde si es válido }
    }
        let url = `http://localhost:8080/api/producto/${identificacion}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Producto no encontrado');
            }
            return response.json();
        })
        .then(producto => {
            // Insertar los datos del producto en los campos del formulario
            document.getElementById("nombre").value = producto.nombre;
            document.getElementById("identificacion").value = producto.identificacion;
            document.getElementById("descripcion").value = producto.descripcion;
            document.getElementById("disp").value = producto.disponibilidad ? 'No Disponible' : 'Disponible';
            document.getElementById("precio").value = producto.precio;
        })
        .catch(error => {
            alert(error.message);
        });
}
function actualizarProducto() {
    let campos = {};
    campos.nombre = document.getElementById("nombre").value;
    campos.identificacion = document.getElementById("identificacion").value;
    campos.descripcion = document.getElementById("descripcion").value;
    campos.disp = document.getElementById("disp").value;
    campos.precio = document.getElementById("precio").value;

    // Verificación de campos
    if (campos.nombre.trim() === "" || isNaN(campos.identificacion) || campos.identificacion.trim() === "" || isNaN(campos.precio) || campos.precio.trim() === "") {
        alert("Por favor, complete todos los campos correctamente antes de actualizar.");
        return; // No se actualiza el producto
    }

    let url = `http://localhost:8080/api/producto/${campos.identificacion}`;
    
    fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(campos)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al actualizar el producto. Asegúrese de que la identificación es correcta.');
        }
        return response.json();
    })
    .then(producto => {
        alert('Producto actualizado exitosamente');
        // Aquí puedes actualizar la interfaz de usuario si es necesario
    })
    .catch(error => {
        alert(error.message);
    });
}


