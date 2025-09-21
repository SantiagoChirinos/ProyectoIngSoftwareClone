var SelectedRowID=null
window.onload = function() {
    listarProductos();
    let botonBorrar = document.getElementById("delete-button");
    botonBorrar.addEventListener("click",eventos=> {
        if(window.confirm("¿Seguro que desea borrar este producto?")){
            borrarProducto();
        }
        
    })
};

//LISTAR PRODUCTOS
let listarProductos = async()=>{

    const peticion = await fetch("http://localhost:8080/api/productos",
    {   method: 'GET',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        }, 
    });

    const peliculas = await peticion.json()

    let contenidoTabla ="";
    let id=0;
    for (const pelicula of peliculas) {

        let contenidoFila = `<tr id="${pelicula.identificacion}" class="hoverPossible">
        <td>${pelicula.identificacion}</td>
        <td>${pelicula.nombre}</td>
        <td>${pelicula.descripcion}</td>
        <td>${pelicula.disp}</td>
        <td>${pelicula.precio}</td>
        </tr>`
        id++;
        
        contenidoTabla += contenidoFila;
    }
    document.querySelector("#tabla tbody").outerHTML = contenidoTabla;
    
    
    // Call the function to enable row selection
    enableRowSelection();
    

}

function enableRowSelection() {
    const rows = document.querySelectorAll("#tabla tbody tr");

    rows.forEach((row) => {
        row.addEventListener("click", function() {
            // Remove "selected" class from all rows
            rows.forEach((r) => r.classList.remove("selected"));
            
            // Add "selected" class to the clicked row
            this.classList.add("selected");
            SelectedRowID=this.id;
        });
    });
}

async function borrarProducto(){
    if(SelectedRowID!=null){
        const response = await fetch("http://localhost:8080/api/eliminarProducto", { 
            method: 'DELETE', 
            headers: { 
                'Content-Type': 
                'application/json' 
            }, 
            body: JSON.stringify(SelectedRowID) });
    }
    listarProductos();
}