<?php 
	class Database {
		private $dbName;
	    private $dbHost;
	    private $dbUsername;
	    private $dbUserPassword;
	    private $pdo = null;
		
		public function __construct($name, $host, $user, $pw){
			$this->dbName = $name;
			$this->dbHost = $host;
			$this->dbUsername = $user;
			$this->dbUserPassword = $pw;
			$this->connect(); 
		}

		public function connect(){
			if($this->pdo == null){
				try{
                    $strConn = "mysql:host=".$this->dbHost.";"."dbname=".$this->dbName;
                    $this->pdo = new PDO($strConn, $this->dbUsername, $this->dbUserPassword);
                }
                catch(PDOException $e) {
                    die($e->getMessage());  
                }
            } 
        }
        public function close(){
            $this->pdo = null;
        }
        public function executeQuery($query){
            return $this->pdo->query($query);
        }
    }



