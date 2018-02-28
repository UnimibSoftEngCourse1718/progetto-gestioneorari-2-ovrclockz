import { Request, Response } from 'express';
import Database from './../config/Database';
import User from '../Models/User';
import StudenteModel from '../Models/Studente';
import DocenteModel from '../Models/Docente';
import SegretarioModel from '../Models/Segretario';

let Users = class UsersController{
    constructor(){
    }

    auth(request: Request):boolean{
        let session = request.session;
        if (session !== undefined) {
            if (session.user) {
                return true;
            }else{
                return false;
            }
        }
        return false;
    }

    //Renderizza la pagina di autenticazione o la home page dell'area personale
    index(request: Request, response: Response):void {
        if(this.auth(request)){
            return response.redirect('/dashboard');
        }
        return response.render('pages/index');
    }

    dashboard(request: Request, response: Response):void {
        if (this.auth(request)) {
            return response.render('pages/dashboard');
        }
        return response.redirect('/');
    }
    
    login(request: Request, response: Response): void{
        if (request.body.username && request.body.password) {
            let username = request.body.username;
            let password = request.body.password;
            
            User.authenticate(username, password, function (valid: Boolean,res: Object) {
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
                    let newuser = Users.getUserType(usertype,username,password);
                    newuser.save(request.body,function (success: Boolean,row:number) {
                        if (!success) {
                            console.log("Errore nella registrazione!");
                            return response.status(500).send();
                        }
                        response.json({ success: true });
                    });
                }
            })
        } else {
            response.status(200);
            response.json({ error: true })
        }
    }

    getUserData(request: Request, response: Response){
        let session = request.session;
        if (session !== undefined) {
            if (session.user) {
                let newuser = Users.getUserType(String(session.user.usertype), session.user.username, session.user.password);
                newuser.getAllData(function(user: any){
                    if(user){ return response.json({ user }); }
                    return response.status(500);
                });
            }
        }
    }

    getPubblicazioni(request: Request, response: Response) {
        if (this.auth(request)) {
            User.getPubblicazioni(function(pubblicazioni: any) {
                response.json(pubblicazioni);
            })
        }
    }

    getPubblicazioniCorso(request: Request, response: Response) {
        if (this.auth(request)) {
            User.getPubblicazioniCorso(request.body.id_corso,function(pubblicazioni: any) {
                response.json(pubblicazioni);
            })
        }
    }

    pubblicareNews(request: Request, response: Response) {
        let session = request.session;
        if (session !== undefined) {
            if (session.user) {
                let newuser = Users.getUserType(String(session.user.usertype), session.user.username, session.user.password);
                console.log(newuser);
                newuser.pubblicareNews(request.body.news, function (status: boolean) {
                    if (status) { response.json({ status: status }); }
                    else { return response.status(500).send(); }
                });
            }
        }
    }

    static getUserType(usertype: string, username: string,password: string): any{
        if(usertype === '3') {
            return new StudenteModel(username, password);
        }
        else if(usertype === '2') {
            return new DocenteModel(username, password);
        }
        else if(usertype === '1') {
            return new SegretarioModel(username, password);
        }
    }

    logout(request: Request, response: Response){
        let session = request.session;
        if (session !== undefined) {
            if (session.user) {
                delete session.user;
            }
        }
        response.redirect('/');

    }
} 

export default Users;