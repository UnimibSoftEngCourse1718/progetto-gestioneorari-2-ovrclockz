/*
* Entry point dell'applicazione
*/

//Express - Mini Framework Node.js  
let express = require('express');
//Middleware per il parsing del body di una richiesta http
let bodyParser = require('body-parser');
let session = require('express-session');

let routes = require('./routes/router');

//istanza dell'applicazione
let app = express();

//Engine per il rendering HTML
app.set('view engine', 'ejs');

//Serve i files statiche della cartella public
app.use('/assets',express.static('public'));
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.use(session({secret:"qaefoie£$£%$&£%3899132wertg",resave:false,saveUninitialized:true}));

app.use('/',routes);

//Definizione porta di ascolto dell'applicazione
app.listen(8080)