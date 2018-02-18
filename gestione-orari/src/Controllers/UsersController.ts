import { Request, Response } from 'express';
import User from '../Models/User';
import StudenteModel from '../Models/Studente';
import DocenteModel from '../Models/Docente';
import SegretarioModel from '../Models/Segretario';
import CorsoModel from '../Models/Corso';

class UsersController{

    constructor(){
        User.createTable();
        CorsoModel.createTable();
    }

    index(request: Request, response: Response):void {
        let session = request.session;
        //console.log(request.session);
        if (session !== undefined) {
            if(session.user){
                return response.redirect('/dashboard');
            }
        }
        return response.render('pages/index');
    }

    dashboard(request: Request, response: Response):void {
        let session = request.session;
        //console.log(request.session);
        if (session !== undefined) {
            if(session.user){
                return response.render('pages/dashboard');
            }
        }
        return response.redirect('/');
    }
    
    login(request: Request, response: Response): void{
        if (request.body.username && request.body.password) {
            let username = request.body.username;
            let password = request.body.password;

            User.authenticate(username, password, function (valid: Boolean,res: Object) {
                //if (err) { console.log(err); return response.status(500).send(); }
                let session = request.session;
                if (!valid) { response.json({ error: true }); }
                else if(session !== undefined){
                    session.user = res;
                    response.json({ user: res });
                }
            });
        } else {
            response.status(200);
            response.json({ error: true });
        }
    }

    register(request: Request, response: Response): void{
        if (request.body.username && request.body.password) {
            let usertype = request.body.usertype;
            let username = request.body.username;
            let password = request.body.password;

            User.find(username, function (found: Boolean) { 
                if(found){
                    console.log("Trovato");
                    response.json({ userExists: true });
                }else{
                    console.log("Non trovato");
                    let newuser: User;
                    switch(usertype){
                        case '3':
                            newuser = new StudenteModel(username,password);
                            newuser.save(function (success: Boolean) {
                                if (!success) {
                                    console.log("Errore nella registrazione!");
                                    return response.status(500).send();
                                }
                                response.json({ success: true });
                            });
                            break;
                        case "2":
                            newuser = new DocenteModel(username, password);
                            newuser.save(function (success: Boolean) {
                                if (!success) {
                                    console.log("Errore nella registrazione!");
                                    return response.status(500).send();
                                }
                                response.json({ success: true });
                            });
                            break;
                        case "1":
                            newuser = new SegretarioModel(username, password);
                            newuser.save(function (success: Boolean) {
                                if (!success) {
                                    console.log("Errore nella registrazione!");
                                    return response.status(500).send();
                                }
                                response.json({ success: true });
                            });
                            break;
                        default:
                            response.json({ error: true });
                            break;    
                    }
                }
            })
        } else {
            response.status(200);
            response.json({ error: true })
        }
    }

    
} 

export default new UsersController();