<?php
    class Database 
    {
        private $host = 'localhost';
        private $user = 'id21792627_evo';
        private $password = 'Gifu1963.';
        private $database = 'id21792627_evokanban';

        public function getConnection(){
            $hostDB = "mysql:host=".$this->host.";dbname=".$this->database.";";

            try{
                $connection = new PDO($hostDB,$this->user,$this->password);
                $connection->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                return $connection;
            } catch(PDOException $e){
                die("ERROR: ".$e->getMessage());
            }

        }
    }
?>