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
            campos.saldo=0;
            campos.privilegio=0;
            campos.password=document.getElementById("password1").value;
    continuar=true
    try {
        parseInt(campos.cedula)
    } catch (error) {
        continuar=false
    }
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
            

            if(((perfil.nacimiento=="bad-request")&&(avisoEdad))||(perfil.nacimiento==null)){
                alert("Debe ser mayor de edad para crear una cuenta");
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
            if(!avisoEdad){
                window.location.href="http://localhost:8080/InicioSesion.html"
            }
            if(avisoCedula && avisoEdad && avisoPassword){
                alert("registro con exito");
            }
            
        } else{
                alert("las contraseñas no coinciden")
        }
    }
    }
})