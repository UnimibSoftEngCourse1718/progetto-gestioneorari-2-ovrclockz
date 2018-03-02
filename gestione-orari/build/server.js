"use strict";
/*
* Entry point dell'applicazione
*/
Object.defineProperty(exports, "__esModule", { value: true });
//Express - Mini Framework Node.js  
var express = require("express");
var session = require("express-session");
var path = require("path");
var bodyParser = require("body-parser");
//Server
var Server = /** @class */ (function () {
    function Server() {
        this.app = express();
        this.config();
        this.routes();
    }
    Server.prototype.config = function () {
        //Config
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    };
    Server.prototype.routes = function () {
        var router;
        router = express.Router();
        this.app.use('/', router);
        this.app.use(session({ secret: "qaefoie£$£%$&£%3899132wertg", resave: false, saveUninitialized: true }));
        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(__dirname, 'Views'));
        this.app.use('/assets', express.static(__dirname + '/public'));
    };
    return Server;
}());
exports.default = new Server().app;
