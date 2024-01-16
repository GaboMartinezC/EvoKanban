<?php
    require_once ('config.php');
    class Tarea 
    {
        public static function CrearTarea($descripcion, $idUsuario, $idEstado)
        {
            $database = new Database();
            $conn = $database->getConnection();
            $stmt = $conn->prepare('
                INSERT INTO TAREA (DESCRIPCION, ID_USUARIO, ID_ESTADO) 
                VALUES (:descripcion,:idUsuario, :idEstado)
            ');
            $stmt->bindParam(':descripcion',$descripcion);
            $stmt->bindParam(':idUsuario',$idUsuario);
            $stmt->bindParam(':idEstado',$idEstado);
            if($stmt->execute()){
                header('HTTP/1.1 201 Tarea creada correctamente');
            } else {
                header('HTTP/1.1 404 Tarea no se ha creado correctamente');
            }
        }
        public static function ActualizarTarea($idTarea, $idEstado)
        {
            $database = new Database();
            $conn = $database->getConnection();
            $stmt = $conn->prepare('
                UPDATE TAREA
                SET ID_ESTADO = :idEstado
                WHERE ID = :idTarea;
            ');
            $stmt->bindParam(':idEstado',$idEstado);
            $stmt->bindParam(':idTarea',$idTarea);
            if($stmt->execute()){
                header('HTTP/1.1 201 Tarea actualizada correctamente');
            } else {
                header('HTTP/1.1 404 Tarea no se ha actualizado correctamente');
            }
        }
        public static function EliminarTarea($idTarea)
        {
            $database = new Database();
            $conn = $database->getConnection();
            $stmt = $conn->prepare('
                DELETE FROM TAREA 
                WHERE ID = :idTarea
            ');
            $stmt->bindParam(':idTarea',$idTarea);
            if($stmt->execute()){
                header('HTTP/1.1 201 Tarea eliminada correctamente');
            } else {
                header('HTTP/1.1 404 Tarea no se ha eliminado correctamente');
            }
        }
        public static function BuscarTareas($idUsuario)
        {
            $database = new Database();
            $conn = $database->getConnection();
            $stmt = $conn->prepare('SELECT * FROM TAREA WHERE ID_USUARIO = :idUsuario');
            $stmt->bindParam(':idUsuario',$idUsuario);
            if($stmt->execute()){
                $result = $stmt->fetchAll();
                echo json_encode($result);
            }
        }
    }
?>