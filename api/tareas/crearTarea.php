<?php
    header("Access-Control-Allow-Origin: *");
    require_once('../../includes/Tarea.php');

    if($_SERVER['REQUEST_METHOD'] == 'POST'
    && isset($_GET['descripcion']) && isset($_GET['idUsuario']) && isset($_GET['idEstado'])) 
    {
        Tarea::CrearTarea($_GET['descripcion'], $_GET['idUsuario'], $_GET['idEstado']);
    }
?>