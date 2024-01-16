$(document).ready(function () {
    $('#btnIngresarNota').click(function () {
        let idUsuario = sessionStorage.getItem('idActivo');
        let descripcion = $('#txtNota').val();
        if (descripcion.trim() != '')
        {
            enlace = url + `notas/crearNota.php?idUsuario=${idUsuario}&descripcion=${descripcion}`;
            fetch(enlace , {method: 'POST'})
            .then(response => {
                RenderizarNotas();
            });
        }
        $('#txtNota').val('');
    });
});
function EliminarNota(idNota)
{
    enlace = url + `notas/borrarNota.php?id=${idNota}`;
    fetch(enlace , {method: 'POST'})
    .then(response => {
        RenderizarNotas();
    });
}
function EditarNota(idNota)
{
    let nuevoTexto = $('#nota'+idNota).val();
    enlace = url + `notas/actualizarNota.php?idNota=${idNota}&descripcion=${nuevoTexto}`;
    fetch(enlace , {method: 'POST'})
    .then(response => {
        RenderizarNotas();
    });
}