<?php
    header("Access-Control-Allow-Origin: *");
    require_once('../../includes/Usuario.php');

    if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['usuario'])){
        Usuario::BuscarUsuario($_GET['usuario']);
    }
?>