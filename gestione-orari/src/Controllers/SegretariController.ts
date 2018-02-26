import Database from './../config/Database';
import { Request, Response } from 'express';
import UsersController from './UsersController';
import UserModel from '../Models/User';
import SegretarioModel from '../Models/Segretario';

let Segretari = class SegretariController extends UsersController{
    constructor(){
        super();
    }

    getListaRisorse(request: Request, response: Response) {
        let session = request.session;
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
        let session = request.session;
        if (session !== undefined) {
            if (session.user) {
                Database.select('*').from('corsi')
                .then(function (row) {
                    //console.log(row);
                    return response.json({ value: row });
                })
                .catch(function (error) {
                    console.log(error);
                    return response.sendStatus(500);
                })
            }
        }
    }

    inserireOrario(request: Request,response: Response){
        let session = request.session;
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
        let session = request.session;
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
        let session = request.session;
        if (session !== undefined) {
            if (session.user) {
                UserModel.find(request.body.username, function(found: boolean){
                    if(!found){
                        Database('users').insert([{ username: request.body.username, password: request.body.password, usertype: 2 }])
                        .then(function (res) {
                            console.log(res);
                            Database('docenti').insert([{ id_user: res[0] }])
                                .then(function (res) {
                                    console.log(res);
                                    if (request.body.corsi.length){
                                        for (let i = 0; i < request.body.corsi.length; i++) {
                                            Database('lista_corsi_docente').insert([{ id_docente: res[0], id_corso: request.body.corsi[i].id }])
                                                .then(function (res) {
                                                    console.log(res)
                                                    if (i === request.body.corsi.length - 1) {
                                                        return response.json({ status: true });
                                                    }
                                                })
                                        }
                                    }else{
                                        return response.json({ status: true });
                                    }
                                })
                        })
                        .catch(function (error) {
                            console.log(error);
                            return response.sendStatus(500);
                        })
                    }else{
                        return response.json({ status: false });
                    }
                })
            }
        }
    }

    getListaDocenti(request: Request, response: Response) {
        let session = request.session;
        if (session !== undefined) {
            if (session.user) {
                Database.select('*').from('docenti')
                .leftJoin('users','users.id','docenti.id_user')
                .then(function (row) {
                    //console.log(row);
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
        let session = request.session;
        let id_aula = request.body.id_aula;
        if (session !== undefined) {
            if (session.user) {
                Database.select('*').from('orari')
                .whereRaw("id not in (SELECT id_orario FROM lista_orari_corso WHERE id_aula = ?)",[id_aula])
                .then(function (row) {
                    //console.log(row);
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
        let session = request.session;
        if (session !== undefined) {
            if (session.user) {
                Database.select('*').from('aule')
                .then(function (row) {
                    //console.log(row);
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