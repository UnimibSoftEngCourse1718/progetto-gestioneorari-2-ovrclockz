import Database from './../config/Database';
import UsersController from './UsersController';
import User from '../Models/User';
import { Request, Response } from 'express';
import DocenteModel from '../Models/Docente';

let Docenti = class DocenteController extends UsersController{
    constructor(){
        super();
    }

    static prenotazioneRisorsa(request: Request,response: Response){
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
    static cancellarePrenotazione(request: Request,response: Response){
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

    static getListaRisorse(request: Request,response: Response){
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

    static getListaRisorsePrenotate(request: Request,response: Response){
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
}

export default Docenti;