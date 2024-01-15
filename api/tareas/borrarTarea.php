<?php
    require_once('../../includes/Tarea.php');

    if($_SERVER['REQUEST_METHOD'] == 'DELETE' && isset($_GET['id'])) 
    {
        Tarea::EliminarTarea($_GET['id']);
    }
?>