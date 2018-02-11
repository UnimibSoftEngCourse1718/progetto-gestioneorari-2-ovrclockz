<?php 

require "../app/Autoloader.php";
App\Autoloader::register();

$app = App\App::getInstance();
$app->title = "Gestione Orario";

$db = $app->getDatabase();

$users = $app->getTable('users');
//$db->query("INSERT into users (username,password) VALUES ('serge','salfjb')");
$user = $users->all();
while ($row = $user->fetchArray()) {
    print_r($row);
}


//echo '<pre>';var_dump($app);echo '</pre>';

