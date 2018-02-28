import Database from './../config/Database';
import UsersController from './UsersController';
import User from '../Models/User';
import { Request, Response } from 'express';
import DocenteModel from '../Models/Docente';

let Docenti = class DocenteController extends UsersController{
    constructor(){
        super();
    }

    prenotazioneRisorsa(request: Request,response: Response){
        let session = request.session;
        if (session !== undefined) {
            if (session.user) {
                new DocenteModel(session.user.username, session.user.password).prenotazioneRisorsa(request.body.risorsa,function (res: any) {
                    if (res[0]) { 
                        response.json({ value : res[1] }); 
                    }
                    else{ return response.status(500).send(); }
                })
            }
        }
    }
    
    cancellarePrenotazione(request: Request,response: Response){
        let session = request.session;
        if (session !== undefined) {
            if (session.user) {
                Database('lista_prenotazioni_risorse')
                .where('id',request.body.risorsa.id)
                .del()
                .then(function (res: any) {
                    console.log(res)
                    response.json({ value : res }); 
                })
                .catch(function(){
                    return response.status(500).send();
                })
            }
        }
    }

    getListaRisorse(request: Request,response: Response){
        let session = request.session;
        if (session !== undefined) {
            if (session.user) {
                new DocenteModel(session.user.username, session.user.password).getListaRisorse(function (res: any) {
                    if (res[0]) { response.json({ value : res[1] }); }
                    else{ return response.status(500).send(); }
                })
            }
        }
    }

    getListaRisorsePrenotate(request: Request,response: Response){
        let session = request.session;
        if (session !== undefined) {
            if (session.user) {
                console.log(request.body);
                new DocenteModel(session.user.username, session.user.password).getListaRisorsePrenotate(request.body.id_docente,function (res: any) {
                    if (res[0]) { response.json({ value : res[1] }); }
                    else{ return response.status(500).send(); }
                })
            }
        }
    }

    pubblicareNewsCorso(request: Request, response: Response) {
        let session = request.session;
        if (session !== undefined) {
            if (session.user) {
                let newuser = UsersController.getUserType(String(session.user.usertype), session.user.username, session.user.password);
                console.log(newuser);
                newuser.pubblicareNewsCorso(request.body.id_corso, request.body.news, function (status: boolean) {
                    if (status) { response.json({ status: status }); }
                    else { return response.status(500).send(); }
                });
            }
        }
    }
}

export default Docenti;