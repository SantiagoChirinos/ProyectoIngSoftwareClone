package com.example.ApiRestSB.modelos;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Orden {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    int cedulaCliente;
    String[] productos;
    int[] cantidadesProductos;
    String estado;
    String fechaCreacion;
    String fechaEntrega;

    public Orden(int cedulaCliente, String[] productos, int[] cantidades, String estado, String fechaCreacion,
            String fechaEntrega) {
        super();
        this.cedulaCliente = cedulaCliente;
        this.productos = productos;
        this.cantidadesProductos = cantidades;
        this.estado = estado;
        this.fechaCreacion = fechaCreacion;
        this.fechaEntrega = fechaEntrega;
    }

    public Orden() {

    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getCedulaCliente() {
        return cedulaCliente;
    }

    public void setCedulaCliente(int cedulaCliente) {
        this.cedulaCliente = cedulaCliente;
    }

    public String[] getProductos() {
        return productos;
    }

    public void setProductos(String[] productos) {
        this.productos = productos;
    }

    public int[] getCantidadesProductos() {
        return cantidadesProductos;
    }

    public void setCantidadesProductos(int[] cantidadesProductos) {
        this.cantidadesProductos = cantidadesProductos;
    }

    public String getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(String fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public String getFechaEntrega() {
        return fechaEntrega;
    }

    public void setFechaEntrega(String fechaEntrega) {
        this.fechaEntrega = fechaEntrega;
    }

}
