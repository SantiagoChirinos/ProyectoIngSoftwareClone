package com.example.ApiRestSB.modelos;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class Producto {

    
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;

    String nombre;
    String identificacion;
    String descripcion;
    String disp;
    float precio;

    public Producto(String identificacion,String nombre,String descripcion,String  disp, float precio){
        this.nombre=nombre;
        this.identificacion=identificacion;
        this.descripcion=descripcion;
        this.disp=disp;
        this.precio=precio;
        }


    public Producto(){
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdentificacion() {
        return identificacion;
    }

    public void setIdentificacion(String identificacion) {
        this.identificacion = identificacion;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDisp() {
        return disp;
    }

    public void setDisp(String disp) {
        this.disp = disp;
    }

    public float getPrecio() {
        return precio;
    }

    public void setPrecio(float precio) {
        this.precio = precio;
    }

    
}
