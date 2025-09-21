package com.example.ApiRestSB.modelos;


import java.time.LocalDate;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Perfil {


    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	
    String nombre;
    String apellido;
    String nacimiento;
    String correo;
    String cedula;
    String telefono;
    float saldo;
    int privilegio;
    String password;

    public Perfil(String nombre, String apellido,String nacimiento,String correo,String cedula,String telefono,float saldo, int privilegio,String password) {
        super();
        this.nombre = nombre;
        this.apellido = apellido;
        this.nacimiento = nacimiento;
        this.correo=correo;
        this.cedula=cedula;
        this.telefono=telefono;
        this.saldo=saldo;
        this.privilegio=privilegio;
        this.password=password;
    }

    public Perfil() {
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getNacimiento() {
        return nacimiento;
    }

    public void setNacimiento(String nacimiento) {
        this.nacimiento = nacimiento;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getCedula() {
        return cedula;
    }

    public void setCedula(String cedula) {
        this.cedula = cedula;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public float getSaldo() {
        return saldo;
    }

    public void setSaldo(float saldo) {
        this.saldo = saldo;
    }

    public int getPrivilegio() {
        return privilegio;
    }

    public void setPrivilegio(int privilegio) {
        this.privilegio = privilegio;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean validarEdad(String nacimiento){
        LocalDate nacimientoDate= LocalDate.parse(nacimiento);
        LocalDate now= LocalDate.now();
        now=now.minusYears(18);
        if(now.isEqual(nacimientoDate)){
            return true;
        }else{
            return now.isAfter(nacimientoDate);
        }
    }

    public boolean verificarPassword(String password){
        String regex = "^(?=.*\\d)(?=.*[A-Z]).{10,2000}$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(password);
        return matcher.matches();
    }





}
