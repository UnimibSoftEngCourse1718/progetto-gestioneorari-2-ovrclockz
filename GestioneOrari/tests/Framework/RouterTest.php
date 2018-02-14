<?php
namespace Tests\Framework;

use PHPUnit\Framework\TestCase;
use GuzzleHttp\Psr7\Request;
use Framework\Router;
use GuzzleHttp\Psr7\ServerRequest;


class RouterTest extends TestCase
{

    private $router;

    public function setUp(){
        $this->router = new Router();
    }

    public function testGetMethod(){
        $request = new ServerRequest('GET','/login');
        $this->router->get('/login', function() { return 'hello'; },'login');
        $route = $this->router->match($request);
        $this->assertEquals('login', $route->getName());
        $this->assertEquals('hello', call_user_func_array($route->getCallback(),[$request]));
    }

    public function testGetMethodIfUrlDoesNotExist(){
        $request = new ServerRequest('GET','/login');
        $this->router->get('/something', function() { return 'hello'; },'login');
        $route = $this->router->match($request);
        $this->assertEquals(null, $route);
    }

    public function testGetMethodWithParameters(){
        $request = new ServerRequest('GET','/user/my-slug-8');
        $this->router->get('user', function() { return 'something'; },'user');
        $this->router->get('/user/{slug:[a-z0-9\-]+}-{id:\d+}', function() { return 'hello'; },'user.show');
        $route = $this->router->match($request);
        $this->assertEquals('user.show', $route->getName());
        $this->assertEquals('hello', call_user_func_array($route->getCallback(),[$request]));
        $this->assertEquals(['slug' => 'my-slug','id' => '8'], $route->getParams());
        //Test invalid url
        $route = $this->router->match(new ServerRequest('GET', '/user/my_slug-8'));
        $this->assertEquals(null, $route);
    }

    public function testGenerateUri()
    {
        $this->router->get('user', function () {return 'something';}, 'user');
        $this->router->get('/user/{slug:[a-z0-9\-]+}-{id:\d+}', function () {return 'hello';}, 'user.show');
        $uri = $this->router->generateUri('user.show', ['slug' => 'my-slug' , 'id' => 8]);
        $this->assertEquals('/user/my-slug-8',$uri);
    }
}
