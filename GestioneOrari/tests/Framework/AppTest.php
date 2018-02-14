<?php 
namespace Tests\Framework;

use Framework\App;
use GuzzleHttp\Psr7\ServerRequest;
use PHPUnit\Framework\TestCase;
use App\Auth\AuthModule;
use Tests\Framework\Modules\ErroredModule;
use Tests\Framework\Modules\StringModule;
use Psr\Http\Message\ResponseInterface;

class Apptest extends TestCase
{
    public function testRedirectTrailingSlash(){
        $app = new App();
        $request = new ServerRequest('GET','/demoslash/');
        $response = $app->run($request);
        $this->assertContains('/demoslash',$response->getHeader('Location'));
        $this->assertEquals(301,$response->getStatusCode());
    }

    public function testAuth(){
        $app = new App([
            AuthModule::class
        ]);
        $request = new ServerRequest('GET','/auth');
        $response = $app->run($request);
        $this->assertContains('Auth',(string)$response->getBody());
        $this->assertEquals(200,$response->getStatusCode());
    }

    public function testThrowExceptionIfNoResponseSent(){
        $app = new App([
            ErroredModule::class
        ]);
        $request = new ServerRequest('GET','/demo');
        $this->expectException(\Exception::class);
        $app->run($request);
    }

    public function testConvertStringToResponse(){
        $app = new App([
            StringModule::class
        ]);
        $request = new ServerRequest('GET','/demo');
        $response = $app->run($request);
        $this->assertInstanceOf(ResponseInterface::class, $response);
        $this->assertEquals('DEMO', (string)$response->getBody());
    }

    public function testError404(){
        $app = new App();
        $request = new ServerRequest('GET','/something');
        $response = $app->run($request);
        $this->assertContains('404',(string)$response->getBody());
        $this->assertEquals(404,$response->getStatusCode());
    }
}
