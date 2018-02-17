import UsersController from './UsersController';
import User from '../Models/User';
import { Request, Response } from 'express';

let Studenti = class StudentiController extends UsersController{
    constructor(){
        super();
    }
}

export default Studenti;