<?php 
use Framework\App;
use App\Auth\AuthModule;
use Framework\Renderer;

error_reporting(E_ALL);
ini_set("display_errors", 1);

require '../vendor/autoload.php';

$renderer = new Renderer();
$renderer->addPath(dirname(__DIR__) . DIRECTORY_SEPARATOR . 'views');

$app = new App([
    AuthModule::class
],[
    'renderer' => $renderer
]);

$response = $app->run(\GuzzleHttp\Psr7\ServerRequest::fromGlobals());
\Http\Response\send($response);