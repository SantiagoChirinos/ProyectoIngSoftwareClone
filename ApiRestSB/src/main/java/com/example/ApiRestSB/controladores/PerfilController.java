package com.example.ApiRestSB.controladores;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.ApiRestSB.modelos.Perfil;
import com.example.ApiRestSB.repositorios.PerfilRepository;


@CrossOrigin("http://127.0.0.1:5500")
@RestController
public class PerfilController {
        PerfilRepository repositorio;

    public PerfilController(PerfilRepository repositorio) {
        this.repositorio = repositorio;
    }

    //retorna true si la cédula ha sido registrada anteriormente, retorna false en cualquier otro caso
    public boolean verificarCedulaRegistrada(String cedula){
        List<Perfil> perfiles=repositorio.findAll();
            for (int i = 0; i < perfiles.size(); i++) {
                if(Objects.equals(perfiles.get(i).getCedula(), cedula)){
                    return true;
                }
            }
        return false;
    }

    public long buscarIdCedula(String cedula){
        List<Perfil> perfiles=repositorio.findAll();
            for (int i = 0; i < perfiles.size(); i++) {
                if(Objects.equals(perfiles.get(i).getCedula(), cedula)){
                    return perfiles.get(i).getId();
                }
            }
        return -1;
    }

    @CrossOrigin("http://127.0.0.1:5500")
    @GetMapping("/api/crearPerfil")
    public void crearPerfil() {
        Perfil juego1 = new Perfil("juan","perez","10/10/10","a@a","100","20012",0,0,"A1234567890");
        Perfil juego2 = new Perfil("juan","perez","10/10/10","a@a","101","20012",0,1,"A1234567890");
        Perfil juego3 = new Perfil("juan","perez","10/10/10","a@a","102","20012",0,2,"A1234567890");

        repositorio.save(juego1);
        repositorio.save(juego2);
        repositorio.save(juego3);
    }

    @GetMapping("/")
    public String iniciar() {
        return "/InicioSesion.html";
    }

    @CrossOrigin("http://127.0.0.1:5500")
    @GetMapping("/menuPrincipal")
    public String menu() {
        return "menuPrincipal.html";
    }
    
@CrossOrigin("http://127.0.0.1:5500")
@GetMapping("/api/perfiles")
    public List<Perfil> obtenerPerfiles() {
        return repositorio.findAll();
    }

    @CrossOrigin("http://127.0.0.1:5500")
@GetMapping("/api/perfil/{id}")
    public ResponseEntity<Perfil> obtenerPerfilPorId(@PathVariable long id) {
        Optional<Perfil> opt = repositorio.findById(id);

            if (opt.isEmpty()) {
                return ResponseEntity.badRequest().build();
    }else {
        return ResponseEntity.ok(opt.get());
    }
}


@CrossOrigin("http://127.0.0.1:5500")
@PostMapping("/api/crearCuentaCliente")
public ResponseEntity<Perfil> guardarPerfil(@RequestBody Perfil perfil) {
    //en caso de encontrar algun error, error se volverá true y no guardará el perfil
    PerfilController control=new PerfilController((repositorio));
    boolean error=false;
    final String mensajeError="bad-request";
    if(!perfil.validarEdad(perfil.getNacimiento())){
        perfil.setNacimiento(mensajeError);
        error=true;
    }
    if(!perfil.verificarPassword(perfil.getPassword())){
        perfil.setPassword(mensajeError);
        error=true;
    }
    if(control.verificarCedulaRegistrada(perfil.getCedula())){
        perfil.setCedula(mensajeError);
        error=true;
    }
    if (perfil.getId()!=null) {
        return ResponseEntity.badRequest().build();
    }
    if(!error){
        repositorio.save(perfil);
    }
    
    return ResponseEntity.ok(perfil);
}

@CrossOrigin("http://127.0.0.1:5500")
@PutMapping("/api/actualizarCuentaCliente")
public ResponseEntity<Perfil> actualizarPerfil(@RequestBody Perfil perfil){
    long idPerfil= buscarIdCedula(perfil.getCedula());
    if(!perfil.verificarPassword(perfil.getPassword())){
        perfil.setPassword("-1");
        return ResponseEntity.ok(perfil);
    }
    if((perfil.getId()==null) || (idPerfil==-1)){
        return ResponseEntity.badRequest().build();
    }
    repositorio.save(perfil);
    return ResponseEntity.ok(perfil);
}

@CrossOrigin("http://127.0.0.1:5500")
@DeleteMapping("/api/borrarCuenta/{cedula}")
public ResponseEntity<Void> borrarPerfilPorCedula(@PathVariable String cedula) {
    // Buscar el perfil por cédula
    Perfil perfil = repositorio.findByCedula(cedula);
    if (perfil == null) {
        return ResponseEntity.notFound().build(); // 404 Not Found
    }

    // Borrar el perfil
    repositorio.delete(perfil);
    return ResponseEntity.noContent().build(); // 204 No Content
}

@CrossOrigin("http://127.0.0.1:5500")
@PutMapping("/api/juegos")
public ResponseEntity<Perfil> actualizarJuego(@RequestBody Perfil perfil) {
    if (perfil.getId()==null || !repositorio.existsById(perfil.getId())) {
        return ResponseEntity.badRequest().build();
    }
    
    repositorio.save(perfil);
    return ResponseEntity.ok(perfil);
}

@CrossOrigin("http://127.0.0.1:5500")
@PutMapping("/api/actualizaSaldo")
public ResponseEntity<Perfil> actualizarSaldo(@RequestBody Perfil perfil) {
    if (perfil.getId()==null || !repositorio.existsById(perfil.getId())) {
        return ResponseEntity.badRequest().build();
    }
    repositorio.save(perfil);
    return ResponseEntity.ok(perfil);
}

@CrossOrigin("http://127.0.0.1:5500")
@DeleteMapping("/api/juego/{id}")
public ResponseEntity<Perfil> eliminarJuego(@PathVariable Long id) {
    if (id==null || !repositorio.existsById(id)) {

        return ResponseEntity.badRequest().build();
    }
    repositorio.deleteById(id);
    return ResponseEntity.noContent().build();
}


}
