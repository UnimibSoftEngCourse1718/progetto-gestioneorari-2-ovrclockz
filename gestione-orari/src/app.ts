import Server from './server';
import User from './Controllers/UsersController';
import U from './Models/Studente';

U.findAll(function(res : Object) {
    console.log("-------ALL---------");
    console.log(res);
})


Server.get('/', (request, response) => { return User.index(request,response);});
Server.get('/dashboard', (request, response) => { return User.dashboard(request,response);});
Server.post('/login', (request, response) => { return User.login(request,response);});
Server.post('/register', (request, response) => { return User.register(request,response);});

//Definizione porta di ascolto dell'applicazione
Server.listen(8080)