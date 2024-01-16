<?php
    header("Access-Control-Allow-Origin: *");
    require_once('../../includes/Usuario.php');

    if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_GET['id'])) 
    {
        Usuario::EliminarUsuario($_GET['id']);
    }
?>