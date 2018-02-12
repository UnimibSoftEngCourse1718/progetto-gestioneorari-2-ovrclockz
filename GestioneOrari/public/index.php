<?php 

error_reporting(E_ALL);
ini_set("display_errors", 1);

try{
	require "../app/Autoloader.php";
	App\Autoloader::register();

	$app = App\App::getInstance();
	$app->title = "Gestione Orario";

	$db = $app->getDatabase();

	$users = $app->getTable('users');
	//$db->query("INSERT into users (username,password) VALUES ('serge','salfjb')");
	echo '<pre>';print_r($users->all());echo '</pre>';

}catch(Ecxeption $e){
	echo $e->getMessage();
}

//echo '<pre>';var_dump($app);echo '</pre>';

