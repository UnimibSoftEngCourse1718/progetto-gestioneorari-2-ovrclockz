import Database from './../config/Database'
import UserModel from './User';

export default class DocenteModel extends UserModel{
    
    constructor(username: string, password: string) {
        super(username, password);
    }
} 