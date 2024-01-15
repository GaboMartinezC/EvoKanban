<?php
    require_once('../../includes/Tarea.php');

    if($_SERVER['REQUEST_METHOD'] == 'PUT'
    && isset($_GET['id']) && isset($_GET['idEstado'])) 
    {
        Tarea::ActualizarTarea($_GET['id'],$_GET['idEstado']);
    }
?>