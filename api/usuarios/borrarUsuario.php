<?php
    require_once('../../includes/Usuario.php');

    if($_SERVER['REQUEST_METHOD'] == 'DELETE' && isset($_GET['id'])) 
    {
        Usuario::EliminarUsuario($_GET['id']);
    }
?>