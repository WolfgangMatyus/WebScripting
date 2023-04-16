<?php
class Post{

    private $conn;
    private $table = 'posts';

    // Post Properties
    public $id;
    public $name;
    public $pwd;

    // Constructor with DB
    public function __construct($db) {    
        $this->conn = $db;
    }
    
    // Get Posts
    public function read(){
        // Create query
        $query = 
        'SELECT
            p.id,
            p.name,
            p.pwd
        FROM
        ' . $this->table;
    // Prepare statement
    $stmt = $this->conn->prepare($query);
    
    // Execute query
    $stmt->execute();
    }

    // Create Post
    public function create() {
        // Creage query
        $query = 'INSERT INTO ' .
         $this->table. '
         SET
          name = :name,
          pwd = :pwd';

          // Prepare statement
          $stmt = $this->conn->prepare($query);

          // Clean data
          $this->name = htmlspecialchars(strip_tags($this->name));
          $this->pwd = htmlspecialchars(strip_tags($this->pwd));

          // Bind data
          $stmt->bindParam(':name', $this->name);
          $stmt->bindParam(':pwd', $this->pwd);

          // Execute query
          if($stmt->execute()) {
            return true;
          }

          //Print error if something goes wrong
          printf("Error: %s.\n", $stmt->error);

          return false;
    }
   
}