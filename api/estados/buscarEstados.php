<?php
    header("Access-Control-Allow-Origin: *");
    require_once('../../includes/Estado.php');

    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        Estado::BuscarEstados();
    }
?>