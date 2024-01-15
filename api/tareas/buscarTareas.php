<?php
    require_once('../../includes/Tarea.php');

    if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['idUsuario'])){
        Tarea::BuscarTareas ($_GET['idUsuario']);
    }
?>