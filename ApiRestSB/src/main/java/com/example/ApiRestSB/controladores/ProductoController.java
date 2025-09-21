package com.example.ApiRestSB.controladores;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.ApiRestSB.modelos.Producto;
import com.example.ApiRestSB.repositorios.ProductoRepository;

@CrossOrigin("http://127.0.0.1:5500")
@RestController
public class ProductoController {
    ProductoRepository repositorio;

    public ProductoController(ProductoRepository repositorio) {
        this.repositorio = repositorio;
    }

    public long obtenerIDporIdentificacion(String identificacion){
        List<Producto> productos= repositorio.findAll();
        String identificacionCorregida=identificacion.substring(1, (identificacion.length()-1));
        for(int i=0;i<productos.size();i++){
            if(Objects.equals(identificacionCorregida, productos.get(i).getIdentificacion())){
                return productos.get(i).getId();
            }
        }
        return -1;
    }

    @CrossOrigin("http://127.0.0.1:5500")
    @GetMapping("/api/crearProducto")
    public void crearProducto() {
        Producto producto1 = new Producto("1234", "Malta", "Malta Regional fría", "Disponible", (float) 5.4);
        Producto producto2 = new Producto("1", "Galletas", "Galletas de chocolate crujientes", "Disponible", (float) 2.5);
        Producto producto3 = new Producto("2", "Refresco", "Refresco de cola, refrescante y delicioso", "No Disponible", (float) 1.5);
        Producto producto4 = new Producto("3", "Agua Mineral", "Agua mineral pura y fresca", "Disponible", (float) 1.0);
        Producto producto5 = new Producto("4", "Chips", "Chips de papa, perfectos para picar", "Disponible", (float) 3.0);
        Producto producto6 = new Producto("5", "Sopa Instantánea", "Sopa instantánea de pollo, lista en minutos", "Disponible", (float) 1.2);
        Producto producto7 = new Producto("6", "Pizza Congelada", "Pizza congelada de pepperoni, lista para hornear", "No Disponible", (float) 8.0);
        Producto producto8 = new Producto("7", "Helado", "Helado de vainilla, cremoso y delicioso", "Disponible", (float) 4.5);
        Producto producto9 = new Producto("8", "Frutos Secos", "Mezcla de frutos secos, saludable y nutritiva", "Disponible", (float) 6.0);
        Producto producto10 = new Producto("9", "Barra de Granola", "Barra de granola con miel y nueces", "Disponible", (float) 2.0);
       
        repositorio.save(producto1);
        repositorio.save(producto2);
        repositorio.save(producto3);
        repositorio.save(producto4);
        repositorio.save(producto5);
        repositorio.save(producto6);
        repositorio.save(producto7);
        repositorio.save(producto8);
        repositorio.save(producto9);
        repositorio.save(producto10);

    }

@CrossOrigin("http://127.0.0.1:5500")
@GetMapping("/api/productos")
    public List<Producto> obtenerProductos() {
        return repositorio.findAll();
    }

    @CrossOrigin("http://127.0.0.1:5500")
    @GetMapping("/api/producto/{identificacion}")
    public ResponseEntity<Producto> obtenerProductoPorIdentificacion(@PathVariable String identificacion) {
        Optional<Producto> opt = repositorio.findByIdentificacion(identificacion);
    
        if (opt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        } else {
            return ResponseEntity.ok(opt.get());
        }
    }
    


@CrossOrigin("http://127.0.0.1:5500")
@PostMapping("/api/productos")
public ResponseEntity<Producto> guardarProducto(@RequestBody Producto producto) {
    // Verificación de identificacion del producto
    if (repositorio.existsByIdentificacion(producto.getIdentificacion())) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(null); // Identificación ya registrada
    }

    // Verificación de id del producto
    if (producto.getId() != null) {
        return ResponseEntity.badRequest().build();
    }
    
    repositorio.save(producto);
    return ResponseEntity.ok(producto);
}


@CrossOrigin("http://127.0.0.1:5500")
@PutMapping("/api/producto/{identificacion}")
public ResponseEntity<Producto> actualizarProducto(@PathVariable String identificacion, @RequestBody Producto producto) {
    Optional<Producto> optProducto = repositorio.findByIdentificacion(identificacion);

    if (optProducto.isEmpty()) {
        return ResponseEntity.notFound().build();
    }

    Producto productoExistente = optProducto.get();
    productoExistente.setNombre(producto.getNombre());
    productoExistente.setDescripcion(producto.getDescripcion());
    productoExistente.setDisp(producto.getDisp());
    productoExistente.setPrecio(producto.getPrecio());

    repositorio.save(productoExistente);
    return ResponseEntity.ok(productoExistente);
}


@CrossOrigin("http://127.0.0.1:5500")
@DeleteMapping("/api/eliminarProducto")
public ResponseEntity<Producto> eliminarProducto(@RequestBody String identificacion) {
    long id=obtenerIDporIdentificacion(identificacion);
    if (id==-1) {
        return ResponseEntity.badRequest().build();
    }
    repositorio.deleteById(id);
    return ResponseEntity.noContent().build();
}

}
