"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server");
var UsersController_1 = require("./Controllers/UsersController");
var StudentiController_1 = require("./Controllers/StudentiController");
var DocentiController_1 = require("./Controllers/DocentiController");
var SegretariController_1 = require("./Controllers/SegretariController");
var User = new UsersController_1.default();
var Studente = new StudentiController_1.default();
var Docente = new DocentiController_1.default();
var Segretario = new SegretariController_1.default();
server_1.default.get('/', function (request, response) { return User.index(request, response); });
server_1.default.get('/dashboard', function (request, response) { return User.dashboard(request, response); });
server_1.default.post('/login', function (request, response) { return User.login(request, response); });
server_1.default.get('/logout', function (request, response) { return User.logout(request, response); });
server_1.default.post('/register', function (request, response) { return User.register(request, response); });
//All
server_1.default.get('/getUserData', function (request, response) { return User.getUserData(request, response); });
server_1.default.get('/getPubblicazioni', function (request, response) { return User.getPubblicazioni(request, response); });
server_1.default.post('/getPubblicazioniCorso', function (request, response) { return User.getPubblicazioniCorso(request, response); });
//Studenti
server_1.default.post('/iscrizioneEsame', function (request, response) { return Studente.iscrizioneEsame(request, response); });
server_1.default.post('/getListaEsamiStudente', function (request, response) { return Studente.getListaEsamiStudente(request, response); });
//Docenti
server_1.default.post('/getListaEsamiDocente', function (request, response) { return Docente.getListaEsamiDocente(request, response); });
server_1.default.get('/getListaRisorse', function (request, response) { return Docente.getListaRisorse(request, response); });
server_1.default.post('/getListaRisorsePrenotate', function (request, response) { return Docente.getListaRisorsePrenotate(request, response); });
server_1.default.post('/prenotazioneRisorsa', function (request, response) { return Docente.prenotazioneRisorsa(request, response); });
server_1.default.post('/cancellarePrenotazione', function (request, response) { return Docente.cancellarePrenotazione(request, response); });
//Docenti + Segretari
server_1.default.post('/pubblicareNews', function (request, response) { return User.pubblicareNews(request, response); });
server_1.default.post('/pubblicareNewsCorso', function (request, response) { return Docente.pubblicareNewsCorso(request, response); });
//Segretari
server_1.default.get('/getListaEsamiAll', function (request, response) { return User.getListaEsamiAll(request, response); });
server_1.default.post('/inserireEsame', function (request, response) { return Segretario.inserireEsame(request, response); });
server_1.default.post('/inserireRisorsa', function (request, response) { return Segretario.inserireRisorsa(request, response); });
server_1.default.post('/inserireDocente', function (request, response) { return Segretario.inserireDocente(request, response); });
server_1.default.post('/inserireOrario', function (request, response) { return Segretario.inserireOrario(request, response); });
server_1.default.get('/getListaDocenti', function (request, response) { return Segretario.getListaDocenti(request, response); });
server_1.default.get('/getListaCorsi', function (request, response) { return Segretario.getListaCorsi(request, response); });
server_1.default.post('/getListaOrariDisponibili', function (request, response) { return Segretario.getListaOrariDisponibili(request, response); });
server_1.default.get('/getListaAule', function (request, response) { return Segretario.getListaAule(request, response); });
//404
server_1.default.get('*', function (request, response) { response.redirect('/'); });
//Definizione porta di ascolto dell'applicazione
server_1.default.listen(8080);
