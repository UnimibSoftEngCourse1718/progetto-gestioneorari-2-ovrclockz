<?php 
namespace App\Auth;

use GestioneOrari\Router;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;


class AuthModule
{
    public function __construct(Router $router)
    {
        $router->get('/auth',[$this, 'index'], 'auth.index');
    }

    public function index(ServerRequestInterface $request): string
    {
        return '<h1>Auth</h1>';
    }
}
