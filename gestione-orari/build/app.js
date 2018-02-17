"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server");
var UsersController_1 = require("./Controllers/UsersController");
var Studente_1 = require("./Models/Studente");
Studente_1.default.findAll(function (res) {
    console.log("-------ALL---------");
    console.log(res);
});
server_1.default.get('/', function (request, response) { return UsersController_1.default.index(request, response); });
server_1.default.get('/dashboard', function (request, response) { return UsersController_1.default.dashboard(request, response); });
server_1.default.post('/login', function (request, response) { return UsersController_1.default.login(request, response); });
server_1.default.post('/register', function (request, response) { return UsersController_1.default.register(request, response); });
//Definizione porta di ascolto dell'applicazione
server_1.default.listen(8080);
