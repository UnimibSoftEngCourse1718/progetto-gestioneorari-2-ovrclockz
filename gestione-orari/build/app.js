"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server");
var UsersController_1 = require("./Controllers/UsersController");
var StudentiController_1 = require("./Controllers/StudentiController");
//import U from './Models/Studente';
/*
U.findAll(function(res : Object) {
    console.log("-------ALL---------");
    console.log(res);
});
*/
var User = new UsersController_1.default();
server_1.default.get('/', function (request, response) { return User.index(request, response); });
server_1.default.get('/dashboard', function (request, response) { return User.dashboard(request, response); });
server_1.default.post('/login', function (request, response) { return User.login(request, response); });
server_1.default.post('/register', function (request, response) { return User.register(request, response); });
server_1.default.get('/getUserData', function (request, response) { return User.getUserData(request, response); });
server_1.default.get('/getPubblicazioni', function (request, response) { return User.getPubblicazioni(request, response); });
server_1.default.post('/iscrizioneEsame', function (request, response) { return StudentiController_1.default.iscrizioneEsame(request, response); });
//Definizione porta di ascolto dell'applicazione
server_1.default.listen(8080);
