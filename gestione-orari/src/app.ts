import Server from './server';
import Database from './config/Database';
import UsersController from './Controllers/UsersController';
import StudentiController from './Controllers/StudentiController';
import DocentiController from './Controllers/DocentiController';
//import U from './Models/Studente';
/*
U.findAll(function(res : Object) {
    console.log("-------ALL---------");
    console.log(res);
});
*/

let User = new UsersController();

Server.get('/', (request, response) => { return User.index(request,response);});
Server.get('/dashboard', (request, response) => { return User.dashboard(request,response);});
Server.post('/login', (request, response) => { return User.login(request,response);});
Server.get('/logout', (request, response) => { return User.logout(request,response);});
Server.post('/register', (request, response) => { return User.register(request,response);});

//All
Server.get('/getUserData', (request, response) => { return User.getUserData(request, response); });
Server.get('/getPubblicazioni', (request, response) => { return User.getPubblicazioni(request, response); });

//Studenti
Server.post('/iscrizioneEsame', (request, response) => { return StudentiController.iscrizioneEsame(request, response); });

//Docenti
Server.get('/getListaRisorse', (request, response) => { return DocentiController.getListaRisorse(request, response); });
Server.post('/prenotazioneRisorsa', (request, response) => { return DocentiController.prenotazioneRisorsa(request, response); });

//Docenti + Segretari
Server.post('/pubblicareNews', (request, response) => { return User.pubblicareNews(request, response); });


//Definizione porta di ascolto dell'applicazione
Server.listen(8080)