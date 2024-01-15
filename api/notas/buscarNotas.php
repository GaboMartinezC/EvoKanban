<?php
    require_once('../../includes/Nota.php');

    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        Nota::BuscarNotas ();
    }

?>