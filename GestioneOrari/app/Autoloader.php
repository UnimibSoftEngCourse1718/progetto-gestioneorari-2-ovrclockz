<?php 

namespace App;

class Autoloader{

    static function register(){
        spl_autoload_register(array(__CLASS__,'autoload'));
    }

    static function autoload($classname){
        $class = str_replace(__NAMESPACE__ . "\\","",$classname);
        $class = str_replace("\\","/",$class);
        //var_dump($class . ".php");
        require $class . ".php";
    }
}