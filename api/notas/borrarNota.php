<?php
    require_once('../../includes/Nota.php');

    if($_SERVER['REQUEST_METHOD'] == 'DELETE' && isset($_GET['id'])) 
    {
        Nota::EliminarNota($_GET['id']);
    }
?>