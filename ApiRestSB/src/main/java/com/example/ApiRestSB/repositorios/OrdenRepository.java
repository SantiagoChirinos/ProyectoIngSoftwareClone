package com.example.ApiRestSB.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ApiRestSB.modelos.Orden;

@Repository
public interface OrdenRepository extends JpaRepository<Orden, Long> {
    List<Orden> findByCedulaCliente(int cedulaCliente);
}

