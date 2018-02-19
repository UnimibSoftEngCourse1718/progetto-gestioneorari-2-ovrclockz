import Database from './../config/Database'
import UserModel from './User';

export default class DocenteModel extends UserModel{
    usertype: number;

    constructor(username: string, password: string) {
        super(username, password);
        this.usertype = 3;
    }

    save(callback: Function) {
        let username = this.username;
        console.log("sto inserendo")
        Database('users').insert([{ usertype: this.usertype, username: this.username, password: this.password }])
        .then(function rows(row) {
            console.log("inserito record in users");
            Database('docenti').insert([{ id_user: row[0] }]).then(function () {
                console.log("inserito record in docenti");
                callback(true);
            });
        })
        .catch(function (error) {
            console.log(error);
            callback(false);
        });
    }
} 