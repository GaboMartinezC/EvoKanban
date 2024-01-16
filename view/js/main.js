const url = 'https://evokanban.000webhostapp.com/api/';
$(document).ready(function () {
    CustomizarElementos();

    $('#btnCerrarSesion').click(function() {
        sessionStorage.setItem('idActivo', '0');
        sessionStorage.setItem('usuarioActivo', '0');
        window.location.href = 'index.html';
    });

    $('#btnModificarUsuario').click(function(){
        Swal.fire({
            icon: "question",
            title: "Función no Disponible",
            text: "Esta función aún sigue en desarrollo",
            footer: ''
        });
    });

    $('#btnIngresarTarea').click(function(){
        let descripcion = $('#txtTarea').val();
        if (descripcion.trim() != '')
        {
            $('#txtTarea').val('');
            let idUsuario = sessionStorage.getItem('idActivo');
            enlace = url + `tareas/crearTarea.php?descripcion=${descripcion}
                            &idUsuario=${idUsuario}&idEstado=1`;
            fetch(enlace , {method: 'POST'})
            .then(response => {
                RenderizarTareas();
            });
        }
    });

});
function CustomizarElementos()
{
    if (sessionStorage.getItem('idActivo') != '0')
    {
        let usuario = sessionStorage.getItem('usuarioActivo');
        $('#cabecera').html(`Tablero de ${usuario}`);
        $('#nombreUsuario').html(`¡Hola ${usuario}!`);
        RenderizarTareas();
        RenderizarNotas();
    }
    else
        window.location.href = 'index.html';
}
function RenderizarNotas()
{
    let idUsuario = sessionStorage.getItem('idActivo');
    let enlace = url + `notas/buscarNotas.php`;
    $('#espacioNotas').html('');
    fetch(enlace)
    .then (respuesta => respuesta.json())
    .then (datos => {
        let data = JSON.parse(JSON.stringify(datos));
        for (let i = 0; i < data.length; i++)
        {
            if (data[i].ID_USUARIO == idUsuario )
            {
                let htmlNotas = $('#espacioNotas').html();
                htmlNotas += `
                <div class="col-6 col-md-4 card mt-5">
                    <div class="card-body">
                        <input type="text" class="form-control" value="${data[i].DESCRIPCION}" id="nota${data[i].ID}">
                    </div>
                    <div class="card-footer">
                        <div class="row">
                            <div class="col-6">
                                <button class="btn btn-outline-secondary" onclick='EditarNota(${data[i].ID})'>
                                    +
                                </button>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-outline-danger" onclick='EliminarNota(${data[i].ID})'>
                                    x
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                $('#espacioNotas').html(htmlNotas);
            }
        }
    });
}
function RenderizarTareas()
{
    let idUsuario = sessionStorage.getItem('idActivo');
    let enlace = url + `tareas/buscarTareas.php?idUsuario=${idUsuario}`;
    fetch(enlace)
    .then (respuesta => respuesta.json())
    .then (datos => {
        let data = JSON.parse(JSON.stringify(datos));
        //Vacía los espacios del kanban
        for (let i = 1; i < 5; i++)
            $('#espacioKanban'+i).html('');
        //Llena los espacios del kanban
        for (let i = 0; i < data.length; i++)
        {
            let espacioKanban = $('#espacioKanban'+data[i].ID_ESTADO);
            let html = espacioKanban.html();
            if (data[i].ID_ESTADO == 1)
            {
                html += `<div class="customColor bordeTareas text-center m-1">
                    <p class="subtitle">${data[i].DESCRIPCION}</p>
                    <button class="btn btn-outline-light" onclick='CambiarEstado(${data[i].ID},${data[i].ID_ESTADO+1});'>></button>
                </div>`;
            }
            else if (data[i].ID_ESTADO == 4)
            {
                html += `<div class="customColor bordeTareas text-center m-1">
                    <p class="subtitle">${data[i].DESCRIPCION}</p>
                    <button class="btn btn-outline-light" onclick='CambiarEstado(${data[i].ID},${data[i].ID_ESTADO-1});'><</button>
                    <button class="btn btn-outline-light" onclick='EliminarTarea(${data[i].ID});'>x</button>
                </div>`;
            }
            else
            {
                html += `<div class="customColor bordeTareas text-center m-1">
                    <p class="subtitle">${data[i].DESCRIPCION}</p>
                    <button class="btn btn-outline-light" onclick="CambiarEstado(${data[i].ID},${data[i].ID_ESTADO-1});"><</button>
                    <button class="btn btn-outline-light" onclick="CambiarEstado(${data[i].ID},${data[i].ID_ESTADO+1});">></button>
                </div>`;
            }
            espacioKanban.html(html);
        }
    })
    .catch(error => {
        console.log(error);
    });
}
function CambiarEstado(idTarea, idEstado)
{
    let enlace = url + `tareas/actualizarTarea.php?id=${idTarea}&idEstado=${idEstado}`;
    fetch(enlace , {method: 'POST'})
    .then(response => {
        RenderizarTareas();
    });
}
function EliminarTarea(idTarea)
{
    enlace = url + `tareas/borrarTarea.php?id=${idTarea}`;
    fetch(enlace , {method: 'POST'})
    .then(response => {
        RenderizarTareas();
    });
}   