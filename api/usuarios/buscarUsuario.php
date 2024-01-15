<?php
    require_once('../../includes/Usuario.php');

    if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['id'])){
        Usuario::BuscarUsuario($_GET['id']);
    }
?>