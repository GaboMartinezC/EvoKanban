<?php
    header("Access-Control-Allow-Origin: *");
    require_once('../../includes/Usuario.php');

    if($_SERVER['REQUEST_METHOD'] == 'POST'
    && isset($_GET['usuario']) && isset($_GET['email']) && isset($_GET['contra'])) 
    {
        Usuario::CrearUsuario($_GET['usuario'], $_GET['email'], $_GET['contra']);
    }
?>