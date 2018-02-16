/*
* Entry point dell'applicazione
*/
//Express - Mini Framework Node.js  
let express = require('express')


//istanza dell'applicazione
let app = express()

/*
* Middlewares
*/
//Middleware per il parsing del body di una richiesta http
let bodyParser = require('body-parser')

//Engine per il rendering HTML
app.set('view engine', 'ejs')

//Serve i files statiche della cartella public
app.use('/assets',express.static('public'))
app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())

//Routing
app.get('/', (request, response) => {
    response.render('pages/index', {'test':'Salut'})
})

app.post('/register', (request, response) => {
    console.log(request.body)
    if (request.body.username && request.body.password){
        let User = require('./Models/User')
        User.getUser(request.body.username,function(user) {
            console.log(user);
            if(user === undefined){
                User.register(request.body, function () {
                    response.json({ success: true })
                })
            }else{
                response.json({ userExists: true })
            }
        })
        
    }else{
        response.json({error: true})
    }
})

//Definizione porta di ascolto dell'applicazione
app.listen(8080)