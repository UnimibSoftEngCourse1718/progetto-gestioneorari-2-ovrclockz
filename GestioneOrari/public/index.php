<?php 
error_reporting(E_ALL);
ini_set("display_errors", 1);

define('ROOT', dirname(__DIR__));

require ROOT . '/app/App.php';
App::load();

if(isset($_GET['page'])){
	$page = $_GET['page'];
}else{
	$page = 'home';
}

ob_start();
if($page === 'home'){
	require ROOT . '/pages/home.php';
}
$content = ob_get_clean();

require ROOT . '/pages/templates/default.php';

/*
$app = App::getInstance();
$app->title = "Gestione Orario";
$users = $app->getTable('users');
echo '<pre>';print_r($users->all());echo '</pre>';
*/
//echo '<pre>';var_dump($app);echo '</pre>';

