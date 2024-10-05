$(document).ready(function () {
    const url = 'http://localhost/backend/api/usuarios/';
    
    $('#btnLogin').click(function() {
        let usuario = $('#txtUsuarioLogin').val();
        let contra = $('#txtContraLogin').val();
        let enlace = url + `buscarUsuario.php?usuario=${usuario}`;
        if (usuario != '' || contra != '')
        {
            fetch(enlace)
            .then (respuesta => respuesta.json())
            .then (datos => {
                let data = JSON.parse(JSON.stringify(datos));
                if (data[0] == undefined)
                {
                    Swal.fire({
                        icon: "error",
                        title: "Ha habido un problema",
                        text: "Usuario no existe",
                        footer: ''
                    });
                }
                else
                {
                    if (data[0].CONTRA == contra)
                    {
                        sessionStorage.setItem('usuarioActivo', data[0].USUARIO);
                        sessionStorage.setItem('idActivo', data[0].ID);
                        window.location.href = 'main.html'
                    }
                    else
                    {
                        Swal.fire({
                            icon: "error",
                            title: "Ha habido un problema",
                            text: "Contraseña Incorrecta",
                            footer: ''
                        });
                    }
                } 
            })
            .catch(error => {
                console.log(error);
            })
        }
        else
        {
            Swal.fire({
                icon: "error",
                title: "Ha habido un problema",
                text: "Rellene correctamente el formulario",
                footer: ''
            });
        }
        
    });

    $('#btnRegistrarse').click(function() {
        $('#formRegistro').show();
        $('#formLogin').hide();
    })

    $('#btnVolver').click(function() {
        $('#formRegistro').hide();
        $('#formLogin').show();
    })

    $('#btnRegistro').click(function() {
        let usuario = $('#txtUsuarioRegistro').val();
        let contra = $('#txtContraRegistro').val();
        let contraConfirmada = $('#txtConfirmarContra').val();
        let email = $('#txtEmailRegistro').val();
        if (usuario != '' || contra != '' || contraConfirmada != '' || email != '')
        {
            if (contra == contraConfirmada)
            {
                //Valida que el usuario no exista
                let link = url + `buscarUsuario.php?usuario=${usuario}`;
                fetch(link)
                .then (respuesta => respuesta.json())
                .then (datos => {
                    let data = JSON.parse(JSON.stringify(datos));
                    //Ingresa al usuario si no existe
                    if (data[0] == undefined)
                    {
                        let enlace = url + `crearUsuario.php?usuario=${usuario}&email=${email}&contra=${contra}`;
                        fetch(enlace , {method: 'POST'})
                        .then(response => {
                            Swal.fire({
                                icon: "success",
                                title: "Registro Correcto",
                                text: "Usuario ingresado, proceda a realizar el Login",
                                footer: ''
                            });
                        });
                    }
                    else
                    {
                        Swal.fire({
                            icon: "error",
                            title: "Ha habido un problema",
                            text: "Este usuario ya existe",
                            footer: ''
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            }
            else
            {
                Swal.fire({
                    icon: "error",
                    title: "Ha habido un problema",
                    text: "Las contraseñas no coinciden",
                    footer: ''
                });
            }
        }
        else
        {
            Swal.fire({
                icon: "error",
                title: "Ha habido un problema",
                text: "Rellene correctamente el formulario",
                footer: ''
            });
        }
    });

});