<?php

// #1 https://www.youtube.com/watch?v=OEWXbpUMODk
// #2 https://www.youtube.com/watch?v=-nq4UbD0NT8 <-- create
// #3 https://www.youtube.com/watch?v=tG2U18EmIu4

class Database{
    // DB Params
    private $host = 'localhost';
    private $db_name = 'phpproject02';
    private $username = 'root';
    private $password = '';
    private $conn;

    // DB Connect
    public function connect() {
        $this->conn = null;

        try {
            $this->conn = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->db_name,
            $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            echo 'Connection Error: ' . $e->getMessage();
        }

        return $this->conn;
    }
}