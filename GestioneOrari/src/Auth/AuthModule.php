<?php 
namespace App\Auth;

use Framework\Router;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;
use Framework\Renderer;


class AuthModule
{
    private $renderer;    

    public function __construct(Router $router,Renderer $renderer)
    {
        $this->renderer = $renderer;
        $this->renderer->addPath('auth', __DIR__ . '/views');
        $router->get('/auth',[$this, 'index'], 'auth.index');
    }

    public function index(ServerRequestInterface $request): string
    {
        return $this->renderer->render('@auth/index');
    }
}
