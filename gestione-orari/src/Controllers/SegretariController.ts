import Database from './../config/Database';
import UsersController from './UsersController';
import User from '../Models/User';
import { Request, Response } from 'express';
import SegretarioModel from '../Models/Segretario';
import UserModel from '../Models/User';

let Segretari = class SegretariController extends UsersController{
    constructor(){
        super();
    }

    static getListaRisorse(request: Request, response: Response) {
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
    static getListaCorsi(request: Request, response: Response) {
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
                    return response.send(500);
                })
            }
        }
    }

    static inserireRisorsa(request: Request,response: Response){
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
                    return response.send(500);
                })
            }
        }
    }

    static inserireDocente(request: Request,response: Response){
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
                            return response.send(500);
                        })
                    }else{
                        return response.json({ status: false });
                    }
                })
            }
        }
    }

    static getListaDocenti(request: Request, response: Response) {
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
                    return response.send(500);
                })
            }
        }
    }
}

export default Segretari;