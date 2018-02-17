/*
* Entry point dell'applicazione
*/

//Express - Mini Framework Node.js  
import * as express from 'express';
import * as session from 'express-session';
import * as path from 'path';
import * as bodyParser from 'body-parser';

//Server
class Server {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        //Config
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }
    routes() {
        let router: express.Router;
        router = express.Router();

        this.app.use('/', router);
        this.app.use(session({ secret: "qaefoie£$£%$&£%3899132wertg", resave: false, saveUninitialized: true }));
        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(__dirname, 'Views'));
        this.app.use('/assets', express.static(__dirname + '/public'));
    }
}

export default new Server().app;