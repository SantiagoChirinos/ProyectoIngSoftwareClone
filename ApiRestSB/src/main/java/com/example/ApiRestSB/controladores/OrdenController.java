package com.example.ApiRestSB.controladores;

import java.util.List;
import java.util.Objects;

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

import com.example.ApiRestSB.modelos.Orden;
import com.example.ApiRestSB.modelos.Perfil;
import com.example.ApiRestSB.repositorios.OrdenRepository;
import com.example.ApiRestSB.repositorios.PerfilRepository;

@CrossOrigin("http://127.0.0.1:5500")
@RestController
public class OrdenController {
    OrdenRepository repositorio;
    PerfilRepository repoPerfil;

    public OrdenController(OrdenRepository repositorio, PerfilRepository repoPerfil) {
        this.repositorio = repositorio;
        this.repoPerfil = repoPerfil;
    }

    // Retorna true si la cédula ha sido registrada anteriormente, retorna false en cualquier otro caso
    public boolean verificarCedulaRegistrada(String cedula) {
        List<Perfil> perfiles = repoPerfil.findAll();
        for (Perfil perfil : perfiles) {
            if (Objects.equals(perfil.getCedula(), cedula)) {
                return true;
            }
        }
        return false;
    }

    @CrossOrigin("http://127.0.0.1:5500")
    @GetMapping("/api/crearOrden")
    public void crearOrden() {
        String[] productos = {"producto1", "producto2"};
        int[] cantidadesProductos = {10, 20};
        Orden orden1 = new Orden(31555, productos, cantidadesProductos, "Activo", "10/10/10", "11/10/10");
        Orden orden2 = new Orden(31555, productos, cantidadesProductos, "Cerrada", "10/10/10", "11/10/10");
        Orden orden3 = new Orden(31555, productos, cantidadesProductos, "Activo", "10/10/10", "11/10/10");

        repositorio.save(orden1);
        repositorio.save(orden2);
        repositorio.save(orden3);
    }

    @CrossOrigin("http://127.0.0.1:5500")
    @GetMapping("/api/ordenes")
    public List<Orden> obtenerPerfiles() {
        return repositorio.findAll();
    }

    @CrossOrigin("http://127.0.0.1:5500")
    @GetMapping("/api/orden/{cedulaCliente}")
    public ResponseEntity<List<Orden>> obtenerOrdenesPorCedulaCliente(@PathVariable int cedulaCliente) {
        List<Orden> ordenes = repositorio.findByCedulaCliente(cedulaCliente);
        if (ordenes.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(ordenes);
    }
    

    @CrossOrigin("http://127.0.0.1:5500")
    @PostMapping("/api/orden")
    public ResponseEntity<Orden> guardarOrden(@RequestBody Orden orden) {
        Orden ordenRespaldo = new Orden();
        if (orden.getId() != ordenRespaldo.getId()) {
            return ResponseEntity.badRequest().build();
        }
        if (!this.verificarCedulaRegistrada(String.valueOf(orden.getCedulaCliente()))) {
            orden.setCedulaCliente(-1);
        }
        if (orden.getCedulaCliente() != -1) {
            repositorio.save(orden);
        }
        return ResponseEntity.ok(orden);
    }

    @CrossOrigin("http://127.0.0.1:5500")
    @PutMapping("/api/orden")
    public ResponseEntity<Orden> actualizarOrden(@RequestBody Orden orden) {
        Orden ordenRespaldo = new Orden();
        if (orden.getId() == ordenRespaldo.getId() || !repositorio.existsById(orden.getId())) {
            return ResponseEntity.badRequest().build();
        }

        repositorio.save(orden);
        return ResponseEntity.ok(orden);
    }
    

    @CrossOrigin("http://127.0.0.1:5500")
    @DeleteMapping("/api/eliminarorden/{id}")
    public ResponseEntity<Void> borrarOrden(@PathVariable Long id) {
        if (id == null || !repositorio.existsById(id)) {
            return ResponseEntity.badRequest().build();
        }

        repositorio.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    
    @CrossOrigin("http://127.0.0.1:5500")
@PutMapping("/api/ModEstadoOrden/{id}")
public ResponseEntity<Orden> actualizarEstOrden(@PathVariable Long id, @RequestBody Orden ordenActualizada) {
    // Verifica si la orden existe
    if (!repositorio.existsById(id)) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Retorna 404 si no se encuentra la orden
    }

    // Obtiene la orden existente
    Orden ordenExistente = repositorio.findById(id).orElse(null);
    if (ordenExistente != null) {
        // Actualiza solo el estado de la orden
        ordenExistente.setEstado(ordenActualizada.getEstado());
        // Guarda la orden actualizada
        repositorio.save(ordenExistente);
        return ResponseEntity.ok(ordenExistente); // Retorna la orden actualizada
    }

    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Retorna 500 si hay un error inesperado
}
@CrossOrigin("http://127.0.0.1:5500")
@PutMapping("/api/orden/{id}")
public ResponseEntity<Orden> actualizarOrden(@PathVariable Long id, @RequestBody Orden ordenActualizada) {
    // Verifica si la orden existe
    if (!repositorio.existsById(id)) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Retorna 404 si no se encuentra la orden
    }

    // Obtiene la orden existente
    Orden ordenExistente = repositorio.findById(id).orElse(null);
    if (ordenExistente != null) {
        // Actualiza los campos de la orden existente
        ordenExistente.setProductos(ordenActualizada.getProductos());
        ordenExistente.setCantidadesProductos(ordenActualizada.getCantidadesProductos());
        ordenExistente.setEstado(ordenActualizada.getEstado());
        ordenExistente.setFechaCreacion(ordenActualizada.getFechaCreacion());
        ordenExistente.setFechaEntrega(ordenActualizada.getFechaEntrega());

        // Guarda la orden actualizada
        repositorio.save(ordenExistente);
        return ResponseEntity.ok(ordenExistente); // Retorna la orden actualizada
    }

    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Retorna 500 si hay un error inesperado
}
}