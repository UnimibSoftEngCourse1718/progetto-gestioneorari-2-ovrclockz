<?php
//Singleton

namespace App\Database;

class Database{
    const DB = './../app/Database/gestione_orario.sqlite';
    private static $_instance;
    private $db;

    public function __construct()
    {
        $this->db = new \SQLite3(SELF::DB);
        $this->db->query("CREATE TABLE IF NOT EXISTS users (username STRING, password STRING)");
    }

    public static function getInstance(){
        if(is_null(SELF::$_instance)){
            SELF::$_instance = new Database;
        }
        return SELF::$_instance;
    }

    public function query($query){
        return $this->db->query($query);
    }
}
