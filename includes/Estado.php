<?php
    require_once ('config.php');
    class Estado 
    {
        public static function BuscarEstados()
        {
            $database = new Database();
            $conn = $database->getConnection();
            $stmt = $conn->prepare('SELECT * FROM ESTADO');
            if($stmt->execute()){
                $result = $stmt->fetchAll();
                echo json_encode($result);
            }
        }
    }
?>