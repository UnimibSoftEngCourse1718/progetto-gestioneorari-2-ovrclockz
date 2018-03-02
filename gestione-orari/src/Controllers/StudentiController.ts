import UsersController from './UsersController';
import Database from './../config/Database';
import User from '../Models/User';
import { Request, Response } from 'express';
import StudenteModel from '../Models/Studente';

const Studenti = class StudentiController extends UsersController{
    constructor(){
        super();
    }

    iscrizioneEsame(request: Request,response: Response){
        const session = request.session;
        if (session !== undefined) {
            if (session.user) {
                StudenteModel.iscrizioneEsame(request.body,function (res: any) {
                    if (res[0]) { response.json({ value : res[1] }); }
                    else{ return response.status(500); }
                })
            }
        }
    }

    getListaEsamiStudente(request: Request, response: Response) {
        if (this.auth(request)) {
            Database.select('lista_corsi_studente.*', 'corsi.nome_corso', 'lista_esami_corso.data_esame',
                'lista_esami_corso.id as id_esame_real', 'aule.nome_aula').from('lista_corsi_studente')
                .leftJoin('corsi', 'corsi.id', 'lista_corsi_studente.id_corso')
                .leftJoin('lista_esami_corso', 'lista_esami_corso.id_corso', 'corsi.id')
                .leftJoin('aule', 'aule.id', 'lista_esami_corso.id_aula')
                .where({ 'lista_corsi_studente.id_studente': request.body.id_studente })
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

export default Studenti;
