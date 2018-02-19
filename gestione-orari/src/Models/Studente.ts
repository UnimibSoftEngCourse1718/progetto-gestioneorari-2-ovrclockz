import Database from './../config/Database'
import UserModel from './User';

export default class StudenteModel extends UserModel{
    
    constructor(username: string, password: string) {
        super(username, password);
    }
} 