<?php
    require_once ('config.php');
    class Nota 
    {
        public static function CrearNota($descripcion, $id)
        {
            $database = new Database();
            $conn = $database->getConnection();
            $stmt = $conn->prepare('
                INSERT INTO NOTA (DESCRIPCION, ID_USUARIO) 
                VALUES (:descripcion,:id)
            ');
            $stmt->bindParam(':descripcion',$descripcion);
            $stmt->bindParam(':id',$id);
            if($stmt->execute()){
                header('HTTP/1.1 201 Nota creada correctamente');
            } else {
                header('HTTP/1.1 404 Nota no se ha creado correctamente');
            }
        }
        public static function ActualizarNota($idNota, $descripcion)
        {
            $database = new Database();
            $conn = $database->getConnection();
            $stmt = $conn->prepare('
                UPDATE NOTA
                SET DESCRIPCION = :descripcion
                WHERE ID = :idNota;
            ');
            $stmt->bindParam(':descripcion',$descripcion);
            $stmt->bindParam(':idNota',$idNota);
            if($stmt->execute()){
                header('HTTP/1.1 201 Nota actualizada correctamente');
            } else {
                header('HTTP/1.1 404 Nota no se ha actualizado correctamente');
            }
        }
        public static function EliminarNota($idNota)
        {
            $database = new Database();
            $conn = $database->getConnection();
            $stmt = $conn->prepare('
                DELETE FROM NOTA 
                WHERE ID = :idNota
            ');
            $stmt->bindParam(':idNota',$idNota);
            if($stmt->execute()){
                header('HTTP/1.1 201 Nota eliminada correctamente');
            } else {
                header('HTTP/1.1 404 Nota no se ha eliminado correctamente');
            }
        }
        public static function BuscarNotas()
        {
            $database = new Database();
            $conn = $database->getConnection();
            $stmt = $conn->prepare('SELECT * FROM NOTA');
            if($stmt->execute()){
                $result = $stmt->fetchAll();
                echo json_encode($result);
                header('HTTP/1.1 201 OK');
            } else {
                header('HTTP/1.1 404 No se ha podido consultar las notas');
            }
        }
    }
?>