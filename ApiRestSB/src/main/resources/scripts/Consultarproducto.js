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
            let tableBody = document.querySelector('#tabla tbody');
            tableBody.innerHTML = `
                <tr>
                    <td>${producto.id}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.descripcion}</td>
                    <td>${producto.disp}</td>
                    <td>${producto.precio}</td>
                </tr>
            `;
        })
        .catch(error => {
            alert(error.message);
        });
}
