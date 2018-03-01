import Database from './../config/Database';
import { Request, Response } from 'express';
import UsersController from './UsersController';
import UserModel from '../Models/User';
import SegretarioModel from '../Models/Segretario';
import DocenteModel from '../Models/Docente';

const Segretari = class SegretariController extends UsersController{
    constructor(){
        super();
    }

    getListaRisorse(request: Request, response: Response) {
        const session = request.session;
        if (session !== undefined) {
            if (session.user) {
                new SegretarioModel(session.user.username, session.user.password).getListaRisorse(function (res: any) {
                    if (res[0]) { response.json({ value: res[1] }); }
                    else { return response.status(500).send(); }
                })
            }
        }
    }

    getListaCorsi(request: Request, response: Response) {
        Database.select('*').from('corsi')
        .then(function (row) {
            console.log(row);
            return response.json({ value: row });
        })
        .catch(function (error) {
            console.log(error);
            return response.sendStatus(500);
        })
    }

    inserireOrario(request: Request,response: Response){
        const session = request.session;
        if (session !== undefined) {
            if (session.user) {
                Database('lista_orari_corso').insert([{ id_corso: request.body.dati.id_corso, id_aula: request.body.dati.id_aula, id_orario: request.body.dati.id_orario }])
                .then(function (res) {
                    console.log(res);
                    return response.json({status: true});
                })
                .catch(function (error) {
                    console.log(error);
                    return response.sendStatus(500);
                })
            }
        }
    }

    inserireRisorsa(request: Request,response: Response){
        const session = request.session;
        if (session !== undefined) {
            if (session.user) {
                Database('risorse').insert([{ nome_risorsa: request.body.nome_risorsa }])
                .then(function (res) {
                    console.log(res);
                    return response.json({status: true});
                })
                .catch(function (error) {
                    console.log(error);
                    return response.sendStatus(500);
                })
            }
        }
    }

    inserireDocente(request: Request,response: Response){
        const session = request.session;
        if (session !== undefined) {
            if (session.user) {
                UserModel.find(request.body.username, function(found: boolean){
                    if(!found){
                        new DocenteModel(request.body.username,request.body.password).inserireDocente(request.body,function(stat: boolean){
                            if(stat){
                                response.send({status: stat});
                            }else{
                                return response.send(500);
                            }
                        })
                    }else{
                        return response.json({ status: false });
                    }
                })
            }
        }
    }

    getListaDocenti(request: Request, response: Response) {
        const session = request.session;
        if (session !== undefined) {
            if (session.user) {
                Database.select('*').from('docenti')
                .leftJoin('users','users.id','docenti.id_user')
                .then(function (row) {
                    console.log(row);
                    return response.json({ value: row });
                })
                .catch(function (error) {
                    console.log(error);
                    return response.sendStatus(500);
                })
            }
        }
    }

    getListaOrariDisponibili(request: Request, response: Response) {
        const session = request.session;
        const id_aula = request.body.id_aula;
        if (session !== undefined) {
            if (session.user) {
                Database.select('*').from('orari')
                .whereRaw("id not in (SELECT id_orario FROM lista_orari_corso WHERE id_aula = ?)",[id_aula])
                .then(function (row) {
                    console.log(row);
                    return response.json({ value: row });
                })
                .catch(function (error) {
                    console.log(error);
                    return response.sendStatus(500);
                })
            }
        }
    }

    getListaAule(request: Request, response: Response) {
        const session = request.session;
        if (session !== undefined) {
            if (session.user) {
                Database.select('*').from('aule')
                .then(function (row) {
                    console.log(row);
                    return response.json({ value: row });
                })
                .catch(function (error) {
                    console.log(error);
                    return response.sendStatus(500);
                })
            }
        }
    }
}

export default Segretari;
