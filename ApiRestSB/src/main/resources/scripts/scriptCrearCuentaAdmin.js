window.addEventListener("DOMContentLoaded", (eventt)=>{
    const boton = document.getElementById("boton-crear-cuenta-cliente");
    eventt.preventDefault();
    boton.addEventListener("click",evento=>{
        if(window.confirm("¿Está seguro que quiere proceder?")){
            registrarCuentaCliente();
        }
    });

    let registrarCuentaCliente = async()=>{
        let campos = {}
            campos.nombre=document.getElementById("Nombre").value;
            campos.apellido=document.getElementById("Apellido").value;
            campos.nacimiento=document.getElementById("fecha-nacimiento").value;
            campos.correo=document.getElementById("email").value;
            campos.cedula=document.getElementById("cedula").value;
            campos.telefono=document.getElementById("telefono").value;
            if(document.getElementById("tipoCliente").checked){
                campos.privilegio=0;
            }else if(document.getElementById("tipoEmpleado").checked){
                campos.privilegio=1;
            }else{
                campos.privilegio=2;
            }
            campos.saldo=0;
            
            campos.password=document.getElementById("password1").value;
    continuar=true
    try {
        parseInt(campos.cedula)
    } catch (error) {
        continuar=false
    }
    //console.log(campos.nacimiento);
    if(continuar){
        if(document.getElementById("password1").value==document.getElementById("password2").value){
            const petition= await fetch("http://localhost:8080/api/crearCuentaCliente",
                {
                    method: "POST",
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(campos)
                }
            );
            const perfil= await petition.json();
            
            //true es que no ha dado los anuncios
            avisoEdad=true;
            avisoPassword=true;
            avisoCedula=true;
            error=true;
            if(((perfil.nacimiento=="bad-request")&&(avisoEdad))||(perfil.nacimiento==null)){
                alert("No puede registrar a un menor de edad como cliente");
                avisoEdad=false;
            }
            if(((perfil.password=="bad-request")&&(avisoPassword))||(perfil.password==null)){
                alert("La contraseña no cumple los parámetros");
                avisoPassword=false;
            }
            if(((perfil.cedula=="bad-request")&&(avisoCedula))||(perfil.cedula==null)){
                alert("La cédula ya ha sido registrada");
                avisoCedula=false;
            }
            if(avisoCedula && avisoEdad && avisoPassword && error){
                alert("registro con exito");
            }
            
        } else{
                alert("las contraseñas no coinciden")
        }
    }else{
        alert("Cédula inválida");
    }
    }
})