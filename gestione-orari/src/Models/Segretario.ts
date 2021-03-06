import Database from './../config/Database'
import UserModel from './User';

export default class SegretarioModel extends UserModel{
    usertype: number;

    constructor(username: string, password: string) {
        super(username, password);
        this.usertype = 1;
    }

    save(dati:any,callback: Function) {
        console.log("sto inserendo")
        Database('users').insert([{ usertype: this.usertype, username: this.username, password: this.password }])
        .then(function rows(row) {
            console.log("inserito record in users");
            Database('segretari').insert([{ id_user: row[0] }]).then(function () {
                console.log("inserito record in segretari");
                callback(true);
            });
        })
        .catch(function (error) {
            console.log(error);
            callback(false);
        });
    }

    getAllData(callback: Function) {
        Database.select('users.id', 'users.usertype', 'users.username').from('users')
            .where({ 'users.username': this.username })
            .then(function (row) {
                const user = { segretario: row[0]};
                callback(user);
            })
            .catch(function (error) {
                console.log(error);
                callback(false);
            });
    }

    getListaRisorse(callback: Function) {
        Database.select('*').from('risorse').orderByRaw('id DESC')
            .then(function (row) {
                callback([true, row]);
            })
            .catch(function (error) {
                console.log(error);
                callback([false]);
            })
    }

} 
