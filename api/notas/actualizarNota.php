<?php
    require_once('../../includes/Nota.php');

    if($_SERVER['REQUEST_METHOD'] == 'PUT'
    && isset($_GET['idNota']) && isset($_GET['descripcion'])) 
    {
        Nota::ActualizarNota($_GET['idNota'],$_GET['descripcion']);
    }
?>