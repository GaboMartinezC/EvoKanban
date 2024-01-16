<?php
    require_once ('config.php');
    class Usuario 
    {
        public static function CrearUsuario($usuario, $email, $contra)
        {
            $database = new Database();
            $conn = $database->getConnection();
            $stmt = $conn->prepare('
                INSERT INTO USUARIO (USUARIO, EMAIL, CONTRA) 
                VALUES (:usuario,:email, :contra)
            ');
            $stmt->bindParam(':usuario',$usuario);
            $stmt->bindParam(':email',$email);
            $stmt->bindParam(':contra',$contra);
            if($stmt->execute()){
                header('HTTP/1.1 201 Usuario creado correctamente');
            } else {
                header('HTTP/1.1 404 Usuario no se ha creado correctamente');
            }
        }
        public static function ActualizarUsuario($id, $usuario, $email, $contra)
        {
            $database = new Database();
            $conn = $database->getConnection();
            $stmt = $conn->prepare('
                UPDATE NOTA
                SET USUARIO = :usuario,
                CONTRA = :contra,
                EMAIL = :email
                WHERE ID = :id;
            ');
            $stmt->bindParam(':usuario',$usuario);
            $stmt->bindParam(':email',$email);
            $stmt->bindParam(':contra',$contra);
            $stmt->bindParam(':id',$id);
            if($stmt->execute()){
                header('HTTP/1.1 201 Usuario actualizado correctamente');
            } else {
                header('HTTP/1.1 404 Usuario no se ha actualizado correctamente');
            }
        }
        public static function EliminarUsuario($idUsuario)
        {
            $database = new Database();
            $conn = $database->getConnection();
            $stmt = $conn->prepare('
                DELETE FROM USUARIO
                WHERE ID = :idUsuario
            ');
            $stmt->bindParam(':idUsuario',$idUsuario);
            if($stmt->execute()){
                header('HTTP/1.1 201 Usuario eliminado correctamente');
            } else {
                header('HTTP/1.1 404 Usuario no se ha eliminado correctamente');
            }
        }
        public static function BuscarUsuario($nombreUsuario)
        {
            $database = new Database();
            $conn = $database->getConnection();
            $stmt = $conn->prepare('SELECT * FROM USUARIO WHERE USUARIO = :nombreUsuario');
            $stmt->bindParam(':nombreUsuario',$nombreUsuario);
            if($stmt->execute()){
                $result = $stmt->fetchAll();
                echo json_encode($result);
            }
        }
    }
?>