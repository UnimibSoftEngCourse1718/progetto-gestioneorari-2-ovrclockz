<?php 
//Factory

namespace App;

use App\Database\Database;

class App
{   
    public $title = "";
    private $db_instance;
    private static $_instance;

    public function getInstance(){
        if(is_null(SELF::$_instance)){
            SELF::$_instance = new App;
        }
        return SELF::$_instance;
    }

    public function getDatabase(){
        if(is_null($this->db_instance)){
            $this->db_instance = Database::getInstance();
        }
        return $this->db_instance;
    }

    public function getTable($name){
        $class_name = '\\App\\Table\\' . ucfirst($name) . "Table";
        return new $class_name($this->getDatabase());
    }
}
