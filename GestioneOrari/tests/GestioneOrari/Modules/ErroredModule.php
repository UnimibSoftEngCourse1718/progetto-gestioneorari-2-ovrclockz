<?php
namespace Tests\gestioneOrari\Modules;

use GestioneOrari\Router;

class ErroredModule
{
    public function __construct(Router $router)
    {
         $router->get('/demo', function(){
            return new \stdClass();
         }, 'demo');
    }
}
