<?php
namespace Tests\gestioneOrari\Modules;

use GestioneOrari\Router;

class StringModule
{
    public function __construct(Router $router)
    {
         $router->get('/demo', function(){
            return 'DEMO';
         }, 'demo');
    }
}
