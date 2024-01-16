<?php
    header("Access-Control-Allow-Origin: *");
    require_once('../../includes/Nota.php');

    if($_SERVER['REQUEST_METHOD'] == 'POST'
    && isset($_GET['idNota']) && isset($_GET['descripcion'])) 
    {
        Nota::ActualizarNota($_GET['idNota'],$_GET['descripcion']);
    }
?>