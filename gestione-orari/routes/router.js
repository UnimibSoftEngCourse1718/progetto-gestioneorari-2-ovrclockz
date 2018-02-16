var express = require('express');
var router = express.Router();

let User = require('../Models/User');

/*
 * Routing
*/
//Pagina principale
router.get('/', (request, response) => {
    response.render('pages/index', { 'test': 'Salut' });
});

//Effettua il login
router.post('/login', (request, response) => {
    if (request.body.username && request.body.password) {
        let username = request.body.username;
        let password = request.body.password;

        User.find({username, password},function(err,row){
            if (err) { console.log(err); return response.status(500).send(); }

            if(!user){ response.json({ error: true }); }
            else{ response.json({ user: row.user });}
        });
    } else {
        response.status(200);
        response.json({ error: true })
    }
});

//Registra l'utente
router.post('/register', (request, response) => {
    if (request.body.username && request.body.password) {
        let username = request.body.username;
        let password = request.body.password;

        let newuser = new User(username,password);
        console.log(newuser);
        newuser.save(function(err, res){
            if(err){console.log(err);response.status(500).send();}

            if (res.saved) { response.json({ success: true }) }
            else{response.json({ userExists: true })}
        })
    } else {
        response.status(200);
        response.json({ error: true })
    }
});

router.get('/dashboard',function(req,res){
    let logged = false;
    if(!logged){
        return res.status(401).send('Non aautorizzato');
    }
    return res.status(200).send('Logged');
})

module.exports = router;