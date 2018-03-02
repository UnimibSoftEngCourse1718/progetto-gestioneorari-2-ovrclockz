import Database from './../config/Database';
import UsersController from './UsersController';
import User from '../Models/User';
import { Request, Response } from 'express';
import DocenteModel from '../Models/Docente';

const Docenti = class DocenteController extends UsersController{
    constructor(){
        super();
    }

    prenotazioneRisorsa(request: Request,response: Response){
        const session = request.session;
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
        const session = request.session;
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
        const session = request.session;
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
        const session = request.session;
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
        const session = request.session;
        if (session !== undefined) {
            if (session.user) {
                const newuser = UsersController.getUserType(String(session.user.usertype), session.user.username, session.user.password);
                console.log(newuser);
                newuser.pubblicareNewsCorso(request.body.id_corso, request.body.news, function (stat: boolean) {
                    if (stat) { response.json({ status: stat }); }
                    else { return response.status(500).send(); }
                });
            }
        }
    }

    getListaEsamiDocente(request: Request, response: Response) {
        if (this.auth(request)) {
            Database.select('lista_corsi_docente.*', 'corsi.nome_corso', 'lista_esami_corso.data_esame',
                'lista_esami_corso.id as id_esame_real', 'aule.nome_aula').from('lista_corsi_docente')
                .leftJoin('corsi', 'corsi.id', 'lista_corsi_docente.id_corso')
                .leftJoin('lista_esami_corso', 'lista_esami_corso.id_corso', 'corsi.id')
                .leftJoin('aule', 'aule.id', 'lista_esami_corso.id_aula')
                .where({ 'lista_corsi_docente.id_docente': request.body.id_docente })
                .then(function (rows) {
                    response.json({ value: rows });
                })
                .catch(function (error) {
                    console.log(error);
                    response.sendStatus(500);
                })
        }
    }
}

export default Docenti;
