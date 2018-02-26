import Server from './server';
import Database from './config/Database';
import UsersController from './Controllers/UsersController';
import StudentiController from './Controllers/StudentiController';
import DocentiController from './Controllers/DocentiController';
import SegretariController from './Controllers/SegretariController';

let User = new UsersController();
let Studente = new StudentiController();
let Docente = new DocentiController();
let Segretario = new SegretariController();

Server.get('/', (request, response) => { return User.index(request,response);});
Server.get('/dashboard', (request, response) => { return User.dashboard(request,response);});
Server.post('/login', (request, response) => { return User.login(request,response);});
Server.get('/logout', (request, response) => { return User.logout(request,response);});
Server.post('/register', (request, response) => { return User.register(request,response);});

//All
Server.get('/getUserData', (request, response) => { return User.getUserData(request, response); });
Server.get('/getPubblicazioni', (request, response) => { return User.getPubblicazioni(request, response); });

//Studenti
Server.post('/iscrizioneEsame', (request, response) => { return Studente.iscrizioneEsame(request, response); });

//Docenti
Server.get('/getListaRisorse', (request, response) => { return Docente.getListaRisorse(request, response); });
Server.post('/getListaRisorsePrenotate', (request, response) => { return Docente.getListaRisorsePrenotate(request, response); });
Server.post('/prenotazioneRisorsa', (request, response) => { return Docente.prenotazioneRisorsa(request, response); });
Server.post('/cancellarePrenotazione', (request, response) => { return Docente.cancellarePrenotazione(request, response); });

//Docenti + Segretari
Server.post('/pubblicareNews', (request, response) => { return User.pubblicareNews(request, response); });

//Segretari
Server.post('/inserireRisorsa', (request, response) => { return Segretario.inserireRisorsa(request, response); });
Server.post('/inserireDocente', (request, response) => { return Segretario.inserireDocente(request, response); });
Server.post('/inserireOrario', (request, response) => { return Segretario.inserireOrario(request, response); });
Server.get('/getListaDocenti', (request, response) => { return Segretario.getListaDocenti(request, response); });
Server.get('/getListaCorsi', (request, response) => { return Segretario.getListaCorsi(request, response); });
Server.post('/getListaOrariDisponibili', (request, response) => { return Segretario.getListaOrariDisponibili(request, response); });
Server.get('/getListaAule', (request, response) => { return Segretario.getListaAule(request, response); });

//Definizione porta di ascolto dell'applicazione
Server.listen(8080)