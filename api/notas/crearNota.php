<?php
    header("Access-Control-Allow-Origin: *");
    require_once('../../includes/Nota.php');

    if($_SERVER['REQUEST_METHOD'] == 'POST'
    && isset($_GET['descripcion']) && isset($_GET['idUsuario'])) 
    {
        Nota::CrearNota($_GET['descripcion'], $_GET['idUsuario']);
    }
?>