var express = require('express');
var router = express.Router();

let User = require('../Models/User');

/*
 * Routing
*/
//Pagina principale
router.get('/', (request, response) => {
    if (request.session.user){
        console.log("iwrwfrib");
        console.log(request.session);
        return response.redirect('/dashboard');
    }
    return response.render('pages/index', { 'test': 'Salut' });
});

//Effettua il login
router.post('/login', (request, response) => {
    if (request.body.username && request.body.password) {
        let username = request.body.username;
        let password = request.body.password;

        User.find({username, password},function(err,row){
            if (err) { console.log(err); return response.status(500).send(); }

            if(!row){ response.json({ error: true }); }
            else{ 
                request.session.user = row.user;
                response.json({ user: row.user });
            }
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
    if(!req.session.user){
        return res.status(401).send('Non aautorizzato');
    }
    return res.status(200).json(req.session.user)
})

module.exports = router;