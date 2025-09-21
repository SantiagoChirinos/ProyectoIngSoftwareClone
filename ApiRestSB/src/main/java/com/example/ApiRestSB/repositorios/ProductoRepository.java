package com.example.ApiRestSB.repositorios;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ApiRestSB.modelos.Producto;

@Repository
public interface ProductoRepository extends JpaRepository<Producto,Long>{
    boolean existsByIdentificacion(String identificacion);
    Optional<Producto> findByIdentificacion(String identificacion);
    
}
