<?php
namespace Tests\Framework;

use PHPUnit\Framework\TestCase;
use Framework\Renderer;

class RendererTest extends TestCase
{
    private $renderer;

    public function setUp(){
        $this->renderer = new Renderer();
        $this->renderer->addPath( __DIR__ . '/Views');
    }

    public function testRenderTheRightPath(){
        $this->renderer->addPath('auth', __DIR__ . '/Views');
        $content = $this->renderer->render('@auth/demo');
        $this->assertEquals('hello!!',$content);
    }
    
    public function testRenderTheDefaultPath(){
        $content = $this->renderer->render('demo');
        $this->assertEquals('hello!!',$content);
    }

    public function testRenderWithParams(){
        $content = $this->renderer->render('demoparams', ['name' => 'Serge']);
        $this->assertEquals('Hello Serge',$content);
    }
}
