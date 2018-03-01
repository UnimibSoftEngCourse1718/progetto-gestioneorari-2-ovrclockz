import UsersController from './UsersController';
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
}

export default Studenti;
