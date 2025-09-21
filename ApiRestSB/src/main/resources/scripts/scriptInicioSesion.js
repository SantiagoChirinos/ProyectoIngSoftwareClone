window.addEventListener("DOMContentLoaded", (eventt)=>{
    const boton = document.getElementById("boton-inicio-sesion");
    boton.addEventListener("click",evento=>{
        iniciarSesion();
    });
    
    let iniciarSesion = async()=>{
        let campos = {}
            campos.nombre=document.getElementById("cedula").value;
            campos.password=document.getElementById("password").value;
            
            const petition= await fetch("http://localhost:8080/api/perfiles",
                {
                    method: "GET",
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                }
            );
            
            const perfiles= await petition.json();
            perfilValido=false;
            for(let perfil of perfiles){
                if((perfil.cedula==document.getElementById("cedula").value)&&(perfil.password==document.getElementById("password").value)){
                    perfilValido=true;
                    cliente = perfil;
                }
            }
            if(perfilValido){
                console.log("ok")
                localStorage.setItem('rol', cliente.privilegio);
                window.location.href="http://localhost:8080/menuPrincipal.html";
            } else{
                alert("Perfil o contraseña invalido");
            }

    }
})
