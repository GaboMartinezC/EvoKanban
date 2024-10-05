const url = 'http://localhost/backend/api/';
$(document).ready(function () {
    CustomizarElementos();

    $('#btnCerrarSesion').click(function() {
        sessionStorage.setItem('idActivo', '0');
        sessionStorage.setItem('usuarioActivo', '0');
        window.location.href = 'index.html';
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
    }
    else
        window.location.href = 'index.html';
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
                html += `<div class="tarea">
                            <div class="texto">
                                <p>${data[i].DESCRIPCION}</p>
                            </div>
                            <div class="boton" onclick='CambiarEstado(${data[i].ID},${parseInt(data[i].ID_ESTADO)+1});'>></div>
                        </div>`;
            }
            else if (data[i].ID_ESTADO == 4)
            {
                html += `<div class="tarea">
                            <div class="texto">
                                <p>${data[i].DESCRIPCION}</p>
                            </div>
                            <div class="boton" onclick='CambiarEstado(${data[i].ID},${parseInt(data[i].ID_ESTADO)-1});'><</div>
                            <div class="boton" onclick='EliminarTarea(${data[i].ID});'>x</div>
                        </div>`;
            }
            else
            {
                html += `<div class="tarea">
                            <div class="texto">
                                <p>${data[i].DESCRIPCION}</p>
                            </div>
                            <div class="boton" onclick='CambiarEstado(${data[i].ID},${parseInt(data[i].ID_ESTADO)-1});'><</div>
                            <div class="boton" onclick='CambiarEstado(${data[i].ID},${parseInt(data[i].ID_ESTADO)+1});'>></div>
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