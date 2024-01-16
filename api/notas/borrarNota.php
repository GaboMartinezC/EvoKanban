<?php
    header("Access-Control-Allow-Origin: *");
    require_once('../../includes/Nota.php');

    if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_GET['id'])) 
    {
        Nota::EliminarNota($_GET['id']);
    }
?>