<?php
    header("Access-Control-Allow-Origin: *");
    require_once('../../includes/Tarea.php');

    if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_GET['id'])) 
    {
        Tarea::EliminarTarea($_GET['id']);
    }
?>