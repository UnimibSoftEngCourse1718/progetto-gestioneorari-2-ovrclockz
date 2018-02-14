<?php 
use GestioneOrari\App;
use App\Auth\AuthModule;

error_reporting(E_ALL);
ini_set("display_errors", 1);

require '../vendor/autoload.php';

$app = new App([
    AuthModule::class
]);

$response = $app->run(\GuzzleHttp\Psr7\ServerRequest::fromGlobals());
\Http\Response\send($response);