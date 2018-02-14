<?php
namespace Framework;

use GuzzleHttp\Psr7\Response;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class App
{

    private $modules = [];

    private $router;

    /**
     *  App Constructor.
     * @param string[] $modules Lista dei moduli da caricare
     */
    public function __construct(array $modules = [], array $dependencies = [])
    {
        $this->router = new Router();
        foreach ($modules as $module) {
            $this->modules[] = new $module($this->router,$dependencies['renderer']);
        }
    }

    public function run(ServerRequestInterface $request)
    {
        //echo '<pre>';print_r($request);echo '</pre>';die();
        $uri = $request->getUri()->getPath();
        if (!empty($uri) && $uri[-1] === "/") {
            return (new Response())
                ->withStatus(301)
                ->withHeader('Location', substr($uri, 0, -1));
        }

        $route = $this->router->match($request);
        if(is_null($route)){
            return new Response(404, [], '<h1>404</h1>');
        }
        $response = call_user_func_array($route->getCallback(),[$request]);
        if(is_string($response)){
            return new Response(200, [], $response);
        }elseif ($response instanceof ResponseInterface) {
            return $response;
        }else{
            throw new \Exception("Error Processing Request");
            
        }
    }
}
