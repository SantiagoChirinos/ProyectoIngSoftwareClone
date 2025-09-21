package com.example.ApiRestSB.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ApiRestSB.modelos.Perfil;

@Repository
public interface PerfilRepository extends JpaRepository<Perfil,Long> {

    Perfil findByCedula(String cedula);
}
