<?php 
use Core\Database\Database;

class Auth 
{
    private $db;

    public function __construct(Database $db)
    {
        $this->db = $db;   
    }

    public function login($username, $password){
        $user = $this->db->query("SELECT * FROM user WHERE username = '$username'");
        var_dump($user);
    }

    public function logged(){
        return isset($_SESSION['auth']);
    }
}
